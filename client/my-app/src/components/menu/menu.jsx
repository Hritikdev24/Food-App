import "./menu.css";
import { menuData } from "../../assets/assets";
import { MenuCart } from "../../pages/home/home";
import { useContext, useState } from "react";
export function Menu() {
    const {isMenu,setMenu}=useContext(MenuCart)
 
    function handleMenu(item){
        setMenu((prev)=>(prev===item?"all":item))
      
        console.log(isMenu)
    }
  return (
    <div className="menu" id="menu">
      <h1 className="menu-title">Explore Meal's</h1>
      <div className="border menu-container p-4 ">
        {menuData.map((item, idx) => (
          <div onClick={()=>{handleMenu(item.item)}} key={idx}>
            <img className={`${ isMenu===item.item ? "active":"nonActive"}`} src={item.src} alt=""  />
            <div className="text-center mt-2 fw-bold text-capitalize fs-4">{item.item}</div>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
}
