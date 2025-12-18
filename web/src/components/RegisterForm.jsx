import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";

import styles from "../styles/Register.module.css";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:10000/api/auth/signup",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError(response.data.error || "Registration error");
      }

      setName("");
      setEmail("");
      setPassword("");
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

        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <label className={styles.label}>Confirm Password</label>
        <input
          className={styles.input}
          type="password"
          name="confirm-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          Register
        </button>
      </form>
      <div className={styles.link}>
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </>
  );
};