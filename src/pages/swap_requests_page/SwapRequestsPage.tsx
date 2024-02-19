import styles from './SwapRequestsPage.module.css'
import PageStateWrapper from "../../components/PageStateWrapper/PageStateWrapper.tsx";
import {useUser} from "../../hooks/useUser.ts";
import {useApi} from "../../hooks/useApi.ts";
import {SwapApi} from "../../data/swap.api.ts";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import PageLoader from '../../components/PageLoader/PageLoader.tsx';
import SwapItem from "./components/SwapItem/SwapItem.tsx";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

const SwapRequestsPage = () => {
    const [toggleValue, setToggleValue] = useState('incoming')
    const currentUser = useUser()
    const swapApi = useApi(SwapApi)
    const swapRequests = useQuery({
        queryFn: () => swapApi.getSwapRequestsByUserId(currentUser.id),
        queryKey: [SwapApi.getSwapRequestsKey, currentUser.id]
    })

    const incomingRequests = swapRequests.data?.filter((item) => item.sender.id !== currentUser.id)
    const outgoingRequests = swapRequests.data?.filter((item) => item.sender.id === currentUser.id)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    useEffect(() => {
        if (swapRequests.data) {
            setIsFirstLoad(false);
        }
    }, [swapRequests.data])

    return (
        <PageStateWrapper isLoading={isFirstLoad}>
            <div className={styles.pageWrapper}>
                <div className="title">Запросы на обмен</div>
                <div className={styles.content}>
                    <ToggleButtonGroup
                        sx={{
                            height: '30px !important',

                        }}
                        className={styles.toggle}
                        color="primary"
                        value={toggleValue}
                        exclusive
                        onChange={(_, value) => {
                            if (value) {
                                setToggleValue(value)
                            }
                        }}
                    >
                        <ToggleButton
                            sx={{
                                fontSize: '12px !important',
                                borderTopLeftRadius: '20px !important',
                                borderBottomLeftRadius: '20px !important',
                                '&.Mui-selected': {
                                    background: 'var(--primary-blue) !important',
                                    color: 'var(--primary-white) !important'
                                }
                            }}
                            value='incoming'
                        >
                            Входящие
                        </ToggleButton>
                        <ToggleButton
                            sx={{
                                fontSize: '12px !important',
                                borderTopRightRadius: '20px !important',
                                borderBottomRightRadius: '20px !important',
                                '&.Mui-selected': {
                                    background: 'var(--primary-blue) !important',
                                    color: 'var(--primary-white) !important'
                                }
                            }}
                            value='outgoing'
                        >
                            Исходящие
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <div className={styles.content}>
                        <div className={styles.swapsList}>
                            {swapRequests.isPending && <PageLoader/>}
                            {!swapRequests.isPending &&
                                toggleValue === 'incoming' &&
                                incomingRequests!.length === 0 &&
                                <div className="empty-message">Запросы не найдены :(</div>
                            }
                            {!swapRequests.isPending &&
                                toggleValue === 'incoming' &&
                                incomingRequests!.map(
                                    (swap) => <SwapItem showReceiver={false} swapInfo={swap}/>
                                )}

                            {!swapRequests.isPending &&
                                toggleValue === 'outgoing' &&
                                outgoingRequests!.length === 0 &&
                                <div className="empty-message">Запросы не найдены :(</div>
                            }
                            {!swapRequests.isPending &&
                                toggleValue === 'outgoing' &&
                                outgoingRequests!.map(
                                    (swap) => <SwapItem showSender={false} swapInfo={swap}/>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </PageStateWrapper>
    );
};

export default SwapRequestsPage;