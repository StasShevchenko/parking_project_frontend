import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import styles from './AlertDialog.module.css'

export interface AlertDialogProps{
    onClose: () => void,
    children: React.ReactNode,
    title: string
}
const AlertDialog = ({onClose, children, title}: AlertDialogProps) => {
    return (
        <Dialog
            open={true}
            onMouseDown={(event) => {
                event.stopPropagation()
            }}
            onClose={(event) => {
                (event as MouseEvent).stopPropagation()
                onClose()
            }}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    padding: "10px"
                }
            }}
        >
            <DialogTitle className={styles.title}>{title}</DialogTitle>
            <DialogContent className={styles.content}>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default AlertDialog;