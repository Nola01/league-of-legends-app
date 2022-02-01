import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider"

const PublicRoute = ({children}) => {
    const {loggedIn} = useContext(AuthContext);

    return loggedIn ? <Navigate to="/"/> : children
}

export default PublicRoute;