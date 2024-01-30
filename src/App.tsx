import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/login_page/LoginPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "@mui/material";
import {componentsTheme} from "./theme/componentsTheme.ts";
import {jwtDecode} from "jwt-decode";
import {useState} from "react";
import {AuthContext, AuthState} from "./context/auth.context.ts";
import {AxiosContext} from "./context/axios.context.ts";
import {AxiosClient} from "./data/axios.client.ts";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="*" element={<Navigate to="/"/>} />
        </Route>
    )
)

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 10000
        },
        mutations: {
            retry: 2,
            retryDelay: 2000
        }
    }
})

const App = () => {

    const jwtString = window.localStorage.getItem('refreshToken')
    let jwt
    if (jwtString) {
        jwt = jwtDecode((jwtString))
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