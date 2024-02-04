import {UserInfoDto} from "../../../../data/dto/userInfo.dto.ts";
import {Card, CardActionArea} from "@mui/material";
import styles from './UserItem.module.css'
import UserAvatar from "../../../../components/UserAvatar/UserAvatar.tsx";

export interface UserItemProps {
    user: UserInfoDto
    onClick: (userId: number) => void
}

const UserItem = ({user, onClick}: UserItemProps) => {
    return (
        <CardActionArea onClick={() => onClick(user.id)} style={{borderRadius: "var(--card-radius)"}}>
            <Card className={styles.card}>
                <div className={styles.cardContent}>
                    <div className={styles.nameSection}>
                        <UserAvatar avatarPath={user.avatar}/>
                        {`${user.firstName} ${user.secondName}`}
                    </div>
                    {user.isAdmin && !user.isSuperAdmin &&
                        (<div className={styles.roleText}>Администратор</div>)}
                    {user.isSuperAdmin && (<div className={styles.roleText}>Старший администратор</div>)}
                    <div className={styles.email}>{user.email}</div>
                </div>
            </Card>
        </CardActionArea>
    );
};

export default UserItem;