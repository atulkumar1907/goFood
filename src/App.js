
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
// import '../node_modules/bootstrap/dist/css/bootstrap.bundle.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import Signup from './screens/Signup.js';



function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/createuser" element={<Signup/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
