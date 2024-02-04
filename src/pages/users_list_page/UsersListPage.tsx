import styles from './UsersListPage.module.css'
import IconTextField from "../../components/IconInput/IconTextField.tsx";
import {SearchRounded} from "@mui/icons-material";

const UsersListPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <IconTextField
                startIcon={<SearchRounded/>}
                label="Поиск"
            />

        </div>
    );
};

export default UsersListPage;