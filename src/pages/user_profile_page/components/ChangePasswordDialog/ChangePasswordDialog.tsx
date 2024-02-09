import AlertDialog from "../../../../components/AlertDialog/AlertDialog.tsx";
import styles from './ChangePasswordDialog.module.css'
import ObscuredInput from "../../../../components/ObscuredInput/ObscuredInput.tsx";
import {Lock} from "@mui/icons-material";
import LoadingButton from "../../../../components/LoadingButton/LoadingButton.tsx";
import {Button} from "@mui/material";
import {useState} from "react";

export interface ChangePasswordDialog {
    onClose: () => void
}

const ChangePasswordDialog = ({onClose}: ChangePasswordDialog) => {

    const [oldPassword, setOldPassword] = useState('')
    const [oldPasswordError, setOldPasswordError] = useState('')

    const [newPassword, setNewPassword] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')

    const [repeatPassword, setRepeatPassword] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState('')

    const clearErrors = () => {
        setOldPasswordError('')
        setNewPasswordError('')
        setRepeatPasswordError('')
    }
    const updateOldPassword = (value: string) => {
        setOldPassword(value)
        clearErrors()
    }

    const updateNewPassword = (value: string) => {
        setNewPassword(value)
        clearErrors()
    }

    const updateRepeatPassword = (value: string) => {
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
        const isValid = validateForm()
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
                    <LoadingButton onClick={() => changePassword()} loading={false}>
                        Сменить пароль
                    </LoadingButton>
                </div>
            </div>
        </AlertDialog>
    );
};

export default ChangePasswordDialog;