import styles from './PageSwitcher.module.css'

export interface PageSwitcherProps{
    index: number
    onTabClicked: (index: number) => void
}
const PageSwitcher = ({index, onTabClicked}:PageSwitcherProps) => {

    return (
        <div className={styles.switcher}>
            <div
                onClick={() => onTabClicked(0)}
                className={styles.switcherChild + " " + (index === 0 ? styles.selectedSwitcherChild : '')}>
                Календарь
            </div>
            <div
                onClick={() => onTabClicked(1)}
                className={styles.switcherChild + " " + (index === 1 ? styles.selectedSwitcherChild : '')}>
                Очередь
            </div>
        </div>
    );
};

export default PageSwitcher;