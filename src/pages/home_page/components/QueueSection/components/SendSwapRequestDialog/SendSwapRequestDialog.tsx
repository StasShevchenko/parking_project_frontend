import styles from './SendSwapRequestDialog.module.css'
import AlertDialog from "../../../../../../components/AlertDialog/AlertDialog.tsx";
import {UserInPeriodDto} from "../../../../../../data/dto/userInPeriod.dto.ts";
import dayjs from "dayjs";
import {UserInfoDto} from "../../../../../../data/dto/userInfo.dto.ts";
import {Alert, Button} from '@mui/material';
import LoadingButton from "../../../../../../components/LoadingButton/LoadingButton.tsx";
import {useApi} from "../../../../../../hooks/useApi.ts";
import {SwapApi} from "../../../../../../data/swap.api.ts";
import {useMutation} from "@tanstack/react-query";
import {SendSwapRequestDto} from "../../../../../../data/dto/sendSwapRequest.dto.ts";
import {useState} from "react";

export interface SendSwapRequestDialogProps {
    sender: UserInfoDto
    receiver: UserInPeriodDto
    swapDate: string
    onClose: () => void
}

const SendSwapRequestDialog = ({onClose, sender, receiver, swapDate}: SendSwapRequestDialogProps) => {
    const swapApi = useApi(SwapApi)

    const sendSwapMutation = useMutation({
        mutationFn: ({dto}: { dto: SendSwapRequestDto }) => swapApi.sendSwapRequest(dto),
        onSuccess: () => {
            setIsSendingError(false)
            setIsRequestSent(true)
        },
        onError: () => {
            setIsSendingError(true)
            setIsRequestSent(false)
        }
    })

    const [isRequestSent, setIsRequestSent] = useState(false)
    const [isSendingError, setIsSendingError] = useState(false)

    return (
        <AlertDialog onClose={onClose} title="Запрос на обмен">
            <div className={styles.swapRequestWrapper}>
                Вы действительно хотите обменяться своей очередью ({dayjs(sender.startActiveTime).format('DD.MM.YYYY')})
                {` c ${receiver.firstName} ${receiver.secondName}`} ({dayjs(swapDate).format('DD.MM.YYYY')})?
                <div className={styles.buttonsSection}>
                    <Button
                        onMouseDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                            event.stopPropagation()
                            onClose()
                        }}>
                        Закрыть
                    </Button>
                    <LoadingButton
                        onMouseDown={(event) => {
                            event.stopPropagation()
                        }}
                        onClick={(event) => {
                            event.stopPropagation()
                            sendSwapMutation.mutate({
                                dto: {
                                    senderId: sender.id,
                                    receiverId: receiver.id
                                }
                            })
                        }}
                        loading={sendSwapMutation.isPending}>
                        Подтвердить
                    </LoadingButton>
                </div>
                {isRequestSent && <Alert
                    severity="success"
                    onClose={(event) => {
                        event.stopPropagation()
                        setIsRequestSent(false)
                    }}>
                    Запрос успешно отправлен!
                </Alert>}
                {isSendingError &&
                    <Alert
                        severity="error"
                        onClose={(event) => {
                            event.stopPropagation()
                            setIsSendingError(false)
                        }}>При отправке запроса произошла ошибка!
                    </Alert>}
            </div>
        </AlertDialog>
    );
};

export default SendSwapRequestDialog;