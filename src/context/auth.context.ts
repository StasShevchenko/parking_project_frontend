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
    [key: string]: boolean | number | string | undefined
}

export type Role = 'user' | 'admin' | 'super_admin'

export interface AuthState{
    isAuthenticated: 'true' | 'false' | 'loading'
    user?: User
}

export interface AuthContextType {
    authState: AuthState
    setAuthState: (authState: AuthState) => void
    updateUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    authState: {
        isAuthenticated: 'false',
        user: undefined
    },
    updateUser: async () => {},
    setAuthState: () => {}
})