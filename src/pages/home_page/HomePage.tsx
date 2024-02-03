import {AuthContext} from "../../context/auth.context.ts";
import {useContext} from "react";

const HomePage = () => {

    const user = useContext(AuthContext).authState.user
    console.log(user)

    return (
        <div>
            This is home page!
        </div>
    );
};

export default HomePage;