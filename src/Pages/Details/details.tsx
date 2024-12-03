import React, { useEffect, useState } from "react";
import styles from "./Details.module.css";
import { getAccountDetails } from "../../services/api";
import { AccountDetails } from "../../helpers/types";

const Details: React.FC = () => {
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const sessionId = localStorage.getItem("session_id");

      if (!sessionId) {
        setError("No session ID found. Please log in again.");
        setLoading(false); 
        return;
      }

      try {
        const details = await getAccountDetails(sessionId);
        setAccountDetails(details);
      } catch (err: any) {
        console.error("Error fetching account details:", err.message || err);
        setError("Failed to load account details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading account details...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!accountDetails) {
    return <div className={styles.error}>No account details available.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Account Details</h1>
      <div className={styles.card}>
        <img
          src={`https://www.gravatar.com/avatar/${accountDetails.avatar.gravatar.hash}?s=200`}
          alt={`${accountDetails.username}'s avatar`}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <p>
            <strong>Username:</strong> {accountDetails.username}
          </p>
          <p>
            <strong>ID:</strong> {accountDetails.id}
          </p>
          <p>
            <strong>Name:</strong> {accountDetails.name || "Not provided"}
          </p>
          <p>
            <strong>Adult Content:</strong> {accountDetails.include_adult ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
