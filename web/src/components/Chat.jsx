import { jwtDecode } from "jwt-decode";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

import styles from "../styles/SoilChat.module.css";

function getUserName() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    return decoded.name;
}

export default function Chat({
    title,
    endpoint,
    placeholder,
    emptyMessage,
}) {
    const userName = getUserName();
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { role: "user", content: input }]);
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                endpoint,
                { prompt: input },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessages((prev) => [
                ...prev,
                { role: "ai", content: res.data.answer || "No response." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: "Error communicating with server!" },
            ]);
        } finally {
            setInput("");
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                {userName && (
                    <div className={styles.userInfo}>Chatting as: {userName}</div>
                )}
            </div>

            <div className={styles.messagesContainer}>
                {messages.length === 0 && (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyStateIcon}>💬</div>
                        <p>{emptyMessage}</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`${styles.message} ${msg.role === "user"
                            ? styles.messageUser
                            : styles.messageAi
                            }`}
                    >
                        <div
                            className={`${styles.bubble} ${msg.role === "user"
                                ? styles.bubbleUser
                                : styles.bubbleAi
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className={styles.loading}>
                        <span>AI is thinking</span>
                        <div className={styles.loadingDots}>
                            <div className={styles.dot}></div>
                            <div className={styles.dot}></div>
                            <div className={styles.dot}></div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <form className={styles.form} onSubmit={handleSend}>
                <input
                    type="text"
                    className={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholder}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className={styles.button}
                    disabled={loading || !input.trim()}
                >
                    Send
                </button>
            </form>
        </div>
    );
}