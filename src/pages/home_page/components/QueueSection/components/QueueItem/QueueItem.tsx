import styles from './QueueItem.module.css'
import {Card, CardActionArea} from "@mui/material";
import UserAvatar from "../../../../../../components/UserAvatar/UserAvatar.tsx";
import {UserInPeriodDto} from "../../../../../../data/dto/userInPeriod.dto.ts";

export interface QueueItemProps{
    user: UserInPeriodDto
    onClick?: (userId: number) => void
}
const QueueItem = ({user, onClick}: QueueItemProps) => {
    return (
        <CardActionArea onClick={() => onClick?.(user.id)} style={{borderRadius: "var(--card-radius)"}}>
            <Card className={styles.card}>
                <div className={styles.cardContent}>
                    <div className={styles.nameSection}>
                        <UserAvatar avatarPath={user.avatar}/>
                        {`${user.firstName} ${user.secondName}`}
                    </div>
                    <div className={styles.email}>{user.email}</div>
                </div>
            </Card>
        </CardActionArea>
    );
};

export default QueueItem;