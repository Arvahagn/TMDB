export interface RequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface CreateSessionResponse {
  success: boolean;
  session_id: string;
}

export interface Media {
    id: number;
    title?: string; 
    name?: string; 
    poster_path: string | null;
  }
  
  export interface Trailer {
    id: string;
    key: string; 
    name: string; 
    type: string; 
    site: string;
  }
  
  export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
  }

  export interface AccountDetails {
    id: number;
    username: string;
    name: string;
    include_adult: boolean;
    avatar: {
      gravatar: {
        hash: string;
      };
    };
  }