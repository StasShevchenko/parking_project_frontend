import styles from './HomePage.module.css'
import PageStateWrapper from "../../components/PageStateWrapper/PageStateWrapper.tsx";
import PageSwitcher from "./components/PageSwitcher/PageSwitcher.tsx";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useEffect, useState} from "react";
import CalendarSection from "./components/CalendarSection/CalendarSection.tsx";
import {UserApi} from "../../data/user.api.ts";
import {useApi} from "../../hooks/useApi.ts";
import {useQuery} from "@tanstack/react-query";
import {useUser} from "../../hooks/useUser.ts";
import QueueSection from "./components/QueueSection/QueueSection.tsx";

const HomePage = () => {

    const currentUser = useUser()
    const [tabIndex, setTabIndex] = useState(0)
    const isTablet = useMediaQuery('(max-width: 880px)')

    const userApi = useApi(UserApi)
    const user = useQuery({
        queryFn: () => userApi.getUserById({userId: currentUser.id}),
        queryKey: [UserApi.getUserByIdKey, currentUser.id]
    })

    const [isFirstLoad, setIsFirstLoad] = useState(true)
    useEffect(() => {
        if (user.data) {
            if (!user.data.queueUser) {
                setTabIndex(1)
            }
            setIsFirstLoad(false);
        }
    }, [user.data])

    return (
        <PageStateWrapper isLoading={isFirstLoad}>
            <div className={styles.pageWrapper}>
                {isTablet ? (
                        <>
                            {user.data?.queueUser && <PageSwitcher
                                index={tabIndex}
                                onTabClicked={(index) => setTabIndex(index)}
                            />}
                            <div className={styles.pageContent}>
                                {tabIndex === 0 ?
                                    <CalendarSection userInfo={user.data!}/> :
                                    <QueueSection/>
                                }
                            </div>
                        </>
                    ) :
                    <div className={styles.desktopPageContent}>
                        {user.data?.queueUser &&
                            <div className={styles.calendarSection}><CalendarSection userInfo={user.data!}/></div>
                        }
                        <div className={styles.queueSection}><QueueSection/></div>
                    </div>}
            </div>
        </PageStateWrapper>
    );
};

export default HomePage;