import React, { useContext } from "react";
import AppContext from "../context/AppContext";

import { IoMdCloseCircle } from "react-icons/io";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

const OrderItem = ({ product, index }) => {
  const { removeFromCart } = useContext(AppContext);
  const handleRemove = (product) => {
    removeFromCart(product, index);
  };

  return (
    <div className="theme-order-item">
      <div className="theme-order-item__picture">
        <img src={product.images[0]} alt={product.title} />
      </div>

      <div className="theme-order-item__info">
        <h5>{product.title}</h5>
      </div>

      <div className="theme-order-item__price">
        $ &nbsp;
        <span>{product.price}</span>
      </div>

      <div className="theme-order-item__close">
        <OverlayTrigger
          OverlayTrigger
          overlay={<Tooltip>{"Remove from cart"}</Tooltip>}
        >
          <Button
            variant=""
            onClick={() => {
              handleRemove(product);
            }}
          >
            <IoMdCloseCircle size="1.5rem" />
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default OrderItem;
