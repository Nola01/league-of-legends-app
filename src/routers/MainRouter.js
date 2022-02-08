import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import Login  from '../components/Login';
import Home from '../components/Home';
import Register from '../components/Register';


const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/login" element = {<PublicRoute><Login/></PublicRoute>}/>
                <Route path="/" element = {<PrivateRoute><Home/></PrivateRoute>}> 
                    
                </Route>
                <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;