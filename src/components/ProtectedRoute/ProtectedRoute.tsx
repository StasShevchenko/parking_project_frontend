import React, {useContext} from 'react';
import {AuthContext} from "../../context/auth.context.ts";
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {authState} = useContext(AuthContext)
    return (
        <>
            {authState.isAuthenticated === "true" ? children : <Navigate to="/login"/>}
        </>
    );
};

export default ProtectedRoute;