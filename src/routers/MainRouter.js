import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { PublicRoute } from "./PublicRoute";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/login" element = {<PublicRoute><Login/></PublicRoute>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;