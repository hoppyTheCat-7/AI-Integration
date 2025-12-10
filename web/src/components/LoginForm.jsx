import { useState } from "react";
import axios from "axios";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:10000/api/auth/login", data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");

        setEmail("");
        setPassword("");
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
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p style={{ color: "blue" }}>Loading...</p>}

        <input
          type="email"
          name="email"
          placeholder="Please, enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Please, enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </>
  );
};