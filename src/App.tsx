import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/login_page/LoginPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "@mui/material";
import {componentsTheme} from "./theme/componentsTheme.ts";
import {jwtDecode} from "jwt-decode";
import {useState} from "react";
import {AuthContext, AuthState, User} from "./context/auth.context.ts";
import {AxiosContext} from "./context/axios.context.ts";
import {AxiosClient} from "./data/axios.client.ts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import HomePage from "./pages/home_page/HomePage.tsx";
import Root from "./pages/Root/Root.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<LoginPage/>}/>
            <Route element={
                <ProtectedRoute>
                    <Root/>
                </ProtectedRoute>}>
                <Route path="/" element={<HomePage/> }/>
            </Route>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Route>
    )
)

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            staleTime: 10000
        },
        mutations: {
            retry: 0,
            retryDelay: 2000
        }
    }
})

const App = () => {

    const jwtString = window.localStorage.getItem('refreshToken')
    let jwt
    if (jwtString) {
        jwt = jwtDecode<User>((jwtString))
    }
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: jwt != null ? "true" : "false",
        user: jwt,
    })
    const authContextValue = {
        authState: authState,
        setAuthState: setAuthState
    }
    const axiosInstance = AxiosClient.get(authContextValue)

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={componentsTheme}>
                <AuthContext.Provider value={authContextValue}>
                    <AxiosContext.Provider value={axiosInstance}>
                        <RouterProvider router={router}/>
                    </AxiosContext.Provider>
                </AuthContext.Provider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;