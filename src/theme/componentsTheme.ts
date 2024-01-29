import {createTheme} from "@mui/material";

export const componentsTheme = createTheme({
    components: {
        MuiButton:{
            defaultProps:{
                disableElevation: true,
                variant: "contained"
            },
            styleOverrides: {
                root: {
                    borderRadius: "var(--form-item-border-radius)",
                    background: "var(--primary-blue)",
                    fontWeight: "bold"
                }
            }
        }
    }
})