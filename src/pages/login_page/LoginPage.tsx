import styles from "./LoginPage.module.css"
import CarImage from "../../assets/images/car_image.svg?react"
import {Button, IconButton} from "@mui/material";
import {Email, Lock, Visibility, VisibilityOff} from "@mui/icons-material"
import IconTextField from "../../components/IconInput/IconTextField.tsx";
import {useState} from "react";

const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={styles.loginPageWrapper}>
            <div className={styles.imageWrapper}>
                <CarImage className={styles.carImage}/>
            </div>
            <div className={styles.formWrapper}>
                <form className={styles.loginForm}>
                    <h1 className={styles.title}>Добро пожаловать!</h1>
                    <IconTextField
                        startIcon={<Email/>}
                        label="Введите почту"
                    />
                    <IconTextField
                        startIcon={<Lock/>}
                        label="Введите пароль"
                        type={showPassword ? 'text' : 'password'}
                        endIcon={
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        }
                    />
                    <Button>Войти</Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;