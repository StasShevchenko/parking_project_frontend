import styles from './UserProfilePage.module.css'
import {useUser} from "../../hooks/useUser.ts";
import UserAvatar from "../../components/UserAvatar/UserAvatar.tsx";
import {getUserRolesString} from "../../data/dto/userInfo.dto.ts";
import {Button} from "@mui/material";
import {useApi} from "../../hooks/useApi.ts";
import {AuthApi} from "../../data/auth.api.ts";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/auth.context.ts";
import ChangePasswordDialog from "./components/ChangePasswordDialog/ChangePasswordDialog.tsx";

const UserProfilePage = () => {
    const user = useUser()
    const authApi = useApi(AuthApi)
    const {authState, setAuthState} = useContext(AuthContext)!
    const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false)
    const logout = () => {
        authApi.logout()
        window.localStorage.removeItem('refreshToken')
        setAuthState({
            ...authState,
            isAuthenticated: "false"
        })
    }
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.title}>
                Личный кабинет
            </div>
            <div className={styles.userInfo}>
                <div className={styles.userNameSection}>
                    <UserAvatar avatarPath={user.avatar}/>
                    Рады вас видеть, {user.firstName}
                </div>
                <div className={styles.card}>
                    <div>
                        Ваша почта: {user.email}
                    </div>
                    <div>
                        Ваши роли: {getUserRolesString(user)}
                    </div>
                    {!user.changedPassword &&
                        <div className={styles.warningText}>
                            Настоятельно рекомендуем вам сменить сгенерированный пароль
                            на новый!
                        </div>
                    }
                </div>
                <Button onClick={() => setShowChangePasswordDialog(true)}>
                    Сменить пароль
                </Button>
                <Button onClick={() => logout()}>
                    Выйти
                </Button>
            </div>
            {showChangePasswordDialog && <ChangePasswordDialog
                onClose={() => setShowChangePasswordDialog(false)}
            />}
        </div>
    );
};

export default UserProfilePage;