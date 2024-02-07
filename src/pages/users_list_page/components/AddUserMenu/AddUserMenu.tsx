import {Button, Checkbox, Dialog, DialogContent, DialogTitle} from "@mui/material";
import styles from './AddUserMenu.module.css'
import IconTextField from "../../../../components/IconInput/IconTextField.tsx";
import {Email, People} from "@mui/icons-material";
import {useState} from "react";
import {Role} from "../../../../context/auth.context.ts";
import {validateEmail} from "../../../../utils/validateEmail.ts";

export interface AddUserMenuProps {
    show: boolean,
    onClose: () => void
}

const AddUserMenu = ({show, onClose}: AddUserMenuProps) => {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const updateEmail = (value: string) => {
        setEmailError('')
        setEmail(value)
    }

    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const updateFirstName = (value: string) => {
        setFirstNameError('')
        setFirstName(value)
    }

    const [secondName, setSecondName] = useState('')
    const [secondNameError, setSecondNameError] = useState('')
    const updateSecondName = (value: string) => {
        setSecondNameError('')
        setSecondName(value)
    }

    const [userRoles, setUserRoles] = useState<Role[]>(['user'])
    const [userRolesError, setUserRolesError] = useState('')
    const toggleRole = (role: Role) => {
        setUserRolesError('')
        if (userRoles.includes(role)) {
            setUserRoles(userRoles.filter((value) => value !== role))
        } else {
            setUserRoles([...userRoles, role])
        }
    }

    const registerUser = () => {
        if (!email) {
            setEmailError('Введите почту!')
        } else if (!validateEmail(email)) {
            setEmailError('Неверный формат почты!')
        }
        if (!firstName) {
            setFirstNameError('Введите имя!')
        }
        if (!secondName) {
            setSecondNameError('Введите фамилию!')
        }
        if (userRoles.length === 0) {
            setUserRolesError('У пользователя должна быть хотя бы одна роль!')
        }
        if (!emailError && !firstNameError && !secondNameError && !userRolesError) {
            console.log('Ошибки нет!');
        }
    }

    return (
        <div className={styles.dialog}>
            <Dialog
                open={show}
                onClose={() => onClose()}
                PaperProps={{
                    sx: {
                        borderRadius: "20px",
                        padding: "10px"
                    }
                }}
            >
                <DialogTitle className={styles.title}>Регистрация пользователя</DialogTitle>
                <DialogContent className={styles.content}>
                    <div className={styles.form}>
                        <IconTextField
                            label="Введите почту"
                            startIcon={<Email/>}
                            value={email}
                            error={!!emailError}
                            onChange={(value) => updateEmail(value)}
                            helperText={emailError}
                        />
                        <IconTextField
                            label="Введите имя"
                            startIcon={<People/>}
                            value={firstName}
                            error={!!firstNameError}
                            onChange={(value) => updateFirstName(value)}
                            helperText={firstNameError}
                        />
                        <IconTextField
                            label="Введите фамилию"
                            value={secondName}
                            error={!!secondNameError}
                            onChange={(value) => updateSecondName(value)}
                            helperText={secondNameError}
                            startIcon={<People/>}
                        />
                        <div className={styles.label}>Роли нового пользователя:</div>
                        <div className={styles.checkBoxContainer}>
                            <Checkbox
                                className={styles.checkBox}
                                checked={userRoles.includes('admin')}
                                onChange={() => toggleRole('admin')}
                                sx={{
                                    '&.Mui-checked': {
                                        color: "var(--primary-blue)",
                                    },
                                }}
                            />
                            Администратор
                        </div>
                        <div className={styles.checkBoxContainer}>
                            <Checkbox
                                className={styles.checkBox}
                                checked={userRoles.includes('user')}
                                onChange={() => toggleRole('user')}
                                sx={{
                                    '&.Mui-checked': {
                                        color: "var(--primary-blue)",
                                    },
                                }}
                            />
                            Пользователь очереди
                        </div>
                        {userRolesError && <div className={styles.errorMessage}>{userRolesError}</div>}
                        <div className={styles.buttonsSection}>
                            <Button onClick={() => onClose()}>
                                Закрыть
                            </Button>
                            <Button style={{flex: 1}} onClick={() => registerUser()}>
                                Зарегистрировать
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddUserMenu;