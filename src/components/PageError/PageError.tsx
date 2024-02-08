import {Alert, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export interface PageErrorProps {
    errorMessage: string
    onErrorAction: 'reload' | 'navigateBack'
}

const PageError = ({errorMessage, onErrorAction}: PageErrorProps) => {
    const navigate = useNavigate()

    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Alert
                variant="outlined"
                severity="error"
                action={
                    <Button
                        onClick={() => {
                            if (onErrorAction === "reload") {
                                window.location.reload()
                            } else{
                                navigate(-1)
                            }
                        }}
                        style={{background: "inherit"}}
                        color="inherit"
                        size="small"
                    >
                        {onErrorAction === "reload" ? "Обновить страницу" : "Назад"}
                    </Button>
                }
            >
                {errorMessage}
            </Alert>
        </div>
    );
};

export default PageError;