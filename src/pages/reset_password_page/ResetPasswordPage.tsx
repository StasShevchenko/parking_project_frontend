import styles from './ResetPasswordPage.module.css'
import CarImage from "../../assets/images/car_image.svg?react"
import IconTextField from "../../components/IconInput/IconTextField.tsx";
import {Email, Numbers, Lock} from "@mui/icons-material";
import LoadingButton from "../../components/LoadingButton/LoadingButton.tsx";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useApi} from "../../hooks/useApi.ts";
import {PasswordApi} from "../../data/password.api.ts";
import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import ObscuredInput from "../../components/ObscuredInput/ObscuredInput.tsx";
import {ForgotChangePasswordDto} from "../../data/dto/forgotChangePassword.dto.ts";
import {AxiosError} from "axios";

const ResetPasswordPage = () => {
    const navigate = useNavigate()
    const passwordApi = useApi(PasswordApi)

    const [stepNumber, setStepNumber] = useState(0)

    const [emailValue, setEmailValue] = useState('')
    const [sendKeyError, setSendKeyError] = useState('')
    const updateEmail = (value: string) => {
        setSendKeyError('')
        setEmailValue(value)
    }
    const sendKeyMutation = useMutation({
        mutationFn: ({email}: { email: string }) => passwordApi.sendForgotPasswordKey({email: email}),
        onSuccess: () => {
            setStepNumber(1)
        },
        onError: () => {
            setSendKeyError('Указанная почта не найдена!')
        }
    })

    const [codeValue, setCodeValue] = useState('')
    const [sendCodeError, setSendCodeError] = useState('')
    const updateCode = (value: string) => {
        setSendCodeError('')
        setCodeValue(value)
    }

    const reviewCodeMutation = useMutation({
        mutationFn: ({code}: { code: number }) => passwordApi.reviewMailKey({key: code}),
        onSuccess: () => {
            setStepNumber(2)
        },
        onError: () => {
            setSendCodeError('Неверный код!')
        }
    })

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState('')

    const updatePassword = (value: string) => {
        setPasswordError('')
        setPassword(value)
    }

    const updateRepeatPassword = (value: string) => {
        setRepeatPassword(value)
        setRepeatPasswordError('')
    }

    const validatePasswords = (): boolean => {
        let isError = false
        if (password !== repeatPassword) {
            setRepeatPasswordError('Пароли должны совпадать!')
            isError = true
        }
        if (password.length < 8) {
            setPasswordError('Пароль не менее 8 символов!')
            isError = true
        }
        if (!password) {
            setPasswordError('Введите новый пароль!')
            isError = true
        }
        if (!repeatPassword) {
            setRepeatPasswordError('Подтвердите пароль!')
            isError = true
        }
        return isError
    }
    const forgotPasswordMutation = useMutation({
        mutationFn: (dto: ForgotChangePasswordDto) => passwordApi.forgotPassword(dto),
        onSuccess: () => {
            setStepNumber(3)
        },
        onError: (error: AxiosError) => {
            if ((error.response?.data as any).message === 'Passwords should match') {
                setRepeatPasswordError('Пароли должны совпадать!')
            }
            if ((error.response?.data as any).message === 'Weak password') {
                setPasswordError('Слабый пароль! (используйте буквы и цифры)')
            }
        }
    })

    const changePassword = () => {
        const isError = validatePasswords()
        if (!isError) {
         forgotPasswordMutation.mutate({
             newPassword: password,
             repeatNewPassword: repeatPassword,
             key: parseInt(codeValue)
         })
        }
    }


    return (
        <div className={styles.resetPasswordPageWrapper}>
            <div className={styles.imageWrapper}>
                <CarImage className={styles.carImage}/>
            </div>
            <div className={styles.formWrapper}>
                <form className={styles.form}>
                    <h1 className={styles.title}>Восстановление пароля</h1>
                    {stepNumber === 0 &&
                        <>
                            <div className={styles.hint}>Введите почту для сброса пароля</div>
                            <IconTextField
                                value={emailValue}
                                onChange={updateEmail}
                                error={!!sendKeyError}
                                helperText={sendKeyError}
                                startIcon={<Email/>}
                                label="Введите почту"
                            />
                            <LoadingButton
                                onClick={() => sendKeyMutation.mutate({email: emailValue})}
                                loading={sendKeyMutation.isPending}>
                                Подтвердить
                            </LoadingButton>
                        </>
                    }
                    {stepNumber === 1 &&
                        <>
                            <div className={styles.hint}>Введите код отправленный на указанную вами почту</div>
                            <IconTextField
                                value={codeValue}
                                onChange={updateCode}
                                error={!!sendCodeError}
                                helperText={sendCodeError}
                                startIcon={<Numbers/>}
                                label="Код подтверждения"
                            />
                            <LoadingButton
                                onClick={() => reviewCodeMutation.mutate({code: parseInt(codeValue)})}
                                loading={reviewCodeMutation.isPending}>
                                Подтвердить
                            </LoadingButton>
                        </>
                    }
                    {stepNumber === 2 &&
                        <>
                            <div className={styles.hint}>Введите новый пароль</div>
                            <ObscuredInput
                                label="Пароль"
                                startIcon={<Lock/>}
                                value={password}
                                onChange={updatePassword}
                                error={!!passwordError}
                                helperText={passwordError}
                            />
                            <ObscuredInput
                                label="Подтверждение пароля"
                                startIcon={<Lock/>}
                                value={repeatPassword}
                                onChange={updateRepeatPassword}
                                error={!!repeatPasswordError}
                                helperText={repeatPasswordError}
                            />
                            <LoadingButton
                                onClick={() => changePassword()}
                                loading={forgotPasswordMutation.isPending}>
                                Подтвердить
                            </LoadingButton>
                        </>
                    }
                    {stepNumber === 3 && <div className={styles.hint}>
                        Пароль был успешно изменен!
                    </div>}
                    <Button onClick={() => navigate(-1)}>
                        На главную
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;