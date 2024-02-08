import styles from './Root.module.css'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import NavMenu from "../../components/NavMenu/NavMenu.tsx";
import {useState} from "react";
import {getDestinations} from "./destinations.tsx";
import {useUser} from "../../hooks/useUser.ts";

const Root = () => {
    const navigate = useNavigate()

    const destinations = getDestinations(useUser())
    const location = useLocation()
    const [selectedIndex, setSelectedIndex] = useState(
        destinations.findIndex((value) => value.path === location.pathname)
    )

    const goToDestination = (index: number) => {
        navigate(destinations[index].path)
        setSelectedIndex(index)
    }

    return (
        <div className={styles.rootWrapper}>
            <NavMenu
                destinations={destinations}
                selectedIndex={selectedIndex}
                onItemSelect={(index) => goToDestination(index)}/>
            <main className={styles.content}>
                <Outlet/>
            </main>
        </div>
    );
};

export default Root;