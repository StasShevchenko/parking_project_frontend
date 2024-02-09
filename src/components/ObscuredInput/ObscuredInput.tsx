import IconTextField from "../IconInput/IconTextField.tsx";
import {useState} from "react";
import {IconButton} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export interface ObscuredInputProps{
    error?: boolean
    helperText?: string
    label?: string
    value?: string
    startIcon?: React.ReactNode
}
const ObscuredInput = ({error, helperText, label, value, startIcon}:ObscuredInputProps) => {
    const [show, setShow] = useState(false)

    return (
        <IconTextField
            error={error}
            helperText={helperText}
            label={label}
            value={value}
            startIcon={startIcon}
            type={show ? "text" : "password"}
            endIcon={
                <IconButton
                    onClick={() => setShow(!show)}
                >
                    {show ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
            }
        />
    );
};

export default ObscuredInput;