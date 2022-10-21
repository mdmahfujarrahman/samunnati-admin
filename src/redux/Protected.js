import React from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Protected = ({ children }) => {
    const { auth } = useAuth();;
    return auth ? (
        children
    ) : (
        <Navigate to="/login" replace />
    );
};
export default Protected;
