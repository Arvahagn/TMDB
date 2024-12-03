import React, { useEffect, useState } from "react";
import styles from "./FavMovies.module.css";
import { getFavoriteMovies } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../helpers/types";

const FavMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const sessionId = localStorage.getItem("session_id");
      const accountId = localStorage.getItem("account_id");

      if (!sessionId) {
        setError("Missing account or session information. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const favoriteMovies = await getFavoriteMovies(accountId as string, sessionId);
        setMovies(favoriteMovies);
      } catch (err: any) {
        console.error("Error fetching favorite movies:", err.message || err);
        setError("Failed to load favorite movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, []);

  const handleAddFavoriteClick = () => {
    navigate("/add-favorite");
  };

  if (loading) {
    return <div className={styles.loading}>Loading favorite movies...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (movies.length === 0) {
    return <div className={styles.message}>No favorite movies found.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Favorite Movies</h1>
      <button onClick={handleAddFavoriteClick} className={styles.addButton}>
        Add Favorite Movie or Remove by ID
      </button>
      <div className={styles.grid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.card}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
            <div className={styles.info}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <p className={styles.releaseDate}>
                Release Date: {movie.release_date || "Unknown"}
              </p>
              <p className={styles.overview}>
                {movie.overview || "No description available."}
              </p>
              <p>ID is {movie.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavMovies;
