import { RegisterForm } from "../components/RegisterForm";
import styles from "../styles/Register.module.css";

export const Register = () => {

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Register</h1>
                <RegisterForm />
            </div>
        </div>
    );
};