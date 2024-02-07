import styles from './Fab.module.css'
import {Fab as MuiFab} from "@mui/material";
import {cloneWithClasses} from "../../utils/cloneWithClasses.ts";

export interface MyFabProps {
    children?: React.ReactNode,
    isVisible?: boolean,
    onClick?: () => void
}

const Fab = ({children, isVisible = true, onClick}: MyFabProps) => {
    const icon = cloneWithClasses(children,
        [(isVisible ? styles.icon : styles.iconHidder)])
    return (
        <div onClick={() => onClick?.()} className={styles.fabContainer}>
            <MuiFab
                className={isVisible ? styles.fab : styles.fabHidden}
                color="primary">{isVisible && icon}
            </MuiFab>
        </div>
    );
};

export default Fab;