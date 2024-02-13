import styles from './QueueItem.module.css'
import {Card, CardActionArea, IconButton} from "@mui/material";
import UserAvatar from "../../../../../../components/UserAvatar/UserAvatar.tsx";
import {UserInPeriodDto} from "../../../../../../data/dto/userInPeriod.dto.ts";
import {useQuery} from "@tanstack/react-query";
import {UserApi} from "../../../../../../data/user.api.ts";
import {useApi} from "../../../../../../hooks/useApi.ts";
import {useUser} from "../../../../../../hooks/useUser.ts";
import {UserInfoDto} from "../../../../../../data/dto/userInfo.dto.ts";
import {SwapHoriz} from "@mui/icons-material";
import {useState} from "react";
import SendSwapRequestDialog from "../SendSwapRequestDialog/SendSwapRequestDialog.tsx";

export interface QueueItemProps {
    user: UserInPeriodDto
    onClick?: (userId: number) => void
    startDate: string
}

const QueueItem = ({user, onClick, startDate}: QueueItemProps) => {
    const [showSendSwapRequestDialog, setShowSendSwapRequestDialog] = useState(false)

    const me = useUser()
    const userApi = useApi(UserApi)
    const userInfo = useQuery({
        queryFn: () => userApi.getUserById({userId: me.id}),
        queryKey: [UserApi.getUserByIdKey, me.id]
    })
    const isSwapAvailable = (user: UserInPeriodDto, currentUser?: UserInfoDto) => {

        return !currentUser?.active &&
            !user.active &&
            !user.fromNextPeriod &&
            currentUser?.startActiveTime != startDate
    }

    return (
        <CardActionArea
            onClick={() => onClick?.(user.id)}
            style={{borderRadius: "var(--card-radius)"}}>
            <Card className={styles.card + " " +
                (user.fromNextPeriod ? styles.cardPale : '') +
                " " + (userInfo.data!.id === user.id && !user.fromNextPeriod ? styles.userCard : '')
            }>
                <div className={styles.cardContent}>
                    <div className={styles.nameSectionContainer}>
                        <div className={styles.nameSection}>
                            <UserAvatar avatarPath={user.avatar}/>
                            {`${user.firstName} ${user.secondName}`}
                        </div>
                        {isSwapAvailable(user, userInfo.data) &&
                            <IconButton
                                className={styles.swapButton}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    setShowSendSwapRequestDialog(true)
                                }}>
                                <SwapHoriz/>
                            </IconButton>
                        }
                    </div>
                    <div className={styles.email}>{user.email}</div>
                </div>
            </Card>
            {showSendSwapRequestDialog &&
                <SendSwapRequestDialog
                    swapDate={startDate}
                    sender={userInfo.data!}
                    receiver={user}
                    onClose={() => setShowSendSwapRequestDialog(false)}
                />
            }
        </CardActionArea>
    );
};

export default QueueItem;