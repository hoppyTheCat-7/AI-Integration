import { useState } from "react";
import axios from "axios";

export const Home = () => {
  const [input, setInput] = useState("");

  const testConnection = async () => {
    try {
      const res = await axios.get("http://localhost:10000/api/test");
      console.log(res.data);
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const sendEcho = async () => {
    try {
      const res = await axios.post("http://localhost:10000/api/echo", { text: input });
      console.log(res.data);
      alert(JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Home Page</h1>

      <div>
        <h2>Test connection</h2>
        <button onClick={testConnection}>Test</button>
      </div>

      <div>
        <h2>Echo test</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text"
        />
        <button onClick={sendEcho}>Send Echo</button>
      </div>
    </>
  );
};