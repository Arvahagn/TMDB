import { useEffect, useState } from 'react';
import { Media, Trailer } from './helpers/types'; // Import types
import { getTrendingMovies, getTrendingTVShows, getLatestTrailers } from './services/api';
import './App.css';

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState<Media[]>([]);
  const [trendingTVShows, setTrendingTVShows] = useState<Media[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const movies = await getTrendingMovies();
        const tvShows = await getTrendingTVShows();
        const latestTrailers = await getLatestTrailers();
        setTrendingMovies(movies);
        setTrendingTVShows(tvShows);
        setTrailers(latestTrailers);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome to TMDB</h1>
      </header>
      <main>
        <section className="trending-section">
          <h2>Trending Movies</h2>
          <div className="trending-list">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="trending-item">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="trending-section">
          <h2>Trending TV Shows</h2>
          <div className="trending-list">
            {trendingTVShows.map((show) => (
              <div key={show.id} className="trending-item">
                <img
                  src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                  alt={show.name}
                />
                <p>{show.name}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="trailers-section">
          <h2>Latest Trailers</h2>
          <div className="trailers-list">
            {trailers.map((trailer) => (
              <div key={trailer.id} className="trailer-item">
                <iframe
                  width="300"
                  height="200"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  allowFullScreen
                ></iframe>
                <p>{trailer.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
