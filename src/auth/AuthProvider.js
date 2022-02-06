import { createContext, useEffect, useState } from "react";
import {auth} from "../firebase/firebase"

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(auth.User | null);

    const [loadingAuthState, setLoadingAuthState] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoadingAuthState(false);
        })
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                loggedIn: user != null,
                setUser,
                loadingAuthState
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};