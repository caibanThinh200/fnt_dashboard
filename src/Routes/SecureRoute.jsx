import { Outlet, useNavigate, useLocation } from 'react-router';
import Container from "../Pages/Container";

// const MenuBar = (component: React.ReactElement) => <Navigation>
//     {component}
// </Navigation>
const SecureRoute = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const routerProps = {
        navigate,
        location
    }

    return <Container {...routerProps}>
        <Outlet context={routerProps}/>
    </Container>
}

export default SecureRoute;