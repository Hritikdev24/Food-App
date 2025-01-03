import { useContext, useEffect, useState } from "react";
import "./foodCard.css";
import { Contextstore } from "../../context/contextStore";
export function FoodCard({ list }) {
 
   const{itemCart,removeFromCart,addToCart,url}=useContext(Contextstore);
   useEffect(()=>{
console.log(itemCart);
   },[])
  return (
    <div className="foodCard">
      <div className="card-container">
        <div className="menuCard">
          <img src={ `${url}/images/`+list.image} alt={list.name} />
          <i className="bi bi-emoji-heart-eyes rate"></i>
          <div className="itemCount">
            {!itemCart[list._id]? (
              <i
                className="bi bi-plus-lg addingEffect"
                onClick={() => addToCart(list._id)}
              ></i>
            ) : (
              <div className="d-flex justify-content-around trackCount">
                <i
                  className="bi bi-dash addingEffect"
                  onClick={()=>removeFromCart(list._id)}
                ></i>

                {itemCart[list._id]}
                <i
                  className="bi bi-plus-lg addingEffect"
                  onClick={() =>addToCart(list._id)}
                ></i>
              </div>
            )}
          </div>
          <div className="menuCardBody">
            <div className="menuName">{list.name}</div>
            <div className="foodRating">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill">
                <i className="bi bi-star-fill"></i>
              </i>
              <i className="bi bi-star-half"></i>
            </div>
            <div className="menuDescription">{list.description}</div>
            <div className="menuPrice">
              price:{" "}
              <span className="menuAmount">
                {list.price.toLocaleString("en-in", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
