import axios from "axios";
import { useEffect, useState } from "react";

import styles from "../styles/Users.module.css";

export default function Users() {
    const token = localStorage.getItem("token");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:10000/api/users", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data) {
                    setUsers(res.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading users...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Users Management</h1>
                <p className={styles.subtitle}>
                    View and manage all registered users in the system
                </p>
            </div>

            {users.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>👥</div>
                    <p className={styles.emptyStateText}>No users found</p>
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th className={styles.th}>Name</th>
                                <th className={styles.th}>Email</th>
                                <th className={styles.th}>Role</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {users.map((user, index) => (
                                <tr key={index} className={styles.tr}>
                                    <td className={styles.td}>{user.name}</td>
                                    <td className={styles.td}>{user.email}</td>
                                    <td className={styles.td}>
                                        <span
                                            className={`${styles.roleBadge} ${user.role === "admin"
                                                    ? styles.roleAdmin
                                                    : styles.roleUser
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}