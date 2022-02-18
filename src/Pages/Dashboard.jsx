import { useOutletContext } from "react-router-dom";
import Wrapper from "../Component/Wrapper"

const Dashboard = props => {
    const routePropsContext = useOutletContext();
    
    return <Wrapper>
        Dashboard
    </Wrapper>
}

export default Dashboard;