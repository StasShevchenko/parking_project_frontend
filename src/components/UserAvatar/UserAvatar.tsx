import styles from './UserAvatar.module.css'
import {AccountCircleSharp} from "@mui/icons-material";

export interface UserAvatarProps {
    avatarPath: string
}
const UserAvatar = ({avatarPath}: UserAvatarProps) => {
    return (
        <div className={styles.avatarWrapper}>
            {avatarPath ?
                <img src={`https://back.parking-project.ru/static/${avatarPath}`}/> :
                <AccountCircleSharp className={styles.avatar}/>}
        </div>
    );
};

export default UserAvatar;