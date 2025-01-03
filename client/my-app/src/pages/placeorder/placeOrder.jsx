import { useContext, useState, useEffect } from "react";
import "./placeOrder.css";
import { Contextstore } from "../../context/contextStore";
import { toast } from "react-toastify";
import axios from "axios";
import{useNavigate} from "react-router-dom"
export function Placeorder() {
  const navigation=useNavigate();
  const { calTotal, itemCart, token, menuList, url } = useContext(Contextstore);
  const [data, setData] = useState({});
  const [reloadTrigger, setReloadTrigger] = useState(false);

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSub(e) {
    e.preventDefault();
    let orderItems = [];

    menuList.forEach((item) => {
      if (itemCart[item._id] > 0) {
        let info = { ...item, quantity: itemCart[item._id] };
        orderItems.push(info);
      }
    });

    const orderdata = {
      address: data,
      items: orderItems,
      amount: calTotal() + 50,
    };

    try {
      // Step 1: Create order via backend
      const response = await axios.post(`${url}/order/payment`, orderdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { orderInfo } = response.data;
      const { order } = response.data;

      // Step 2: Initialize Razorpay payment
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Foodies",
        description: "Payment Method",
        order_id: order.id,
        handler: async (response) => {
          try {
            // Step 3: Verify payment
            const verifyResponse = await axios.post(
              `${url}/order/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                _id: orderInfo._id,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (verifyResponse.data.success) {
              toast.success("Payment successful and verified!");
              navigation("/myorder")
              setReloadTrigger(!reloadTrigger); 
            } else {
              toast.error("Payment verification failed!");
              setReloadTrigger(!reloadTrigger); 
            }
          } catch (err) {
            console.error("Verification Error:", err);
            toast.error("Error verifying payment. Please contact support.");
            setReloadTrigger(!reloadTrigger); 
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Order Creation Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
      setReloadTrigger(!reloadTrigger); // Trigger reload on error
    }
  }

  useEffect(() => {
    if(!token){
      navigation("/cart")
    }else if(calTotal()==0){
      navigation("/cart")
    }
    console.log("Reload triggered!");
  }, [reloadTrigger]); // Reload component when `reloadTrigger` changes

  return (
    <div className="placeOrder">
      <div className="place-left">
        <form>
          <h1 className="mb-3">Contact Info</h1>
          <div className="inputfield">
            <input
              type="text"
              name="state"
              placeholder="state"
              className="one"
              onChange={handleChange}
              value={data.state || ""}
            />
            <input
              type="text"
              name="city"
              placeholder="city"
              className="two"
              onChange={handleChange}
              value={data.city || ""}
            />
            <input
              type="text"
              name="pinCode"
              placeholder="Contact Number"
              className="three"
              onChange={handleChange}
              value={data.pinCode || ""}
            />
            <input
              type="text"
              name="street"
              placeholder="house address"
              className="four"
              onChange={handleChange}
              value={data.street || ""}
            />
            <div className="text-center button">
              <button className="btn btn-danger w-100 fs-2" type="button" onClick={handleSub}>
                Pay
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="place-right">
        <div className="card-total">
          <div className="hritikcart">
            <h1 className="mb-4 text-warning">Cart Total</h1>
            <div className="card-info">
              <p>FoodCharges</p>
              <p>
                {calTotal().toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
            </div>
            <div className="card-info">
              <p>Delivery Charges</p>
              <p>
                {Object.keys(itemCart).length > 0
                  ? (50).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })
                  : (0).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
              </p>
            </div>
            <div className="card-info border-0">
              <p>Total</p>
              <p>
                {Object.keys(itemCart).length > 0
                  ? (calTotal() + 50).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })
                  : (0).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
