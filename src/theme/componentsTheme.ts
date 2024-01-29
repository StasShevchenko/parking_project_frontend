import {createTheme, outlinedInputClasses} from "@mui/material";

export const componentsTheme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                variant: "contained"
            },
            styleOverrides: {
                root: {
                    borderRadius: "var(--form-item-border-radius)",
                    background: "var(--primary-blue)",
                    fontWeight: "bold"
                },
            }
        },
        MuiTextField: {
            defaultProps: {
                size: "small"
            },
        },
        MuiInputLabel: {
            styleOverrides:{
                root: {
                    color: "var(--secondary-blue)",
                    [`&.Mui-focused`]:{
                        color: "var(--secondary-blue)"
                    },
                },
            }
        },
        MuiOutlinedInput: {
            defaultProps: {
                size: "small"
            },
            styleOverrides: {
                input: {
                    color: "var(--primary-blue)"
                },
                notchedOutline: {
                    borderColor: "var(--primary-blue)",
                    color: "var(--primary-blue)",
                },
                root: {
                    borderRadius: "var(--form-item-border-radius)",
                    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'var(--primary-blue)',
                    },
                    [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'var(--primary-blue)',
                    },
                    [`&.Mui-error .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'var(--primary-accent-red)',
                        color: "green"
                    },
                },
            }
        },

    }
})