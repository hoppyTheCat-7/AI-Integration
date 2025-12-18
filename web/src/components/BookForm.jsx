import { useState } from "react";
import axios from "axios";

import styles from "../styles/Books.module.css";

export default function BookForm() {
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        genre: "",
        author: "",
        publicationYear: "",
        pageCount: "",
        rating: "",
        isRead: false,
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const inputName = e.target.name;

        if (e.target.type === "checkbox") {
            setFormData({
                ...formData,
                [inputName]: e.target.checked,
            });
        } else {
            setFormData({
                ...formData,
                [inputName]: e.target.value,
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...formData,
                publicationYear: Number(formData.publicationYear),
                pageCount: Number(formData.pageCount),
                rating: Number(formData.rating),
            };

            await axios.post(
                "http://localhost:10000/api/book",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFormData({
                title: "",
                description: "",
                genre: "",
                author: "",
                publicationYear: "",
                pageCount: "",
                rating: "",
                isRead: false,
            });

            setError(null);
        } catch (err) {
            setError("Failed to create book");
        }
    };

    return (
        <div>
            <h3>Create a book:</h3>
            {error && <div style={{ color: "red" }}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={formData.genre}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="publicationYear"
                    placeholder="Publication Year"
                    value={formData.publicationYear}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="pageCount"
                    placeholder="Page Count"
                    value={formData.pageCount}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="rating"
                    placeholder="Rating (0–5)"
                    value={formData.rating}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label>
                    <input
                        type="checkbox"
                        name="isRead"
                        checked={formData.isRead}
                        onChange={handleChange}
                    />
                    Read
                </label>

                <button type="submit">Create Book</button>
            </form>
        </div>
    );
}