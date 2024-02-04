import styles from './UsersListPage.module.css'
import IconTextField from "../../components/IconInput/IconTextField.tsx";
import {SearchRounded} from "@mui/icons-material";
import {useApi} from "../../hooks/useApi.ts";
import {UserApi} from "../../data/user.api.ts";
import {useEffect} from "react";

const UsersListPage = () => {

    const userApi = useApi(UserApi)

    useEffect(() => {
        userApi.getAllUsers(['admin', 'super_admin'])
    }, [])
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