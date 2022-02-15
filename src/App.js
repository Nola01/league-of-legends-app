
import './App.css';
import {AuthProvider} from "./context/AuthProvider";
import { FavProvider } from './context/FavProvider';
import MainRouter from "./routers/MainRouter";

function App() {
  return (
    <AuthProvider>
      <FavProvider>
        <MainRouter/>
      </FavProvider>
    </AuthProvider>
  );
}

export default App;
