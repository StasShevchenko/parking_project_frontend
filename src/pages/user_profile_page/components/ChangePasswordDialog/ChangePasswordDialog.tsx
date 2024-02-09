import AlertDialog from "../../../../components/AlertDialog/AlertDialog.tsx";
import styles from './ChangePasswordDialog.module.css'
import ObscuredInput from "../../../../components/ObscuredInput/ObscuredInput.tsx";
import {Lock} from "@mui/icons-material";
import LoadingButton from "../../../../components/LoadingButton/LoadingButton.tsx";
import {Button} from "@mui/material";

export interface ChangePasswordDialog {
    onClose: () => void
}

const ChangePasswordDialog = ({onClose}: ChangePasswordDialog) => {
    return (
        <AlertDialog onClose={() => onClose()} title="Смена пароля">
            <div className={styles.content}>
                <div className={styles.label}>
                    Введите старый пароль:
                </div>
                <ObscuredInput
                    startIcon={<Lock/>}
                    label="Старый пароль"
                />
                <div className={styles.label}>
                    Новый пароль (не менее 8 символов):
                </div>
                <ObscuredInput
                    startIcon={<Lock/>}
                    label="Новый пароль"
                />
                <ObscuredInput
                    startIcon={<Lock/>}
                    label="Подтверждение пароля"
                />
                <div className={styles.buttonsSection}>
                    <Button onClick={() => onClose()}>
                        Закрыть
                    </Button>
                    <LoadingButton loading={false}>
                        Сменить пароль
                    </LoadingButton>
                </div>
            </div>
        </AlertDialog>
    );
};

export default ChangePasswordDialog;