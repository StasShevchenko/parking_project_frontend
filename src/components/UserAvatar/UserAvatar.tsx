import styles from './UserAvatar.module.css'
import {AccountCircleSharp} from "@mui/icons-material";

export interface UserAvatarProps {
    onClick?: () => void
    avatarPath?: string
    className?: string
    negative?:boolean
}
const UserAvatar = ({avatarPath, className, onClick, negative}: UserAvatarProps) => {
    return (
        <div onClick={() => onClick?.()} className={styles.avatarWrapper + " " + (className ?? '')}>
            {avatarPath ?
                <img src={`${import.meta.env.VITE_BASE_URL}/static/${avatarPath}`}/> :
                <AccountCircleSharp className={styles.avatar + " " + (negative ? styles.avatarNegative : '')}/>}
        </div>
    );
};

export default UserAvatar;