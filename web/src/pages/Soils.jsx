import axios from "axios";
import { useEffect, useState } from "react";

import SoilForm from "../components/SoilForm";

import styles from "../styles/Soils.module.css";

export default function Soils() {
    const token = localStorage.getItem("token");

    const [soils, setSoils] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchSoils = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:10000/api/soil", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (res.data) {
                    setSoils(res.data);
                    setError(null);
                }
            } catch (err) {
                console.error("Error fetching soils", err);
                setError("Failed to load soils. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchSoils();
    }, [token]);

    return (
        <div className={styles.container}>
            <h1>Soils</h1>

            <SoilForm />

            {error && <div className={styles.error}>{error}</div>}
            {loading && <p>Loading soils...</p>}

            {!loading && soils.length === 0 && <p>No soils found.</p>}

            {!loading && soils.length > 0 && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>pH</th>
                            <th>Humus</th>
                            <th>Location</th>
                            <th>Culture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {soils.map((soil) => (
                            <tr key={soil._id}>
                                <td>{soil.name}</td>
                                <td>{soil.type}</td>
                                <td>{soil.ph}</td>
                                <td>{soil.humus}</td>
                                <td>{soil.location}</td>
                                <td>{soil.culture.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}