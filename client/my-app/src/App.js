import {Navbar} from "./components/Navbar/navbar"
import './App.css';
import{Routes,Route} from "react-router-dom";
import { Home } from "./pages/home/home";
import { Cart } from "./pages/cart/cart";
import { Placeorder } from "./pages/placeorder/placeOrder";
import { Footer } from "./components/footer/footer";
import { Login } from "./components/login/logn";
import { ContextStore } from "./context/contextStore";
import { useState } from "react";
import { Myorder } from "./pages/orders/myorder";
import{ToastContainer} from "react-toastify"
function App() {
  const[isLogin,setLogin]=useState(false);
  const[isShow,slideShow]=useState("");
  return (
      <ContextStore>
        <ToastContainer/>
        <>
    {
      isLogin?<Login   action={setLogin} display={isShow} />:<></>
    }
    <div className="App">
     <Navbar action={setLogin}  display={slideShow}/>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/order" element={<Placeorder/>}></Route>
      <Route path="/myorder" element={<Myorder/>}></Route>
     </Routes>
    </div>
    <Footer/>
  </>
      </ContextStore>
  );
}

export default App;
