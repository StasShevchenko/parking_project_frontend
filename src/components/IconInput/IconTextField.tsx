import {InputAdornment, TextField} from "@mui/material";
import {HTMLInputTypeAttribute, useState} from "react";

export interface IconTextFieldProps {
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode,
    error?: boolean,
    helperText?: string,
    onChange?: (value: string) => void,
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void,
    label?: string,
    value?: string,
    type?: HTMLInputTypeAttribute
}

const IconTextField = ({
                           startIcon,
                           endIcon,
                           error,
                           helperText,
                           onChange,
                           label,
                           type,
                           value,
                           onKeyDown
                       }: IconTextFieldProps) => {

    const [shrink, setShrink] = useState(false);

    return (
        <TextField
            sx={{
                '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
                    transform: "translate(45px, 9px)"
                }
            }}
            value={value}
            onFocus={() => setShrink(true)}
            onBlur={(e) => {
                !e.target.value && setShrink(false);
            }}
            helperText={helperText}
            onChange={(event) => onChange?.(event.target.value)}
            error={error}
            onKeyDown={onKeyDown}
            label={label}
            type={type}
            InputProps={{
                startAdornment: (<InputAdornment position="start">
                    {startIcon}
                </InputAdornment>),
                endAdornment: (<InputAdornment position="end">
                    {endIcon}
                </InputAdornment>)
            }}
            InputLabelProps={{
                shrink: shrink,
            }}
        />
    );
};

export default IconTextField;