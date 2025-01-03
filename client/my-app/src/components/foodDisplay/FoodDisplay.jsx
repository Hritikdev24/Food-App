import { useContext, useEffect } from "react";
import "./foodDisplay.css";
import { Contextstore } from "../../context/contextStore";
import { MenuCart } from "../../pages/home/home";
import { FoodCard } from "../foodCard/foodCard";
export function FoodDisplay() {
  const { menuList } = useContext(Contextstore);
  const { isMenu, setMenu } = useContext(MenuCart);
  useEffect(() => {
  console.log(isMenu)
  },[]);
  return (
    <div className="foodDisplay">
      <h2 className="foodDisplayTitle">Taste the World,at Home.</h2>
        <div className="food-display-list">
            {
                menuList.map((item,idx)=>{
                   if(isMenu=="all" || isMenu==`${item.category}`){
                   return <FoodCard key={idx} list={item}/>
                   }
})
            }
        </div>
    </div>
  );
}
