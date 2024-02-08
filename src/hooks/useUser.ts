import {useContext} from "react";
import {AuthContext, User} from "../context/auth.context.ts";

export const useUser = (): User => {
    const {authState} = useContext(AuthContext)!
    return authState.user!
}