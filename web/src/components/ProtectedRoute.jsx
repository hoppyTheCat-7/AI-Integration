import { isExpired, decodeToken } from "react-jwt";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({ allowedRoles }) {
    const token = localStorage.getItem("token");

    if (!token || isExpired(token)) {
        console.log("Token is missing or expired!");
        return <Navigate to="/login" replace />;
    }

    const decoded = decodeToken(token);

    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}