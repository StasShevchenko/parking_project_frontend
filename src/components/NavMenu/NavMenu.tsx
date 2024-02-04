import styles from './NavMenu.module.css'
import {ReactNode} from "react";

export interface NavMenuProps {
    children?: ReactNode[]
    labels?: string[]
    onItemSelect?: (index: number) => void,
    selectedIndex?: number
}

const NavMenu = ({children, labels, selectedIndex, onItemSelect}: NavMenuProps) => {
    return (
        <div className={styles.navMenuWrapper}>
            {children?.map((child, index) =>
                <div key={index} className={styles.navMenuItem} onClick={() => onItemSelect?.(index)}>
                    <div className={
                        styles.iconPill + " " +
                        (selectedIndex === index ? styles.selectedItem : '')}>
                        <div className={styles.iconPillSurface}/>
                        <div className={styles.iconWrapper}>{child}</div>
                    </div>
                    {labels?.[index]}
                </div>)
            }
        </div>
    );
};

export default NavMenu;