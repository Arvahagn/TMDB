import axios from "axios";
import { CreateSessionResponse, Media, RequestTokenResponse, Trailer } from '../helpers/types';

const API_KEY = "b6de9f0eb08c85e8be5f76e91ffc0a5b";
// const API_Read_Access_Token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmRlOW
//   YwZWIwOGM4NWU4YmU1Zjc2ZTkxZmZjMGE1YiIsIm5iZiI6MTczMTgyOTE1MS42MTc
//   wNTY0LCJzdWIiOiI2NzM5OWJkN2Y3NDFlYjA0MjhiNjA1MzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwid
//   mVyc2lvbiI6MX0.NYI0L6ZYvZTtnAYQH6Vk6Q6PK4tDYggtJqso0ddnukw`;
const BASE_URL = "https://api.themoviedb.org/3";


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
  params:{
    api_key: API_KEY
  }
});


export const getRequestToken = async (): Promise<string> => {
  try {
    const response = await api.get<RequestTokenResponse>(
      "authentication/token/new"
    );
    return response.data.request_token;
  } catch (error: any) {
    console.error("Error fetching request token:", error.message || error);
    throw new Error("Failed to fetch request token");
  }
};

export const createSession = async (requestToken: string): Promise<string> => {
  try {
    const response = await api.post<CreateSessionResponse>(
      "/authentication/session/new",
      {
        request_token: requestToken,
      }
    );
    return response.data.session_id;
  } catch (error: any) {
    console.error("Error creating session:", error.message || error);
    throw new Error("Failed to create session");
  }
};


export const authenticateUser = async (): Promise<void> => {
  try {
    const requestToken = await getRequestToken();
    if (requestToken) {
      const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5173`; // Replace with your app's redirect URL
      window.location.href = authUrl;
    }
  } catch (error) {
    console.error("Error initiating authentication:", error);
    throw error;
  }
};


export const getAccountDetails = async (sessionId: string) => {
    try {
      const response = await api.get(`/account`, {
        params: {
          session_id: sessionId,
        },
      });
      console.log("Account details fetched successfully:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("API Error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else {
        console.error("Error:", error.message || error);
      }
      throw new Error("Failed to fetch account details");
    }
  };
  

  export const getFavoriteMovies = async (accountId: string, sessionId: string) => {
    try {
      const response = await api.get(`/account/${accountId}/favorite/movies`, {
        params: {
          session_id: sessionId, 
        },
      });
      console.log("Favorite movies fetched successfully:", response.data);
      return response.data.results; 
    } catch (error: any) {
      if (error.response) {
        console.error("API Error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else {
        console.error("Error:", error.message || error);
      }
      throw new Error("Failed to fetch favorite movies");
    }
  };
  

  export const addFavoriteMovie = async (accountId: string, sessionId: string, movieId: number, isFavorite: boolean) => {
    try {
      const response = await api.post(
        `/account/${accountId}/favorite`,
        {
          media_type: "movie", 
          media_id: movieId,
          favorite: isFavorite, 
        },
        {
          params: {
            session_id: sessionId,
          },
        }
      );
  
      console.log("Favorite movie updated successfully:", response.data);
      return response.data; 
    } catch (error: any) {
      if (error.response) {
        console.error("API Error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else {
        console.error("Error:", error.message || error);
      }
      throw new Error("Failed to update favorite movie status");
    }
  };
  

  export const getFavoriteTV = async (accountId: string, sessionId: string) => {
    try {
      const response = await api.get(`/account/${accountId}/favorite/tv`, {
        params: {
          session_id: sessionId, 
        },
      });
      console.log("Favorite TV fetched successfully:", response.data);
      return response.data.results; 
    } catch (error: any) {
      if (error.response) {
        console.error("API Error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else {
        console.error("Error:", error.message || error);
      }
      throw new Error("Failed to fetch favorite TVs");
    }
  };


  export const getTrendingMovies = async (): Promise<Media[]> => {
    try {
      const response = await api.get('/trending/movie/week');
      return response.data.results as Media[];
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  };
  
  export const getTrendingTVShows = async (): Promise<Media[]> => {
    try {
      const response = await api.get('/trending/tv/week');
      return response.data.results as Media[];
    } catch (error) {
      console.error('Error fetching trending TV shows:', error);
      throw error;
    }
  };
  
export const getLatestTrailers = async () => {
  try {
    const response = await api.get(`/movie/popular`);
    const movies = response.data.results.slice(0, 5);
    const trailerPromises = movies.map(async (movie:Media) => {
      const videoResponse = await api.get(`/movie/${movie.id}/videos`, {
        params: {
          api_key: API_KEY,
        },
      });

      const trailers = videoResponse.data.results.filter(
        (video:Trailer) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      return trailers.length > 0 ? trailers[0] : null;
    });

    const trailerResults = await Promise.all(trailerPromises);
    return trailerResults.filter((trailer) => trailer !== null); 
  } catch (error) {
    console.error('Error fetching latest trailers:', error);
    throw error;
  }
};
