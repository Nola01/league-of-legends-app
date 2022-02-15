import { createContext, useEffect, useState } from "react";
import {auth} from "../firebase/firebase"

export const FavContext = createContext();

export const FavProvider = ({children}) => {
    const [favCharacters, setfavcharacters] = useState([]);

    useEffect(() => {
        
    }, []);




    return (
        <FavContext.Provider
            value={{
                favCharacters,
                setfavcharacters
            }}
        >
            {children}
        </FavContext.Provider>
    );
}
