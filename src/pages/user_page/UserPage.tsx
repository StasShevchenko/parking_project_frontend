import {useParams} from "react-router-dom";

const UserPage = () => {
    const {id} = useParams()

    return (
        <div>
            {id}
        </div>
    );
};

export default UserPage;