import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserApi} from "../../data/user.api.ts";
import {useApi} from "../../hooks/useApi.ts";
import PageStateWrapper from "../../components/PageStateWrapper/PageStateWrapper.tsx";
import {useState} from "react";
import styles from './UserPage.module.css'
import UserAvatar from "../../components/UserAvatar/UserAvatar.tsx";
import {getUserRolesString} from "../../data/dto/userInfo.dto.ts";
import LoadingButton from "../../components/LoadingButton/LoadingButton.tsx";
import {Alert, IconButton} from "@mui/material";
import {ArrowBackIos} from "@mui/icons-material";
import {useUser} from "../../hooks/useUser.ts";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog.tsx";
import {getErrorCode} from "../../utils/getErrorCode.ts";

const UserPage = () => {
    const navigate = useNavigate()
    const client = useQueryClient()
    const {id} = useParams()
    const userApi = useApi(UserApi)
    const user = useQuery({
            queryFn: () => userApi.getUserById({userId: parseInt(id!)}),
            queryKey: [UserApi.getUserByIdKey, id!],
        }
    )
    const editor = useUser()
    const roleMutation = useMutation({
        mutationFn: ({userId, isAdmin}: { userId: number, isAdmin: boolean }) => userApi.toggleAdminRole({
                userId: userId,
                isAdmin: isAdmin
            }
        ),
        onSuccess: async () => {
            client.invalidateQueries({queryKey: [UserApi.getUserByIdKey]})
            client.invalidateQueries({queryKey: [UserApi.getAllUsersKey]})
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ({userId, isAdmin}: { userId: number, isAdmin: boolean }) => userApi.deleteUser({
            userId: userId,
            isAdmin: isAdmin
        }),
        onSuccess: () => {
            navigate(-1)
            client.invalidateQueries({queryKey: [UserApi.getAllUsersKey]})
        }
    })

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    return (
        <PageStateWrapper
            isLoading={user.isFetching}
            isError={!!user.error}
            onErrorAction={getErrorCode(user.error) === 400 ?  "navigateBack" : "reload"}
            errorMessage={getErrorCode(user.error) === 400 ? 'Пользователь не найден!'
                : 'При загрузке данных что-то пошло не так!'}
        >
            <div className={styles.pageWrapper}>
                <div className={styles.userTitle}>
                    <IconButton onClick={() => navigate(-1)} className={styles.backButton}>
                        <ArrowBackIos/>
                    </IconButton>Сотрудник
                </div>
                <div className={styles.userDataWrapper}>
                    <div className={styles.userNameSection}>
                        <UserAvatar avatarPath={user.data?.avatar}/>
                        {user.data?.firstName + " " + user.data?.secondName}
                    </div>
                    <div>
                        {`Почта: ${user.data?.email}`}
                    </div>
                    <div className={styles.rolesSection}>
                        {`Роли: ${getUserRolesString(user.data!)}`}
                    </div>
                    <div className={styles.buttonsSection}>
                        {((!user.data?.isSuperAdmin && !user.data?.isAdmin) ||
                                (editor.isSuperAdmin && !user.data?.isSuperAdmin)) &&
                            <LoadingButton loading={deleteMutation.isPending} onClick={() => setShowDeleteDialog(true)}>
                                Удалить сотрудника
                            </LoadingButton>}
                        {user.data?.queueUser && !user.data.isSuperAdmin &&
                            <LoadingButton
                                onClick={() => roleMutation.mutate(
                                    {userId: user.data!.id, isAdmin: user.data!.isAdmin}
                                )}
                                loading={roleMutation.isPending}>
                                {user.data?.isAdmin ? 'Убрать' : 'Добавить'} роль администратора
                            </LoadingButton>
                        }
                        {roleMutation.error &&
                            <Alert variant={"outlined"} severity={"error"}>При отправке данных что-то пошло не так!</Alert>
                        }
                        {deleteMutation.error &&
                            <Alert variant={"outlined"} severity={"error"}>При удалении пользователя что-то пошло не так!</Alert>
                        }
                    </div>

                </div>
                {showDeleteDialog && <ConfirmDialog
                    text="Вы действительно хотите удалить пользователя?"
                    onConfirm={() => {
                        deleteMutation.mutate(
                            {
                                userId: user.data!.id,
                                isAdmin: user.data!.isAdmin
                            })
                        setShowDeleteDialog(false)
                    }}
                    onClose={() => {
                        setShowDeleteDialog(false)
                    }}
                />}

            </div>
        </PageStateWrapper>
    );
};

export default UserPage;