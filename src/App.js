
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
// import '../node_modules/bootstrap/dist/css/bootstrap.bundle.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import Signup from './screens/Signup.js';
import { CartProvider } from './components/contextReducer.js';
import Cart from './screens/Cart.js';
import MyOrder from './screens/MyOrder.js';



function App() {
  return (
    <CartProvider>
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/createuser" element={<Signup/>}/>
        <Route exact path="/myorderData" element={<MyOrder/>}/>
        {/* <Route exact path="/cart" element={<Cart/>}/> */}
        
      </Routes>
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
