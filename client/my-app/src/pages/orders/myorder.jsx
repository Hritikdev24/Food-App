import { useContext, useEffect, useState } from "react";
import "./myorder.css";
import { Contextstore } from "../../context/contextStore";
import { toast } from "react-toastify";
import axios from "axios";
export function Myorder() {
  const { url, token } = useContext(Contextstore);
  const [data, setData] = useState([]);

  async function fetchOrder() {
    try {
      const response = await axios.post(
        `${url}/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);

      setData(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  }

  function handleTrack(data) {
    fetchOrder();
  }
  useEffect(() => {
    if (token) {
      fetchOrder();
    }else{
      setData([]);
    }
  },[token]);
  return (
    <div className="my-order">
      <div>
        <h1 className="text-center bg-dark text-light fs-1 py-4">My Orders</h1>
        <div className="w-100 px-5">
          {data.map((item) => (
            <div
              key={item._id}
              className="row bg-danger mt-1 p-2 py-4 rounded-2 text-light fs-2 text-capitalize align-items-center "
            >
              <div className="col-6 d-flex gap-4">
                {item.items.map((order) => (
                  <p key={order._id} className="ms-4">
                    {order.name} <i class="bi bi-x"></i> {order.quantity}
                  </p>
                ))}
              </div>
              <div className="col-6 d-flex justify-content-around">
                <span className="btn btn-secondary rounded-0 fs-4 pt-3">
                  {item.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </span>
                <span className="col-3  btn btn-warning rounded-0 fs-4">
                  {item.status}
                </span>
                <button
                  onClick={() => handleTrack(item._id)}
                  className="btn btn-info fs-4"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
