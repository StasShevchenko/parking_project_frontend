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
import AddUserMenu from "./components/AddUserMenu/AddUserMenu.tsx";
import {useNavigate} from "react-router-dom";

const UsersListPage = () => {
    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState('')
    const [rolesArray, setRolesArray] = useState<Role[]>([])
    const [scrollTop, setScrollTop] = useState(0)
    const [showFab, setShowFab] = useState(true)
    const [showAddUserDialog, setShowAddUserDialog] = useState(false)
    const handleGridScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTopValue = e.currentTarget.scrollTop
        if (scrollTopValue < 100) {
            setShowFab(true)
        } else if (scrollTopValue < scrollTop) {
            setShowFab(true)
        } else {
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
        enabled: !showAddUserDialog,
        queryKey: [UserApi.getAllUsersKey, searchValue, rolesArray],
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
            isLoading={isFirstLoad}
            isError={users.isError}
            errorMessage={"При загрузке данных что-то пошло не так!"}
            onErrorAction={"reload"}
        >
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
                                (<UserItem
                                    user={value}
                                    key={value.id}
                                    onClick={(userId) => navigate(`/users_list/${userId}`)}
                                />)
                            )}
                        </div>)
                }
                <Fab
                    isVisible={showFab}
                    onClick={() => setShowAddUserDialog(true)}
                >
                    <Add color="inherit"/>
                </Fab>
                {showAddUserDialog && <AddUserMenu
                    onClose={() => setShowAddUserDialog(false)}
                />}
            </div>
        </PageStateWrapper>
    );
};

export default UsersListPage;