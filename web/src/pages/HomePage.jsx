import { jwtDecode } from "jwt-decode";

import styles from "../styles/Homepage.module.css";

function getEmailFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  console.log(decoded);
  return decoded?.email;
}

export default function HomePage() {
  const email = getEmailFromToken();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {email && <div className={styles.userInfo}>Welcome, {email}!</div>}
        <h1 className={styles.welcomeTitle}>
          Welcome to the first app for soils in Macedonia!
        </h1>
        <h2 className={styles.subtitle}>
          Become part of the farmers in our country
        </h2>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🌾 Agricultural Information</h3>
          <p className={styles.cardText}>
            This application allows us to view information about agricultural
            activities, and all the necessary information can be found here.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🌱 Complete Solutions</h3>
          <p className={styles.cardText}>
            For your home, enrich the menu with{" "}
            <span className={styles.highlight}>soil</span>, agricultural crops,
            fertilizers, and mechanization.
          </p>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <h4 className={styles.featureTitle}>💬 AI Chat Assistant</h4>
          <p className={styles.featureText}>
            Get instant answers about soil conditions, crops, and farming
            practices from our AI assistant.
          </p>
        </div>
        <div className={styles.feature}>
          <h4 className={styles.featureTitle}>📊 Data Management</h4>
          <p className={styles.featureText}>
            Access comprehensive information about agricultural activities and
            soil data.
          </p>
        </div>
        <div className={styles.feature}>
          <h4 className={styles.featureTitle}>👥 Community</h4>
          <p className={styles.featureText}>
            Connect with farmers and agricultural experts in Macedonia.
          </p>
        </div>
      </div>
    </div>
  );
}