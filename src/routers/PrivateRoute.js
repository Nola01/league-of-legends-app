import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import LoadingPage from '../components/Loading';



const PrivateRoute = ({ children }) => {

    const { loggedIn, loadingAuthState } = useContext(AuthContext);
    
    if (loadingAuthState) {
        return (
            <LoadingPage></LoadingPage>
        )
    }

    return loggedIn
        ? children
        : <Navigate to="/login" />

}

export default PrivateRoute;