import styles from './ChangeAvaterDialog.module.css'
import AlertDialog from "../../../../components/AlertDialog/AlertDialog.tsx";
import {Button} from '@mui/material';
import LoadingButton from "../../../../components/LoadingButton/LoadingButton.tsx";
import PageLoader from "../../../../components/PageLoader/PageLoader.tsx";
import {useApi} from "../../../../hooks/useApi.ts";
import {UserApi} from "../../../../data/user.api.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import UserAvatar from "../../../../components/UserAvatar/UserAvatar.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../../context/auth.context.ts";

export interface ChangeAvatarDialogProps {
    onClose: () => void
}

const ChangeAvatarDialog = ({onClose}: ChangeAvatarDialogProps) => {

    const {authState, setAuthState, updateUser} = useContext(AuthContext)

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [avatarsStrings, setAvatarsStrings] = useState<(string | undefined)[]>([])
    const userApi = useApi(UserApi)
    const avatars = useQuery({
        queryFn: () => userApi.getAvatars(),
        queryKey: [UserApi.getAvatarsKey]
    })

    useEffect(() => {
        if (avatars.data) {
            setAvatarsStrings([undefined, ...avatars.data!])
        }
    }, [avatars.data]);
    const userAvatarMutation = useMutation({
        mutationFn: ({avatarName}: { avatarName?: string }) => userApi.changeAvatar({avatarName}),
        onSuccess: async () => {
            setAuthState({
                ...authState,
                user: {
                    ...authState.user!,
                    avatar: avatarsStrings[selectedIndex]
                }
            })
            updateUser()
            onClose()
        }
    })

    return (
        <AlertDialog onClose={onClose} title="Выбор аватара">
            <div className={styles.contentWrapper}>
                <div className={styles.avatarsWrapper}>
                    {avatars.isPending ? <PageLoader/> :
                        <div className={styles.avatarsGrid}>
                            {avatarsStrings.map((avatar, index) =>
                                <UserAvatar
                                    key={index}
                                    onClick={() => setSelectedIndex(index)}
                                    className={styles.avatar + " "
                                        + (index === selectedIndex ? styles.avatarSelected : '')}
                                    avatarPath={avatar}
                                />
                            )}
                        </div>
                    }
                </div>
                <div className={styles.buttonsSection}>
                    <Button onClick={() => onClose()}>
                        Закрыть
                    </Button>
                    <LoadingButton
                        onClick={
                        () => userAvatarMutation.mutate({avatarName: avatarsStrings[selectedIndex]})
                    }
                        loading={avatars.isPending}>
                        Подтвердить
                    </LoadingButton>
                </div>
            </div>
        </AlertDialog>
    );
};

export default ChangeAvatarDialog;