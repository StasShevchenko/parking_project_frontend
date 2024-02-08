import styles from './NavMenu.module.css'
import {Destination} from "../../pages/root_page/destinations.tsx";

export interface NavMenuProps {
    destinations: Destination[]
    onItemSelect?: (index: number) => void,
    selectedIndex?: number
}

const NavMenu = ({selectedIndex, onItemSelect, destinations}: NavMenuProps) => {
    return (
        <div className={styles.navMenuWrapper}>
            {destinations?.map((item, index) =>
                <div key={item.path} className={styles.navMenuItem} onClick={() => onItemSelect?.(index)}>
                    <div className={
                        styles.iconPill + " " +
                        (selectedIndex === index ? styles.selectedItem : '')}>
                        <div className={styles.iconPillSurface}/>
                        <div className={styles.iconWrapper}>{item.icon}</div>
                    </div>
                    {item.label}
                </div>)
            }
        </div>
    );
};

export default NavMenu;