import styles from './SwapInfoLabel.module.css'
import {CheckCircle} from "@mui/icons-material";
import {ButtonBase} from "@mui/material";
import {useState} from "react";
import AlertDialog from "../../../../../../components/AlertDialog/AlertDialog.tsx";
import dayjs from "dayjs";
import {SwapDto} from "../../../../../../data/dto/swap.dto.ts";

export interface SwapInfoLabelProps {
    swapInfo: SwapDto
    isOnPrimary?: boolean
}

const SwapInfoLabel = ({swapInfo, isOnPrimary}: SwapInfoLabelProps) => {
    const dateFormatString = 'DD.MM.YYYY'
    const [showSwapInfoDialog, setShowSwapInfoDialog] = useState(false)
    return (
        <ButtonBase
            style={{borderRadius: 20}}
            onClick={(event) => {
                event.stopPropagation()
                setShowSwapInfoDialog(true)
            }}
            onMouseDown={(event) => {
                event.stopPropagation()
            }}
        >
            <div className={styles.swapLabelWrapper + ' ' + (isOnPrimary ? styles.swapLabelOnPrimary : '')}>
                <CheckCircle/>
                Обмен
            </div>

            {showSwapInfoDialog &&
                <AlertDialog onClose={() => setShowSwapInfoDialog(false)} title="Информация об обмене">
                    <div className={styles.swapInfoContent}>
                        <div>
                            {`${swapInfo.senderFullName} 
                        (${dayjs(swapInfo.from).format(dateFormatString)})`}
                        </div>
                        <div>
                            {'обменялся с'}
                        </div>
                        <div>
                            {`${swapInfo.receiverFullName} (${dayjs(swapInfo.to).format(dateFormatString)})
                            `}
                        </div>
                    </div>
                </AlertDialog>
            }

        </ButtonBase>
    );
};

export default SwapInfoLabel;