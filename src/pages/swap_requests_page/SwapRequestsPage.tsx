import styles from './SwapRequestsPage.module.css'
import PageStateWrapper from "../../components/PageStateWrapper/PageStateWrapper.tsx";
import {useUser} from "../../hooks/useUser.ts";
import {useApi} from "../../hooks/useApi.ts";
import {SwapApi} from "../../data/swap.api.ts";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import PageLoader from '../../components/PageLoader/PageLoader.tsx';
import SwapItem from "./components/SwapItem/SwapItem.tsx";

const SwapRequestsPage = () => {
    const currentUser = useUser()
    const swapApi = useApi(SwapApi)
    const swapRequests = useQuery({
        queryFn: () => swapApi.getSwapRequestsByUserId(currentUser.id),
        queryKey: [SwapApi.getSwapRequestsKey, currentUser.id]
    })

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
                    <div className={styles.swapsList}>
                        {swapRequests.isPending && <PageLoader/>}
                        {!swapRequests.isPending &&
                            swapRequests.data!.map(
                                (swap) => <SwapItem swapInfo={swap}/>
                            )}
                    </div>
                </div>
            </div>
        </PageStateWrapper>
    );
};

export default SwapRequestsPage;