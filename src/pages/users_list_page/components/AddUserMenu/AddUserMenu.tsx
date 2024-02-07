import {Alert, Button, Checkbox, Dialog, DialogContent, DialogTitle} from "@mui/material";
import styles from './AddUserMenu.module.css'
import IconTextField from "../../../../components/IconInput/IconTextField.tsx";
import {Email, People} from "@mui/icons-material";
import {useState} from "react";
import {Role} from "../../../../context/auth.context.ts";
import {validateEmail} from "../../../../utils/validateEmail.ts";
import {useApi} from "../../../../hooks/useApi.ts";
import {AuthApi} from "../../../../data/auth.api.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {RegisterUserDto} from "../../../../data/dto/registerUser.dto.ts";
import LoadingButton from "../../../../components/LoadingButton/LoadingButton.tsx";
import {UserApi} from "../../../../data/user.api.ts";

export interface AddUserMenuProps {
    show: boolean,
    onClose: () => void
}

const AddUserMenu = ({show, onClose}: AddUserMenuProps) => {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const updateEmail = (value: string) => {
        setIsUserRegistered(false)
        setEmailError('')
        setEmail(value)
    }

    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const updateFirstName = (value: string) => {
        setIsUserRegistered(false)
        setFirstNameError('')
        setFirstName(value)
    }

    const [secondName, setSecondName] = useState('')
    const [secondNameError, setSecondNameError] = useState('')
    const updateSecondName = (value: string) => {
        setIsUserRegistered(false)
        setSecondNameError('')
        setSecondName(value)
    }

    const [userRoles, setUserRoles] = useState<Role[]>(['user'])
    const [userRolesError, setUserRolesError] = useState('')
    const toggleRole = (role: Role) => {
        setIsUserRegistered(false)
        setUserRolesError('')
        if (userRoles.includes(role)) {
            setUserRoles(userRoles.filter((value) => value !== role))
        } else {
            setUserRoles([...userRoles, role])
        }
    }

    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [isRegisterError, setIsRegisterError] = useState(false)
    const [isUserRegistered, setIsUserRegistered] = useState(false)

    const queryClient = useQueryClient()
    const authApi = useApi(AuthApi)
    const registerMutation = useMutation({
        mutationFn: ({user} : {user: RegisterUserDto}) => {
            return authApi.register(user)
        },
        onSuccess: () => {
          clearForm()
            setIsRegisterLoading(false)
            setIsUserRegistered(true)
            queryClient.invalidateQueries({ queryKey: [UserApi.getAllUsersKey] })
        },
        onError: () => {
            setIsRegisterLoading(false)
            setIsRegisterError(true)
        }
    })

    const clearForm = () => {
        setEmail('')
        setFirstName('')
        setSecondName('')
    }

    const validateForm = (): boolean => {
        let isError = false
        setIsUserRegistered(false)
        setIsRegisterError(false)
        if (!email) {
            setEmailError('Введите почту!')
            isError = true
        } else if (!validateEmail(email)) {
            setEmailError('Неверный формат почты!')
            isError = true
        }
        if (!firstName) {
            setFirstNameError('Введите имя!')
            isError = true
        }
        if (!secondName) {
            setSecondNameError('Введите фамилию!')
            isError = true
        }
        if (userRoles.length === 0) {
            setUserRolesError('У пользователя должна быть хотя бы одна роль!')
            isError =true
        }
        return isError
    }
    const registerUser = async () => {
        const isError = validateForm()
        if (!isError) {
            setIsRegisterLoading(true)
            clearForm()
            registerMutation.mutate({
                user: {
                    email: email,
                    firstName: firstName,
                    secondName: secondName,
                    isAdmin: userRoles.includes('admin'),
                    queueUser: userRoles.includes('user')
                }
            })
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
                            <LoadingButton loading={isRegisterLoading} style={{flex: 1}} onClick={() => registerUser()}>
                                Зарегистрировать
                            </LoadingButton>
                        </div>
                        {isUserRegistered && (<Alert onClose={() => {setIsUserRegistered(false)}} severity="success">
                            Пользователь успешно зарегистрирован!
                        </Alert>)}
                        {isRegisterError && (
                            <Alert onClose={() => {setIsRegisterError(false)}} severity="error">
                                При регистрации произошла ошибка!
                            </Alert>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddUserMenu;