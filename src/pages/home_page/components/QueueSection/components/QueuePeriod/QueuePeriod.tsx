import {UserInPeriodDto} from '../../../../../../data/dto/userInPeriod.dto';
import styles from './QueuePeriod.module.css'
import dayjs from "dayjs";
import QueueItem from "../QueueItem/QueueItem.tsx";
import {useNavigate} from "react-router-dom";

export interface QueuePeriodProps {
    date: string,
    users: UserInPeriodDto[],
    indexCycle: number
}

const QueuePeriod = ({date, users, indexCycle}: QueuePeriodProps) => {
    const navigate = useNavigate()

    const dateFormatted = dayjs(date).format('MMMM YYYY')
    return (
        <div className={styles.queuePeriod}>
            <div
                className={styles.dateLabel + " " +
                (dayjs(date).month() === dayjs().month()
                    && dayjs(date).year() === dayjs().year()
                    ? styles.dateLabelActive : '')}>
                {dateFormatted}
            </div>
            <div className={styles.queueUsers}>
                {users.map(user => <QueueItem
                    key={`${user.email} ${date}`}
                    startDate={date}
                    indexCycle={indexCycle}
                    user={user}
                    onClick={(userId) => navigate(`/users_list/${userId}`)}
                />)}
            </div>
        </div>
    );
};

export default QueuePeriod;