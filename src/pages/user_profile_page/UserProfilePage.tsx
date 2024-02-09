import styles from './UserProfilePage.module.css'
import {useUser} from "../../hooks/useUser.ts";
import UserAvatar from "../../components/UserAvatar/UserAvatar.tsx";
import {getUserRolesString} from "../../data/dto/userInfo.dto.ts";
import LoadingButton from "../../components/LoadingButton/LoadingButton.tsx";
import {Button} from "@mui/material";

const UserProfilePage = () => {
    const user = useUser()

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
                <LoadingButton loading={false}>
                    Сменить пароль
                </LoadingButton>
                <Button>
                    Выйти
                </Button>
            </div>
        </div>
    );
};

export default UserProfilePage;