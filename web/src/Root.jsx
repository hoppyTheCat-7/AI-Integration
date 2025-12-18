import { Link, Outlet, useNavigate } from "react-router";
import { decodeToken } from "react-jwt";

import styles from "./styles/Navigation.module.css";

export default function Root() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const decoded = token ? decodeToken(token) : null;
    const isAdmin = decoded?.role === "admin";

    const handleLogout = () => {
        localStorage.removeItem("token");
        // localStorage.clear();
        navigate("/login");
    };

    const isLoggedIn = !!token;

    return (
        <div>
            <nav className={styles.nav}>
                <div className={styles.navLinks}>
                    {isLoggedIn ? (
                        <>
                            <Link to={"/"} className={styles.link}>
                                🏠 Home
                            </Link>
                            <Link to={"/soils"} className={styles.link}>
                                🌱 Soils
                            </Link>
                            <Link to={"/soil-chat"} className={styles.link}>
                                💬 Soil Chat
                            </Link>
                            <Link to="/books" className={styles.link}>
                                📚 Books
                            </Link>
                            <Link to={"/book-chat"} className={styles.link}>
                                💬 Book Chat
                            </Link>

                            {isAdmin && (
                                <Link to={"/users"} className={styles.link}>Users</Link>
                            )}
                            <button onClick={handleLogout} className={styles.logoutButton}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to={"/login"} className={styles.link}>
                                Login
                            </Link>
                            <Link to={"/register"} className={styles.link}>
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}