import "./cart.css";
import { Contextstore } from "../../context/contextStore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export function Cart() {
    const navigation=useNavigate();
     const { itemCart, addToCart, removeFromCart, menuList, clear, calTotal ,url} =
    useContext(Contextstore);
  var count = 0;
  return (
    <div className="cart">
      <div className="cart-items">
        {Object.keys(itemCart).length > 0 ? (
          <div className="cart-item-title">
            <p>No</p>
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
        ) : (
          <></>
        )}

        <hr />
        {menuList.map((item, _idx) => {
          if (itemCart[item._id] > 0) {
            return (
              <div key={_idx}>
                <div className="cart-item-title">
                  <p>{(count = count + 1)}</p>
                  <img src={`${url}/images/`+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</p>
                  <p>{itemCart[item._id]}</p>
                  <p>{item.price * itemCart[item._id]}</p>
                  <p>
                    <span
                      className="bi bi-trash text-danger"
                      onClick={() =>clear(item._id)}
                    ></span>
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="card-total">
          <div className="hritikcart">
            <h1 className="mb-4 text-warning">Cart Total</h1>
            <div className="card-info">
              <p>FoodCharges</p>
              <p>{calTotal().toLocaleString("en-IN", { style: "currency", currency: "INR" })}</p>
            </div>
            <div className="card-info ">
              <p>Delivery Charges</p>
              <p>{Object.keys(itemCart).length > 0 ? ((50).toLocaleString("en-IN", { style: "currency", currency: "INR" })) : ((0).toLocaleString("en-IN", { style: "currency", currency: "INR" }))}</p>
            </div>
            <div className="card-info border-0 ">
              <p>Total</p>
              <p>{Object.keys(itemCart).length > 0 ? ((calTotal() + 50).toLocaleString("en-IN", { style: "currency", currency: "INR" })) : ((0).toLocaleString("en-IN", { style: "currency", currency: "INR" }))}</p>
            </div>
            <button className="btn btn-warning w-50 rounded-1 text-light  mt-2 fs-4" onClick={()=>navigation("/order")}>
              ChekOut
            </button>
          </div>
        </div>
        <div className="promo-code">
          <h1 className="text-warning mb-5">Promo Code</h1>
          <div className="input-group">
            <input
              type="text"
              className="  form-control border-danger p-3 rounded-0 w-75"
              placeholder="Enter Your Promo Code"
            />

            <button
              type="button"
              className="btn btn-danger ms-1 px-5   rounded-0 "
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
