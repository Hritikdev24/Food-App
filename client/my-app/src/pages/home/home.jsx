
import { createContext, useState } from "react";
import "./home.css";
import { Hero } from "../../components/hero/hero"; 
import { Menu } from "../../components/menu/menu";
import { FoodDisplay } from "../../components/foodDisplay/FoodDisplay";
import { AppDownload } from "../../components/appDownload/appDownload";
export const MenuCart=createContext(null);
export function Home(){
    const[isMenu,setMenu]=useState("all");
    return(
    
         <div className="home">
          <MenuCart.Provider value={{isMenu,setMenu}}>
          <Hero/>
          <Menu/>
          <FoodDisplay/>
          <hr />
        <AppDownload/>
          </MenuCart.Provider>
        </div>
     
    )
}