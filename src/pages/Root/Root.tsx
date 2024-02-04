import styles from './Root.module.css'
import {Outlet, useNavigate} from "react-router-dom";
import NavMenu from "../../components/NavMenu/NavMenu.tsx";
import {Home, People, Person} from '@mui/icons-material'
import {useState} from "react";

const Root = () => {
    const navigate = useNavigate()

    const[selectedIndex, setSelectedIndex] = useState(0)

    const goToDestination = (index: number) => {
        if (index === 1) {
            navigate('/users_list')
        }
        setSelectedIndex(index)
    }

    return (
        <div className={styles.rootWrapper}>
            <NavMenu
                labels={['Очередь', 'Сотрудники', 'Профиль']}
                selectedIndex={selectedIndex}
                onItemSelect={(index) => goToDestination(index)}
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