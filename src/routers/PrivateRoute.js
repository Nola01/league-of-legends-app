import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import LoadingPage from '../components/Loading';



export const PrivateRoute = ({ children }) => {

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
