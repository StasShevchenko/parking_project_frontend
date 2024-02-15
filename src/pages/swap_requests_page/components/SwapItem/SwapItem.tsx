import styles from './SwapItem.module.css'
import {SwapResponseDto} from "../../../../data/dto/swapResponse.dto.ts";
import dayjs from "dayjs";
import {Alert, Card, CircularProgress, IconButton} from "@mui/material";
import {CheckCircle, DoDisturbAltSharp} from "@mui/icons-material";
import {useState} from "react";
import ConfirmDialog from "../../../../components/ConfirmDialog/ConfirmDialog.tsx";
import {useUser} from "../../../../hooks/useUser.ts";
import {useApi} from "../../../../hooks/useApi.ts";
import {SwapApi} from "../../../../data/swap.api.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export interface SwapItemProps {
    swapInfo: SwapResponseDto
    showSender?: boolean
    showReceiver?: boolean
}

const SwapItem = ({swapInfo, showReceiver = true, showSender = true}: SwapItemProps) => {

    const [processSwapError, setProcessSwapError] = useState(false)
    const [showAcceptSwapDialog, setShowAcceptSwapDialog] = useState(false)
    const [showDeclineSwapDialog, setShowDeclineSwapDialog] = useState(false)
    const currentUser = useUser()
    const swapApi = useApi(SwapApi)
    const queryClient = useQueryClient()

    const processSwapMutation = useMutation({
        mutationFn: ({accept}: { accept: boolean }) => swapApi.processSwapRequest({
                userId: currentUser.id,
                swapId: swapInfo.id,
                accept: accept
            }
        ),
        onError: () => {
            setProcessSwapError(true)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: [SwapApi.getSwapRequestsKey]})
    })

    const dateFormatString = 'DD.MM.YYYY'
    let indicatorColorClass = ''
    if (!swapInfo.isActive) {
        if (swapInfo.result) {
            indicatorColorClass = styles.indicatorPositive
        } else {
            indicatorColorClass = styles.indicatorNegative
        }
    }

    return (
        <Card className={styles.itemWrapper}>
            <div className={styles.indicator + ' ' + indicatorColorClass}/>
            {showSender && <div className={styles.textBlock}>
                {`Отправитель: ${swapInfo.sender.fullName}`}
            </div>}
            {showReceiver && <div className={styles.textBlock}>
                {`Получатель: ${swapInfo.receiver.fullName}`}
            </div>}
            <div className={styles.textBlock}>
                {`Отправлено: ${dayjs.utc(swapInfo.sent).format('DD.MM.YYYY HH:mm')}`}
            </div>
            <div className={styles.textBlock}>
                {`Обмен: с ${dayjs(swapInfo.swapInfo.from).format(dateFormatString)}
                 (${swapInfo.sender.fullName}) на ${dayjs(swapInfo.swapInfo.to).format(dateFormatString)} (${swapInfo.receiver.fullName})`}
            </div>
            {!swapInfo.isActive && swapInfo.result && <div className={styles.status}>
                Подтверждено
            </div>}
            {!swapInfo.isActive && !swapInfo.result && <div className={styles.status}>
                Отклонено
            </div>}
            {swapInfo.isActive && swapInfo.receiver.id === currentUser.id && <div className={styles.buttons}>
                <IconButton
                    disabled={processSwapMutation.isPending}
                    onClick={() => {
                        setShowAcceptSwapDialog(true)
                        setProcessSwapError(false)
                    }} sx={{color: 'lightgreen'}}>
                    <CheckCircle color="inherit"/>
                </IconButton>
                <IconButton
                    disabled={processSwapMutation.isPending}
                    onClick={() => {
                        setShowDeclineSwapDialog(true)
                        setProcessSwapError(false)
                    }} sx={{color: '#e02424'}}>
                    <DoDisturbAltSharp color="inherit"/>
                </IconButton>
                {processSwapMutation.isPending &&
                    <CircularProgress className={styles.loader}/>
                }
                {processSwapError &&
                    <Alert severity="error" onClose={() => setProcessSwapError(false)}>Ошибка при отправке
                        ответа!</Alert>
                }
            </div>
            }
            {showAcceptSwapDialog &&
                <ConfirmDialog text="Принять запрос на обмен?" onConfirm={() => {
                    setShowAcceptSwapDialog(false)
                    processSwapMutation.mutate({accept: true})
                }} onClose={() => setShowAcceptSwapDialog(false)}/>
            }
            {showDeclineSwapDialog &&
                <ConfirmDialog text="Отклонить запрос на обмен?" onConfirm={() => {
                    setShowDeclineSwapDialog(false)
                    processSwapMutation.mutate({accept: false})
                }} onClose={() => setShowDeclineSwapDialog(false)}/>
            }
        </Card>
    );
};

export default SwapItem;