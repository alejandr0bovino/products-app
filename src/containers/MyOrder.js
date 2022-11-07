import React, { useContext } from "react";
import { Link } from "react-router-dom";
import OrderItem from "../components/OrderItem";
import AppContext from "../context/AppContext";
import SumTotalOrder from "../utils/SumTotalOrder";

import { MdWarningAmber } from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi";

const MyOrder = () => {
  const { state } = useContext(AppContext);
  const sumTotal = SumTotalOrder(state.cart);

  return (
    <>
      <div className="myOrder__Container">
        {state.cart.length > 0 ? (
          <>
            {state.cart.map((item, index) => (
              <OrderItem product={item} key={index} index={index} />
            ))}
          </>
        ) : (
          <>
            <div className="alert alert-secondary theme-alert" role="alert">
              <div>
                <MdWarningAmber size="1.5rem" />
              </div>

              <div>
                <p className="mb-0">                  
                  No items in cart
                </p>
              </div>              
            </div>
          </>
        )}
      </div>

      {sumTotal > 0 ? (
        <>
          <div className="myOrder__action">
            <div>
              <b>Sub total:</b>

              <b>
                <HiCurrencyDollar size="1.75rem" />
                &nbsp;
                {sumTotal}
              </b>
            </div>

            <div>
              <Link
                className="btn btn-danger w-100"
                to="/checkout"
                onClick={() => document.querySelector(".btn-close").click()}
              >
                <b>CHECKOUT</b>
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default MyOrder;
