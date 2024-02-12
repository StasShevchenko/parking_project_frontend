import {useUser} from "../../../../hooks/useUser.ts";
import {useApi} from "../../../../hooks/useApi.ts";
import {QueueApi} from "../../../../data/queue.api.ts";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import styles from './QueueSection.module.css'
import IconTextField from "../../../../components/IconInput/IconTextField.tsx";
import {Search} from "@mui/icons-material";
import QueuePeriod from "./components/QueuePeriod/QueuePeriod.tsx";
import PageLoader from "../../../../components/PageLoader/PageLoader.tsx";

const QueueSection = () => {
    const [fullName, setFullName] = useState('')

    const currentUser = useUser()
    const queueApi = useApi(QueueApi)
    const queue = useQuery({
        queryFn: () => queueApi.getQueue({fullName: fullName, isAdmin: currentUser.isAdmin}),
        queryKey: [QueueApi.getQueueKey, fullName]
    })

    return (
        <div className={styles.queueSectionWrapper}>
            <div className={styles.searchField}>
                <IconTextField
                    label="Поиск"
                    startIcon={<Search/>}
                    onChange={(value) => setFullName(value)}
                    debounceTime={500}
                />
            </div>
            <div className={styles.periodsList}>
                {queue.isPending && <PageLoader/>}
                {!queue.isPending && queue.data?.[0].length === 0 && <div className="empty-message">Пользователи не найдены :(</div>}
                {!queue.isPending && queue.data?.map((queueCycle) =>
                queueCycle.map(
                    (period) =>
                        <div className={styles.period}><QueuePeriod
                            key={period.startTime}
                            date={period.startTime}
                            users={period.nextUsers}
                        /></div>
                )
            )}
            </div>
        </div>
    );
};

export default QueueSection;