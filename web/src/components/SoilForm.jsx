import { useState } from "react";
import axios from "axios";

export default function SoilForm() {
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        ph: "",
        humus: "",
        location: "",
        culture: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...formData,
                ph: Number(formData.ph),
                humus: Number(formData.humus),
                culture: formData.culture.split(",").map(cultureName => cultureName.trim()),
            }

            await axios.post(
                "http://localhost:10000/api/soil",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFormData({
                name: "",
                type: "",
                ph: "",
                humus: "",
                location: "",
                culture: "",
            });

            setError(null);

        } catch (err) {
            console.error(err);
            setError("Failed to create soil");
        }
    };

    return (
        <div>
            <h3>Create Soil</h3>
            {error && <div style={{ color: "red" }}>{error}</div>}

            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    value={formData.type}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="ph"
                    placeholder="pH"
                    value={formData.ph}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="humus"
                    placeholder="Humus"
                    value={formData.humus}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="culture"
                    placeholder="Culture"
                    value={formData.culture}
                    onChange={handleChange}
                />
                <button type="submit">Create Soil</button>
            </form>
        </div>
    );
}