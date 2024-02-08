import React, {useContext} from 'react';
import {AuthContext} from "../../context/auth.context.ts";
import {Navigate} from "react-router-dom";
import {useUser} from "../../hooks/useUser.ts";

interface ProtectedRouteProps {
    children: React.ReactNode,
    role?: string
}

const ProtectedRoute = ({children, role}: ProtectedRouteProps) => {
    const {authState} = useContext(AuthContext)
    const user = useUser()

    return (
        <>
            {(authState.isAuthenticated === "true"
            && (role ? user[role!] : true)) ? children : <Navigate to="/login"/>}
        </>
    );
};

export default ProtectedRoute;