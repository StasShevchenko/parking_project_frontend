import AlertDialog from "../../../../components/AlertDialog/AlertDialog.tsx";
import styles from './ChangePasswordDialog.module.css'
import ObscuredInput from "../../../../components/ObscuredInput/ObscuredInput.tsx";
import {Lock} from "@mui/icons-material";
import LoadingButton from "../../../../components/LoadingButton/LoadingButton.tsx";
import {Alert, Button} from "@mui/material";
import {useContext, useState} from "react";
import {UserApi} from "../../../../data/user.api.ts";
import {useApi} from "../../../../hooks/useApi.ts";
import {useMutation} from "@tanstack/react-query";
import {ChangePasswordDto} from "../../../../data/dto/changePassword.dto.ts";
import {AxiosError} from "axios";
import {AuthContext} from "../../../../context/auth.context.ts";

export interface ChangePasswordDialog {
    onClose: () => void
}

const ChangePasswordDialog = ({onClose}: ChangePasswordDialog) => {
    const {authState, setAuthState} = useContext(AuthContext)

    const [oldPassword, setOldPassword] = useState('')
    const [oldPasswordError, setOldPasswordError] = useState('')

    const [newPassword, setNewPassword] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')

    const [repeatPassword, setRepeatPassword] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState('')

    const [passwordChanged, setPasswordChanged] = useState(false)

    const userApi = useApi(UserApi)
    const changePasswordMutation = useMutation({
        mutationFn: ({data}: { data: ChangePasswordDto }) => userApi.changePassword(data),
        onError: (error: AxiosError) => {
            if ((error.response?.data as any).message === 'Wrong password') {
                setOldPasswordError('Неверный пароль!')
            }
            if ((error.response?.data as any).message === 'Passwords should match') {
                setRepeatPasswordError('Пароли должны совпадать!')
            }
            if ((error.response?.data as any).message === 'Weak password') {
                setNewPasswordError('Слабый пароль! (используйте буквы и цифры)')
            }
        },
        onSuccess: () => {
            setPasswordChanged(true)
            setAuthState({
                ...authState,
                user: {
                    ...authState.user!,
                    changedPassword: true
                }
            })
            clearForm()
        }
    })

    const clearErrors = () => {
        setOldPasswordError('')
        setNewPasswordError('')
        setRepeatPasswordError('')
    }
    const updateOldPassword = (value: string) => {
        setPasswordChanged(false)
        setOldPassword(value)
        clearErrors()
    }

    const updateNewPassword = (value: string) => {
        setPasswordChanged(false)
        setNewPassword(value)
        clearErrors()
    }

    const updateRepeatPassword = (value: string) => {
        setPasswordChanged(false)
        setRepeatPassword(value)
        clearErrors()
    }

    const clearForm = () => {
        setOldPassword('')
        setNewPassword('')
        setRepeatPassword('')
    }

    const validateForm = (): boolean => {
        let isError = false
        if (newPassword !== repeatPassword) {
            setRepeatPasswordError('Пароли должны совпадать!')
            isError = true
        }
        if (newPassword.length < 8) {
            setNewPasswordError('Пароль не менее 8 символов!')
            isError = true
        }
        if (!oldPassword) {
            setOldPasswordError('Введите старый пароль!');
            isError = true;
        }
        if (!newPassword) {
            setNewPasswordError('Введите новый пароль!')
            isError = true
        }
        if (!repeatPassword) {
            setRepeatPasswordError('Подтвердите пароль!')
            isError = true
        }
        return isError
    }

    const changePassword = () => {
        const isValid = !validateForm()
        if (isValid) {
            changePasswordMutation.mutate({
                data: {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    repeatNewPassword: repeatPassword
                }
            })
        }
    }

    return (
        <AlertDialog onClose={() => onClose()} title="Смена пароля">
            <div className={styles.content}>
                <div className={styles.label}>
                    Введите старый пароль:
                </div>
                <ObscuredInput
                    startIcon={<Lock/>}
                    onChange={updateOldPassword}
                    value={oldPassword}
                    error={!!oldPasswordError}
                    helperText={oldPasswordError}
                    label="Старый пароль"
                />
                <div className={styles.label}>
                    Новый пароль (не менее 8 символов):
                </div>
                <ObscuredInput
                    startIcon={<Lock/>}
                    value={newPassword}
                    error={!!newPasswordError}
                    helperText={newPasswordError}
                    onChange={updateNewPassword}
                    label="Новый пароль"
                />
                <ObscuredInput
                    startIcon={<Lock/>}
                    value={repeatPassword}
                    error={!!repeatPasswordError}
                    helperText={repeatPasswordError}
                    onChange={updateRepeatPassword}
                    label="Подтверждение пароля"
                />
                <div className={styles.buttonsSection}>
                    <Button onClick={() => onClose()}>
                        Закрыть
                    </Button>
                    <LoadingButton onClick={() => changePassword()} loading={changePasswordMutation.isPending}>
                        Сменить пароль
                    </LoadingButton>
                </div>
                {passwordChanged && <Alert onClose={() => setPasswordChanged(false)} security="success">
                    Смена пароля прошла успешно!
                </Alert>}
            </div>
        </AlertDialog>
    );
};

export default ChangePasswordDialog;