import styles from './ChangeAvaterDialog.module.css'
import AlertDialog from "../../../../components/AlertDialog/AlertDialog.tsx";
import { Button } from '@mui/material';
import LoadingButton from "../../../../components/LoadingButton/LoadingButton.tsx";
import PageLoader from "../../../../components/PageLoader/PageLoader.tsx";
import {useApi} from "../../../../hooks/useApi.ts";
import {UserApi} from "../../../../data/user.api.ts";
import {useQuery} from "@tanstack/react-query";
import UserAvatar from "../../../../components/UserAvatar/UserAvatar.tsx";

export interface ChangeAvatarDialogProps{
    onClose: () => void
}
const ChangeAvatarDialog = ({onClose}: ChangeAvatarDialogProps) => {

    const userApi = useApi(UserApi)
    const avatars = useQuery({
        queryFn: () => userApi.getAvatars(),
        queryKey: [UserApi.getAvatarsKey]
    })

    return (
        <AlertDialog onClose={onClose} title="Выбор аватара">
            <div className={styles.contentWrapper}>
                <div className={styles.avatarsWrapper}>
                    {avatars.isPending ? <PageLoader/> :
                        <div className={styles.avatarsGrid}>
                            {[undefined, ...avatars.data!].map(avatar =>
                                <UserAvatar avatarPath={avatar}/>
                            )}
                        </div>
                    }
                </div>
                <div className={styles.buttonsSection}>
                    <Button onClick={() => onClose()}>
                        Закрыть
                    </Button>
                    <LoadingButton loading={false}>
                        Подтвердить
                    </LoadingButton>
                </div>
            </div>
        </AlertDialog>
    );
};

export default ChangeAvatarDialog;