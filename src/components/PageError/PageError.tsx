import {Alert} from "@mui/material";

export interface PageErrorProps{
    errorMessage: string
}
const PageError = ({errorMessage}:PageErrorProps) => {
    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
        <Alert severity="error">{errorMessage}</Alert>
        </div>
    );
};

export default PageError;