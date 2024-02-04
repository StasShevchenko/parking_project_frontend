import styles from './Root.module.css'
import {Outlet} from "react-router-dom";
import NavMenu from "../../components/NavMenu/NavMenu.tsx";
import {Home, People, Person} from '@mui/icons-material'
import {useState} from "react";

const Root = () => {
    const[selectedIndex, setSelectedIndex] = useState(0)
    return (
        <div className={styles.rootWrapper}>
            <NavMenu
                labels={['Очередь', 'Сотрудники', 'Профиль']}
                selectedIndex={selectedIndex}
                onItemSelect={(index) => setSelectedIndex(index)}
            >
                <Home/>
                <People/>
                <Person/>
            </NavMenu>
            <main className={styles.content}>
                <Outlet/>
            </main>
        </div>
    );
};

export default Root;