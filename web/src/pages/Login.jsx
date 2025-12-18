import { LoginForm } from "../components/LoginForm";
import styles from "../styles/Login.module.css";

export const Login = () => {

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Login</h1>
                <LoginForm />
            </div>
        </div>
    );
};