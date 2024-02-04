import styles from './UsersListPage.module.css'
import IconTextField from "../../components/IconInput/IconTextField.tsx";
import {SearchRounded} from "@mui/icons-material";
import {useApi} from "../../hooks/useApi.ts";
import {UserApi} from "../../data/user.api.ts";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import UserItem from "./components/UserItem/UserItem.tsx";

const UsersListPage = () => {

    const [searchValue, setSearchValue] = useState('')

    const userApi = useApi(UserApi)
    const users = useQuery({
        queryKey: [],
        queryFn: () => userApi.getAllUsers({fullName: searchValue})
    })

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.optionsSection}>
                <IconTextField
                    startIcon={<SearchRounded/>}
                    label="Поиск"
                    onChange={(value) => setSearchValue(value)}
                />
            </div>
            <div className={styles.itemsGrid}>
                {users.data?.map(value =>
                     (<UserItem user={value}/>)
                )}
            </div>
        </div>
    );
};

export default UsersListPage;