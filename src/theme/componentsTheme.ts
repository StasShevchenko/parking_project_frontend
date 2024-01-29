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
                    fontWeight: "bold",
                    textTransform: "none"
                },
            }
        },
        MuiTextField: {
            defaultProps: {
                size: "small",
            },
        },
        MuiInputLabel: {
            defaultProps:{
            },
            styleOverrides:{
                root: {
                    color: "var(--secondary-blue)",
                    [`&.Mui-focused`]:{
                        color: "var(--secondary-blue)",
                    },
                },
            }
        },
        MuiOutlinedInput: {
            defaultProps: {
                size: "small",

            },
            styleOverrides: {
                input: {
                    color: "var(--primary-blue)"
                },
                notchedOutline: {
                    borderColor: "var(--secondary-blue)",
                    color: "var(--primary-blue)",
                    borderWidth: "2px"
                },
                root: {
                    [`& input::-ms-reveal`]: {display: "none"},
                    [`& input::-ms-clear`]: {display: "none"},
                    borderRadius: "var(--form-item-border-radius)",
                    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'var(--secondary-blue)',
                    },
                    [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'var(--secondary-blue)',
                    },
                    [`&.Mui-error .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'var(--primary-accent-red)',
                    },
                    [`& .MuiInputAdornment-root`]:{
                        color: `var(--primary-blue)`
                    },
                    [`& .MuiSvgIcon-root`]:{
                        color: `var(--primary-blue)`
                    },
                    [`& .Mui-error .MuiSvgIcon-root`]:{
                        color: `var(--primary-accent-red)`
                    },
                },
            }
        },

    }
})