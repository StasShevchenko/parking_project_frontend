import {Button, Checkbox, Dialog, DialogContent, DialogTitle} from "@mui/material";
import React from "react";
import styles from './AddUserMenu.module.css'
import IconTextField from "../../../../components/IconInput/IconTextField.tsx";
import {Email, People} from "@mui/icons-material";

export interface AddUserMenuProps {
    show: boolean,
    onClose: () => void
}

const AddUserMenu = ({show, onClose}: AddUserMenuProps) => {
    return (
        <div className={styles.dialog}>
            <Dialog
                open={show}
                onClose={() => onClose()}
                PaperProps={{ sx: {
                    borderRadius: "20px",
                    padding: "10px"
                } }}
            >
                <DialogTitle className={styles.title}>Регистрация пользователя</DialogTitle>
                <DialogContent>
                    <div className={styles.form}>
                        <IconTextField label="Введите почту" startIcon={<Email/>}/>
                        <IconTextField label="Введите имя" startIcon={<People/>}/>
                        <IconTextField label="Введите фамилию" startIcon={<People/>}/>
                        <div className={styles.label}>Роли нового пользователя:</div>
                        <div className={styles.checkBoxContainer}>
                            <Checkbox
                                className={styles.checkBox}
                                sx={{
                                    '&.Mui-checked': {
                                        color: "var(--primary-blue)",
                                    },
                                }}
                            />
                            Администратор
                        </div>
                        <div className={styles.checkBoxContainer}>
                            <Checkbox
                                className={styles.checkBox}
                                defaultChecked
                                sx={{
                                    '&.Mui-checked': {
                                        color: "var(--primary-blue)",
                                    },
                                }}
                            />
                            Пользователь очереди
                        </div>
                        <div className={styles.buttonsSection}>
                            <Button onClick={() => onClose()}>
                                Закрыть
                            </Button>
                            <Button style={{flex: 1}}>
                                Зарегистрировать пользователя
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddUserMenu;