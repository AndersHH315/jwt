import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
        <div>
          <Home />
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
