import {ButtonProps, Button, CircularProgress} from "@mui/material";

export interface LoadingButtonProps extends ButtonProps{
    loading: boolean
}
const LoadingButton = ({children, onClick, loading} : LoadingButtonProps) => {
    return (
        <Button
            onClick={onClick}
            disabled={loading}
            style={{
                gap: 10
            }}
        >
            {children}
            {loading && <CircularProgress size="1rem" color="inherit"/>}
        </Button>
    );
};

export default LoadingButton;