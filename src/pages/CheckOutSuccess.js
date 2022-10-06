import React, { useContext, useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import SumTotalOrder from "../utils/SumTotalOrder";
import { MenuActive } from "../components/MenuActive";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import { toast } from "react-toastify";
import { ThemeToast } from "../components/ThemeToast";
import { Helmet } from "react-helmet";

function CheckOutSuccess() {
  const location = useLocation();

  const { state, emptyCart } = useContext(AppContext);

  const sumTotal = SumTotalOrder(state.cart);

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const handleCheckOut = () => {
    setShowSuccessMsg(true);
    displayToastSuccessfullySentMsg();
    emptyCart();
    window.history.replaceState({}, document.title);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const toastSuccessfullySentMsg = () => (
    <div className="toast-c-container">
      <FaCheck size="1.25rem" /> <span>Successfull checkout</span>
    </div>
  );
  const displayToastSuccessfullySentMsg = () => {
    toast.success(toastSuccessfullySentMsg);
  };

  return (
    <>
      <MenuActive page="menu-cart" />
      <Helmet>
        <title>Checkout - Products App</title>
      </Helmet>
      <h2 className="theme-main-title">Checkout</h2>

      {location.state ? (
        <>
          {showSuccessMsg && (
            <>
              <div className="row">
                <div className="col">
                  <h3 className="theme-thank-you">
                    <BsCheckCircleFill />
                    &nbsp; Thank you
                  </h3>
                </div>
              </div>
            </>
          )}
          {!showSuccessMsg && (
            <div className="row gy-5">
              <div className="col-md-5 order-md-last">
                <h3 className="theme-main-title-2 theme-checkout__title">
                  <span>Your cart</span>
                  <Badge pill bg="danger">
                    {state.cart.length}
                  </Badge>
                </h3>

                <ul className="list-group mb-0">
                  {state.cart.map((item, index) => (
                    <li
                      className="list-group-item theme-checkout__item"
                      key={index}
                      index={index}
                    >
                      <div>
                        <h6 className="my-0">{item.title}</h6>
                      </div>
                      <span>$ {item.price}</span>
                    </li>
                  ))}

                  <li className="list-group-item d-flex justify-content-between theme-checkout__total__inner">
                    <strong>Total:</strong>
                    <strong>
                      <HiCurrencyDollar size="1.75rem" />
                      &nbsp;
                      {sumTotal}
                    </strong>
                  </li>
                </ul>
              </div>

              <div className="col-md-7">
                <h3 className="theme-main-title-2">Billing address</h3>

                <div className="mb-3 pb-3 border-bottom">
                  <div className="row">
                    <div className="col-md-3 theme-table-1__label">
                      <strong>First name:</strong>
                    </div>
                    <div className="col-md-9">{location.state.data.name}</div>
                  </div>
                </div>

                <div className="mb-3 pb-3 border-bottom">
                  <div className="row">
                    <div className="col-md-3 theme-table-1__label">
                      <strong>Last name:</strong>
                    </div>
                    <div className="col-md-9">
                      {location.state.data.lastname}
                    </div>
                  </div>
                </div>

                <div className="mb-3 pb-3 border-bottom">
                  <div className="row">
                    <div className="col-md-3 theme-table-1__label">
                      <strong>Email:</strong>
                    </div>
                    <div className="col-md-9">{location.state.data.email}</div>
                  </div>
                </div>

                <div className="mb-3 pb-3 border-bottom">
                  <div className="row">
                    <div className="col-md-3 theme-table-1__label">
                      <strong>Address:</strong>
                    </div>
                    <div className="col-md-9">
                      {location.state.data.address}
                    </div>
                  </div>
                </div>

                {location.state.data.address2 && (
                  <div className="mb-3 pb-3 border-bottom">
                    <div className="row">
                      <div className="col-md-3 theme-table-1__label">
                        <strong>Address 2:</strong>
                      </div>
                      <div className="col-md-9">
                        {location.state.data.address2}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-3 pb-3 border-bottom">
                  <div className="row">
                    <div className="col-md-3 theme-table-1__label">
                      <strong>Country:</strong>
                    </div>
                    <div className="col-md-9">
                      {location.state.data.country}
                    </div>
                  </div>
                </div>

                <div className="mb-3 pb-3 border-bottom">
                  <div className="row">
                    <div className="col-md-3 theme-table-1__label">
                      <strong>State:</strong>
                    </div>
                    <div className="col-md-9">{location.state.data.state}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="row">
                    <div className="col-md-3 theme-table-1__label">
                      <strong>Zip:</strong>
                    </div>
                    <div className="col-md-9">{location.state.data.zip}</div>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    className="btn btn-gamma mh btn--flex btn-gamma--lg w-100"
                    onClick={handleCheckOut}
                  >
                    <MdOutlineShoppingCart size="1.75rem" />
                    &nbsp;&nbsp; Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Navigate to="/checkout" />
      )}
      <ThemeToast />
    </>
  );
}

export default CheckOutSuccess;
