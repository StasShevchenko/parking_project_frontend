import styles from './SwapItem.module.css'
import {SwapResponseDto} from "../../../../data/dto/swapResponse.dto.ts";
import dayjs from "dayjs";
import {Card, IconButton} from "@mui/material";
import {CheckCircle, DoDisturbAltSharp} from "@mui/icons-material";

export interface SwapItemProps{
    swapInfo: SwapResponseDto
    showSender?: boolean
    showReceiver?: boolean
}
const SwapItem = ({swapInfo, showReceiver = true, showSender = true}: SwapItemProps) => {
    const dateFormatString = 'DD.MM.YYYY'
    let indicatorColorClass = ''
    if (!swapInfo.isActive) {
        if (swapInfo.result) {
            indicatorColorClass = styles.indicatorPositive
        } else{
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
                {swapInfo.isActive && <div className={styles.buttons}>
                <IconButton sx={{color: 'lightgreen'}}>
                    <CheckCircle color="inherit"/>
                </IconButton>
                    <IconButton sx={{color: '#e02424'}}>
                        <DoDisturbAltSharp color="inherit"/>
                    </IconButton>
                </div>}
            </Card>
    );
};

export default SwapItem;