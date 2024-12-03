import React, { useState } from "react";
import { addFavoriteMovie } from "../../services/api";
import styles from "./AddFavMovie.module.css";
import { useNavigate } from "react-router-dom";

const AddFavMovies: React.FC = () => {
  const [movieId, setMovieId] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sessionId = localStorage.getItem("session_id");
    const accountId = localStorage.getItem("account_id");

    if (!sessionId) {
      setError("Missing account or session information. Please log in again.");
      return;
    }

    if (!movieId) {
      setError("Please provide a valid movie ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await addFavoriteMovie(accountId as string, sessionId, movieId, isFavorite);
      setMessage(`Movie ${isFavorite ? "added to" : "removed from"} favorites successfully.`);
      navigate('/favorites')
    } catch (err: any) {
      console.error("Error updating favorite movie status:", err.message || err);
      setError("Failed to update favorite movie status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add or Remove Favorite Movie</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="movieId" className={styles.label}>
            Movie ID:
          </label>
          <input
            type="number"
            id="movieId"
            value={movieId || ""}
            onChange={(e) => setMovieId(Number(e.target.value))}
            className={styles.input}
            placeholder="Enter Movie ID"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="isFavorite" className={styles.label}>
            Mark as Favorite:
          </label>
          <select
            id="isFavorite"
            value={isFavorite ? "true" : "false"}
            onChange={(e) => setIsFavorite(e.target.value === "true")}
            className={styles.select}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {message && <div className={styles.success}>{message}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default AddFavMovies;
