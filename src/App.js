import './App.css';
import app from './firebase.init';
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

function App() {
  return (
    <div className="App">
      <form action="">
        <input type="email" name="" id="" />
        <input type="password" name="" id="" />
      </form>
    </div>
  );
}

export default App;
