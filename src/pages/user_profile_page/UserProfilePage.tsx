import styles from './UserProfilePage.module.css'
import {useUser} from "../../hooks/useUser.ts";
import UserAvatar from "../../components/UserAvatar/UserAvatar.tsx";
import {getUserRolesString} from "../../data/dto/userInfo.dto.ts";
import {Button, ButtonBase} from "@mui/material";
import {useApi} from "../../hooks/useApi.ts";
import {AuthApi} from "../../data/auth.api.ts";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/auth.context.ts";
import ChangePasswordDialog from "./components/ChangePasswordDialog/ChangePasswordDialog.tsx";
import ChangeAvatarDialog from "./components/ChangeAvatarDialog/ChangeAvatarDialog.tsx";

const UserProfilePage = () => {
    const user = useUser()
    const authApi = useApi(AuthApi)
    const {authState, setAuthState} = useContext(AuthContext)!
    const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false)
    const [showChangeAvatarDialog, setShowChangeAvatarDialog] = useState(false)
    const logout = () => {
        authApi.logout()
        window.localStorage.removeItem('accessToken')
        setAuthState({
            ...authState,
            isAuthenticated: "false"
        })
    }
    return (
        <div className={styles.pageWrapper}>
            <div className="title">
                Личный кабинет
            </div>
            <div className={styles.userInfo}>
                <div className={styles.userNameSection}>
                    <ButtonBase onClick={() => setShowChangeAvatarDialog(true)} style={{borderRadius: "100%"}}>
                        <UserAvatar avatarPath={user.avatar}/>
                    </ButtonBase>
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
            {showChangeAvatarDialog &&
                <ChangeAvatarDialog
                    onClose={() => setShowChangeAvatarDialog(false)}/>
            }
        </div>
    );
};

export default UserProfilePage;