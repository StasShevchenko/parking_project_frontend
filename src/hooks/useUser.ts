import {useContext} from "react";
import {AuthContext} from "../context/auth.context.ts";

export const useUser = () => {
    const {authState} = useContext(AuthContext)!
    return authState.user!
}