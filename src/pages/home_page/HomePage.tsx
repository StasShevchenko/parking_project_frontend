import styles from './HomePage.module.css'
import PageStateWrapper from "../../components/PageStateWrapper/PageStateWrapper.tsx";
import PageSwitcher from "./components/PageSwitcher/PageSwitcher.tsx";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useState} from "react";

const HomePage = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const isTablet = useMediaQuery('(max-width: 880px)')

    return (
        <PageStateWrapper isLoading={false}>
            <div className={styles.pageWrapper}>
                {isTablet ? (
                        <>
                            <PageSwitcher
                                index={tabIndex}
                                onTabClicked={(index) => setTabIndex(index)}
                            />
                            <div className={styles.pageContent}>
                                {tabIndex === 0 ?
                                    <div>0</div> :
                                    <div>1</div>
                                }
                            </div>
                        </>
                    ) :
                    <div className={styles.desktopPageContent}>

                    </div>}
            </div>
        </PageStateWrapper>
    );
};

export default HomePage;