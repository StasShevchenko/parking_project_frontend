import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {UserApi} from "../../data/user.api.ts";
import {useApi} from "../../hooks/useApi.ts";
import PageStateWrapper from "../../components/PageStateWrapper/PageStateWrapper.tsx";
import {useEffect, useState} from "react";
import styles from './UserPage.module.css'
import UserAvatar from "../../components/UserAvatar/UserAvatar.tsx";
import {getUserRolesString} from "../../data/dto/userInfo.dto.ts";
import LoadingButton from "../../components/LoadingButton/LoadingButton.tsx";

const UserPage = () => {
    const {id} = useParams()
    const userApi = useApi(UserApi)
    const user = useQuery({
        queryFn: () => userApi.getUserById({userId: parseInt(id!)}),
        queryKey: [UserApi.getUserByIdKey, id!]
    })

    const [isFirstLoad, setIsFirstLoad] = useState(true)
    useEffect(() => {
        if (user.data) {
            setIsFirstLoad(false);
        }
    }, [user.data])

    return (
        <PageStateWrapper isLoading={isFirstLoad}>
            <div className={styles.pageWrapper}>
                <div className={styles.userDataWrapper}>
                    <div className={styles.userTitle}>Информация о сотруднике</div>
                    <div className={styles.userNameSection}>
                        <UserAvatar avatarPath={user.data?.avatar}/>
                        {user.data?.firstName + " " + user.data?.secondName}
                    </div>
                    <div>
                        {`Почта: ${user.data?.email}`}
                    </div>
                    <div style={{textAlign: 'center'}}>
                        {`Роли: ${getUserRolesString(user.data!)}`}
                    </div>
                    <div className={styles.buttonsSection}>
                        <LoadingButton loading={false}>
                            Удалить сотрудника
                        </LoadingButton>
                        {user.data?.queueUser && !user.data.isSuperAdmin &&
                            <LoadingButton loading={false}>
                                {user.data?.isAdmin ? 'Убрать' : 'Добавить'} роль администратора
                            </LoadingButton>
                        }
                    </div>
                </div>
            </div>
        </PageStateWrapper>
    );
};

export default UserPage;