import styles from "./LoginPage.module.css"
import CarImage from "../../assets/images/car_image.svg?react"
import {IconButton} from "@mui/material";
import {Email, Lock, Visibility, VisibilityOff} from "@mui/icons-material"
import IconTextField from "../../components/IconInput/IconTextField.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext, User} from "../../context/auth.context.ts";
import {useApi} from "../../hooks/useApi.ts";
import {AuthApi} from "../../data/auth.api.tsx";
import {useMutation} from "@tanstack/react-query";
import LoadingButton from "../../components/LoadingButton/LoadingButton.tsx";
import {LoginUserDto} from "../../data/dto/loginUser.dto.ts";
import {jwtDecode} from "jwt-decode";
import {Navigate, useNavigate} from "react-router-dom";
import {AxiosError} from "axios";

const LoginPage = () => {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [formError, setFormError] = useState('')
    const updateEmail = (value: string) => {
        setEmail(value)
        setEmailError('')
        setFormError('')
    }

    const updatePassword = (value: string) => {
        setPassword(value)
        setPasswordError('')
        setFormError('')
    }

    const login = () => {
        if (!email) setEmailError('Введите почту!')
        if (!password) setPasswordError('Введите пароль!')

        if (email && password) {
            loginMutation.mutate({email: email, password: password})
        }
    }

    const {authState, setAuthState} = useContext(AuthContext)

    useEffect(() => {
        if (authState.isAuthenticated === "true") navigate('/')
    }, [authState, navigate])

    const authApi = useApi(AuthApi)
    const loginMutation = useMutation({
        mutationFn: ({email, password}: LoginUserDto) => {
            return authApi.login(email, password)
        },
        onSuccess: (data) => {
            const jwtRefresh = data.jwtRefresh
            window.localStorage.setItem('refreshToken', jwtRefresh)
            const jwt = jwtDecode<User>(data.jwtAccess)
            setAuthState(
                {
                    isAuthenticated: 'true',
                    user: jwt
                }
            )
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 400) {
                setFormError('Неверные логин или пароль!')
            } else {
                console.log(error)
            }
        }
    })

    return (
        <>
            {authState.isAuthenticated === "true" ? <Navigate to="/"/> : (<div className={styles.loginPageWrapper}>
                <div className={styles.imageWrapper}>
                    <CarImage className={styles.carImage}/>
                </div>
                <div className={styles.formWrapper}>
                    <form className={styles.loginForm}>
                        <h1 className={styles.title}>Добро пожаловать!</h1>
                        <IconTextField
                            startIcon={<Email/>}
                            label="Введите почту"
                            value={email}
                            error={!!emailError}
                            helperText={emailError}
                            onChange={(value) => updateEmail(value)}
                        />
                        <IconTextField
                            startIcon={<Lock/>}
                            label="Введите пароль"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            error={!!passwordError}
                            helperText={passwordError}
                            onChange={(value) => updatePassword(value)}
                            onKeyDown={(event) => {
                                console.log(event.key)
                                if (event.key === "Enter") {
                                    login()
                                }
                            }}
                            endIcon={
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            }
                        />
                        {!!formError && <div className={styles.errorMessage}>{formError}</div>}
                        <LoadingButton
                            onClick={() => login()}
                            loading={loginMutation.isPending}
                        >Войти</LoadingButton>
                    </form>
                </div>
            </div>)}
        </>
    );
};

export default LoginPage;