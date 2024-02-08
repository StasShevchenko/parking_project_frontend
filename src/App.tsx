import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/login_page/LoginPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {StyledEngineProvider, ThemeProvider} from "@mui/material";
import {componentsTheme} from "./theme/componentsTheme.ts";
import {jwtDecode} from "jwt-decode";
import {useState} from "react";
import {AuthContext, AuthState, User} from "./context/auth.context.ts";
import {AxiosContext} from "./context/axios.context.ts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import HomePage from "./pages/home_page/HomePage.tsx";
import Root from "./pages/root_page/Root.tsx";
import UsersListPage from "./pages/users_list_page/UsersListPage.tsx";
import UserPage from "./pages/user_page/UserPage.tsx";
import {AxiosClient} from "./data/axios/axios.client.ts";
import SwapRequestsPage from "./pages/swap_requests_page/SwapRequestsPage.tsx";
import UserProfilePage from "./pages/user_profile_page/UserProfilePage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<LoginPage/>}/>
            <Route element={
                <ProtectedRoute>
                    <Root/>
                </ProtectedRoute>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/swap_requests" element={
                    <ProtectedRoute role="queueUser">
                    <SwapRequestsPage/>
                </ProtectedRoute>  }/>
                <Route path="/users_list" element={<UsersListPage/>}/>
                <Route path="/users_list/:id" element={<UserPage/>}/>
                <Route path="/user_profile" element={<UserProfilePage/>}/>
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
        jwt = jwtDecode<{user: User}>(jwtString)
    }
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: jwt != null ? "true" : "false",
        user: jwt!.user,
    })
    const authContextValue = {
        authState: authState,
        setAuthState: setAuthState
    }
    const axiosInstance = AxiosClient.get(authContextValue)

    return (
        <QueryClientProvider client={queryClient}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={componentsTheme}>
                    <AuthContext.Provider value={authContextValue}>
                        <AxiosContext.Provider value={axiosInstance}>
                            <RouterProvider router={router}/>
                        </AxiosContext.Provider>
                    </AuthContext.Provider>
                </ThemeProvider>
            </StyledEngineProvider>
        </QueryClientProvider>
    );
};

export default App;