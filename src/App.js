
import './App.css';
import {AuthProvider} from "./context/AuthProvider";
import MainRouter from "./routers/MainRouter";

function App() {
  return (
    <AuthProvider>
      <MainRouter/>
    </AuthProvider>
  );
}

export default App;
