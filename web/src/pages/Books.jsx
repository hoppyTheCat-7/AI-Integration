import axios from "axios";
import { useEffect, useState } from "react";

import BookForm from "../components/BookForm";

import styles from "../styles/Books.module.css";

export default function Books() {
    const token = localStorage.getItem("token");

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:10000/api/book", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                setBooks(res.data);
                setError(null);
            } catch (err) {
                setError("Failed to load books.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [token]);

    return (
        <div className={styles.container}>
            <h1>Books</h1>

            <BookForm />

            {error && <div className={styles.error}>{error}</div>}
            {loading && <p>Loading books...</p>}

            {!loading && books.length === 0 && <p>No books found.</p>}

            {!loading && books.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th>Pages</th>
                            <th>Rating</th>
                            <th>Read</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.publicationYear}</td>
                                <td>{book.pageCount}</td>
                                <td>{book.rating}</td>
                                <td>{book.isRead ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}