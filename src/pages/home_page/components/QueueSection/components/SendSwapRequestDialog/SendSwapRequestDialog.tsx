import styles from './SendSwapRequestDialog.module.css'
import AlertDialog from "../../../../../../components/AlertDialog/AlertDialog.tsx";
import {UserInPeriodDto} from "../../../../../../data/dto/userInPeriod.dto.ts";
import dayjs from "dayjs";
import {UserInfoDto} from "../../../../../../data/dto/userInfo.dto.ts";
import {Button} from '@mui/material';
import LoadingButton from "../../../../../../components/LoadingButton/LoadingButton.tsx";

export interface SendSwapRequestDialogProps {
    sender: UserInfoDto
    receiver: UserInPeriodDto
    swapDate: string
    onClose: () => void
}

const SendSwapRequestDialog = ({onClose, sender, receiver, swapDate}: SendSwapRequestDialogProps) => {
    return (
        <AlertDialog onClose={onClose} title="Запрос на обмен">
            <div className={styles.swapRequestWrapper}>
                Вы действительно хотите обменяться своей очередью ({dayjs(sender.startActiveTime).format('DD.MM.YYYY')})
                {` c ${receiver.firstName} ${receiver.secondName}`} ({dayjs(swapDate).format('DD.MM.YYYY')})?
                <div className={styles.buttonsSection}>
                    <Button
                        onMouseDown={(event) =>event.stopPropagation()}
                        onClick={(event) => {
                            event.stopPropagation()
                            onClose()
                        }}>
                        Закрыть
                    </Button>
                    <LoadingButton loading={false}>
                        Подтвердить
                    </LoadingButton>
                </div>
            </div>
        </AlertDialog>
    );
};

export default SendSwapRequestDialog;