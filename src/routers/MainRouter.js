import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import Register from '../components/Register';
import Login  from '../components/Login';
import Home from '../components/Home';
import Characters from '../components/Characters';
import Chat from '../components/Chat';
import NewCharacter from '../components/NewCharacter';
import OwnCharacters from '../components/OwnCharacters';
import Details from '../components/Details';
import Favorites from '../components/Favorites';


const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/login" element = {<PublicRoute><Login/></PublicRoute>}/>
                <Route path = "/register" element = {<PublicRoute><Register/></PublicRoute>}/>

                <Route path="/" element = {<PrivateRoute><Home/></PrivateRoute>}>
                    <Route index element = {<PrivateRoute><Characters/></PrivateRoute>}/>
                    <Route path="chat" element = {<PrivateRoute><Chat/></PrivateRoute>}/>
                    <Route path="new" element = {<PrivateRoute><NewCharacter/></PrivateRoute>}/>
                    <Route path="own" element = {<PrivateRoute><OwnCharacters/></PrivateRoute>}/>
                    <Route path="details" element = {<PrivateRoute><Details/></PrivateRoute>}/>
                    <Route path="favorites" element = {<PrivateRoute><Favorites/></PrivateRoute>}/>
                </Route> 
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;