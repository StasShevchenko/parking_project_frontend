import styles from './Root.module.css'
import {Outlet} from "react-router-dom";
const Root = () => {
    return (
        <div className={styles.rootWrapper}>
            Root!
            <Outlet/>
        </div>
    );
};

export default Root;