import {createContext} from "react";

export interface User{
    id: number
    email: string
    isAdmin: boolean
    isSuperAdmin: false
    queueUser: false
    firstName: string
    secondName: string
    changedPassword: boolean
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