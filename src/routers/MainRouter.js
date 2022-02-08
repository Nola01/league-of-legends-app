import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import Login  from '../components/Login';
import Home from '../components/Home';

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/login" element = {<PublicRoute><Login/></PublicRoute>}/>
                <Route path="/" element = {<PrivateRoute><Home/></PrivateRoute>}> 
                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;