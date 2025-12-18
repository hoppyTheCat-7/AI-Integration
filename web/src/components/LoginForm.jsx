import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { decodeToken } from "react-jwt";

import styles from "../styles/Login.module.css";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:10000/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const decoded = decodeToken(response.data.token);

        if (decoded.role === "admin") {
          navigate("/users");
        } else {
          navigate("/");
        }

        setEmail("");
        setPassword("");
      } else {
        setError(response.data.error || "Login Error!");
      }

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        {loading && <p style={{ color: "blue" }}>Loading...</p>}

        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          Login
        </button>
      </form>
    </>
  );
};