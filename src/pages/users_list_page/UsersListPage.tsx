import styles from './UsersListPage.module.css'
import IconTextField from "../../components/IconInput/IconTextField.tsx";
import {Add, SearchRounded} from "@mui/icons-material";
import {useApi} from "../../hooks/useApi.ts";
import {UserApi} from "../../data/user.api.ts";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import UserItem from "./components/UserItem/UserItem.tsx";
import PageStateWrapper from "../../components/PageStateWrapper/PageStateWrapper.tsx";
import PageLoader from "../../components/PageLoader/PageLoader.tsx";
import {Chip} from "@mui/material";
import {Role} from "../../context/auth.context.ts";
import Fab from "../../components/Fab/Fab.tsx";

const UsersListPage = () => {

    const [searchValue, setSearchValue] = useState('')
    const [rolesArray, setRolesArray] = useState<Role[]>([])
    const [scrollTop, setScrollTop] = useState(0)
    const [showFab, setShowFab] = useState(true)
    const handleGridScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTopValue = e.currentTarget.scrollTop
        if (scrollTopValue < 100) {
            setShowFab(true)
        } else if (scrollTopValue < scrollTop) {
            setShowFab(true)
        } else{
            setShowFab(false)
        }
        setScrollTop(scrollTopValue)
    }
    const toggleRole = (role: Role) => {
        if (rolesArray.includes(role)) {
            setRolesArray(rolesArray.filter((roleItem) => roleItem !== role))
        } else {
            setRolesArray([...rolesArray, role])
        }
    }

    const userApi = useApi(UserApi)
    const users = useQuery({
        queryKey: [userApi.getAllUsersKey, searchValue, rolesArray],
        queryFn: () => userApi.getAllUsers({fullName: searchValue, roles: rolesArray})
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
                    <Chip
                        className={(rolesArray.includes('user') ? styles.chipToggled : styles.chip)}
                        label="Пользователи очереди"
                        onClick={() => toggleRole('user')}
                    />
                    <Chip
                        className={(rolesArray.includes('admin') ? styles.chipToggled : styles.chip)}
                        label="Администраторы"
                        onClick={() => toggleRole('admin')}
                    />
                    <Chip
                        className={(rolesArray.includes('super_admin') ? styles.chipToggled : styles.chip)}
                        label="Старшие администраторы"
                        onClick={() => toggleRole('super_admin')}
                    />
                </div>
                {users.isFetching ? <PageLoader/> :
                    !users.data?.length ? <div className="empty-message">Пользователи не найдены :(</div> :
                    (<div className={styles.itemsGrid} onScroll={handleGridScroll}>
                        {users.data?.map(value =>
                            (<UserItem user={value} key={value.id}/>)
                        )}
                    </div>)
                }
                <Fab
                    isVisible={showFab}
                >
                    <Add color="inherit"/>
                </Fab>
            </div>
        </PageStateWrapper>
    );
};

export default UsersListPage;