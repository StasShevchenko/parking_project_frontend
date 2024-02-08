import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import styles from './ConfirmDialog.module.css'
export interface ConfirmDialogProps {
    text: string,
    onConfirm: () => void,
    onClose: () => void
}

const ConfirmDialog = ({text, onConfirm, onClose}: ConfirmDialogProps) => {
    return (
        <Dialog
            open={true}
            onClose={() => onClose()}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    padding: "10px"
                }
            }}
        >
            <DialogTitle className={styles.title}>Подтверждение</DialogTitle>
            <DialogContent>
                <div className={styles.text}>
                    {text}
                </div>
                <div className={styles.buttonsSection}>
                    <Button onClick={() => onClose()}>
                        Закрыть
                    </Button>
                    <Button className={styles.attentionButton} onClick={() => onConfirm()}>
                        Подтвердить
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;