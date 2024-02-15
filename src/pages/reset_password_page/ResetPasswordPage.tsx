import styles from './ResetPasswordPage.module.css'
import CarImage from "../../assets/images/car_image.svg?react"
import IconTextField from "../../components/IconInput/IconTextField.tsx";
import {Email} from "@mui/icons-material";
import LoadingButton from "../../components/LoadingButton/LoadingButton.tsx";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const ResetPasswordPage = () => {
    const navigate = useNavigate()

    return (
            <div className={styles.resetPasswordPageWrapper}>
                <div className={styles.imageWrapper}>
                    <CarImage className={styles.carImage}/>
                </div>
                <div className={styles.formWrapper}>
                    <form className={styles.form}>
                    <h1 className={styles.title}>Восстановление пароля</h1>
                        <div className={styles.hint}>Введите почту для сброса пароля</div>
                        <IconTextField
                            startIcon={<Email/>}
                            label="Введите почту"
                        />
                        <LoadingButton loading={false}>
                            Подтвердить
                        </LoadingButton>
                        <Button onClick={() => navigate(-1)}>
                            Назад
                        </Button>
                    </form>
                </div>
            </div>
    );
};

export default ResetPasswordPage;