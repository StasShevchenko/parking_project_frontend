import {createContext} from "react";

export interface User{
    id: number
    email: string
    is_staff: boolean
    is_superuser: false
    in_queue: false
    firstName: string
    secondName: string
    changePassword: boolean
    avatar?: string
}

export interface AuthState{
    isAuthenticated: 'true' | 'false' | 'loading'
    user?: User
}

export interface AuthContextType{
    authState: AuthState
    setAuthState: (authState: AuthState) => void
}

export const AuthContext = createContext<AuthContextType>({
    authState: {
        isAuthenticated: 'false',
        user: undefined
    },
    setAuthState: () => {}
})