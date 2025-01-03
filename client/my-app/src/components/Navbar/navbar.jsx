import { useContext, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { Contextstore } from "../../context/contextStore";
import { assest } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
export function Navbar({action,display}) {
  const navigation=useNavigate();
  const{count,token,setToken}=useContext(Contextstore);
  const[isVisible,setVisible]=useState(false)
    const[active,setActive]=useState("home");

    function handleMenu(data){
    setActive(data)
    }
    function handleClick(){
      action(true);
      display("active");
    }

    function logout(){
      setToken('');
      localStorage.removeItem("token");
      setVisible(false);
    }

    function handleOrder(){  localStorage.removeItem("token");
      setVisible(false);
      navigation("/myorder");
    }
  return (
    <div className="navbar" >
      <header className="d-flex justify-content-between w-100 p-2 align-items-center ">
       <Link to="/" className="text-decoration-none">  <div className=" text-warning fw-bold fst-italic header-title">Foodie</div></Link>

          <ul className="d-flex list-unstyled justify-content-between   align-items-center  text-light">
            <Link to="/" onClick={()=>{handleMenu("home")}} className={`${active=="home"?"active":"inActive"}`}>Home</Link>
            <a href="#menu"  onClick={()=>{handleMenu("menu")}} className={`${active=="menu"?"active":"inActive"}`}>Menu</a>
            <a href="#appDownload" onClick={()=>{handleMenu("mobile-app")}}className={`${active=="mobile-app"?"active":"inActive"}`}>Mobile-app</a>
            <a href="#foot" onClick={()=>{handleMenu("contact-us")}}className={`${active=="contact-us"?"active":"inActive"}`}>Contact-us</a>
          </ul>
      
        <div className="d-flex justify-content-between gap-3 text-light nav-right">
          <span className="bi bi-search fs-2"></span>
          <Link to="/cart"><span className="bi bi-basket cartItem fs-2"><span className="cartCount text-warning fw-bold">{count}</span></span>
          </Link>
          {
            !token?<button className="btn btn-warning rounded-3 fs-4 sign" onClick={handleClick}>sign in</button>
            :<img src={assest.profile} onClick={()=>setVisible(prev => !prev)}></img>

          }
          <ul className={`logout  ${isVisible?"show":"hide"}`}>
            <li onClick={handleOrder}>
            <i class="bi bi-bag-heart"></i>
            <p>Order</p>
            </li>
            <li onClick={logout}>
            <i class="bi bi-door-closed-fill"></i>
            <p>Logout</p>
            </li>
          </ul>
        </div>
      </header>
      
    </div>
  );
}
