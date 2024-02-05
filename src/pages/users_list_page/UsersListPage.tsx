import styles from './UsersListPage.module.css'
import IconTextField from "../../components/IconInput/IconTextField.tsx";
import {SearchRounded} from "@mui/icons-material";
import {useApi} from "../../hooks/useApi.ts";
import {UserApi} from "../../data/user.api.ts";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import UserItem from "./components/UserItem/UserItem.tsx";
import PageStateWrapper from "../../components/PageStateWrapper/PageStateWrapper.tsx";

const UsersListPage = () => {

    const [searchValue, setSearchValue] = useState('')

    const userApi = useApi(UserApi)
    const users = useQuery({
        queryKey: [userApi.getAllUsersKey, searchValue],
        queryFn: () => userApi.getAllUsers({fullName: searchValue})
    })

    const [isFirstLoad, setIsFirstLoad] = useState(true)
    useEffect(() => {
        if (users.data) {
            setIsFirstLoad(false);
        }
    }, [users.data])

    return (
            <PageStateWrapper
                isLoading={isFirstLoad}>
                <div className={styles.pageWrapper}>
                    <div className={styles.optionsSection}>
                        <IconTextField
                            startIcon={<SearchRounded/>}
                            label="Поиск"
                            debounceTime={500}
                            onChange={(value) => {
                                setSearchValue(value)
                            }}
                        />
                    </div>
                    <div className={styles.itemsGrid}>
                        {users.data?.map(value =>
                            (<UserItem user={value} key={value.id}/>)
                        )}
                    </div>
                </div>
            </PageStateWrapper>
    );
};

export default UsersListPage;