import {CircularProgress} from "@mui/material";

const PageLoader = () => {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "var(--primary-blue)"
        }}>
            <CircularProgress color="inherit"/>
        </div>
    );
};

export default PageLoader;