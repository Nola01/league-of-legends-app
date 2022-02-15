import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider"

export const PublicRoute = ({children}) => {
    const {loggedIn} = useContext(AuthContext);

    return loggedIn ? <Navigate to="/"/> : children
}
