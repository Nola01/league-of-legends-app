
import './App.css';
import {AuthProvider} from "./auth/AuthProvider";
import MainRouter from "./routers/MainRouter";

function App() {
  return (
    <AuthProvider>
      <MainRouter/>
    </AuthProvider>
  );
}

export default App;
