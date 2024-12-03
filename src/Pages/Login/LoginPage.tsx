import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    localStorage.setItem("session_id", "your-session-id");

    const redirectTo = (location.state as { from?: string })?.from || "/";
    navigate(redirectTo);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.loginTitle}>Welcome Back!</h1>
        <p className={styles.loginSubtitle}>
          Sign in to explore your favorite movies and shows.
        </p>
        <button onClick={handleLogin} className={styles.loginButton}>
          Login with TMDB
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
