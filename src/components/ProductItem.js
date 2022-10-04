import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeToast } from "./ThemeToast";

import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BsBookmarkPlus, BsBookmarkDash } from "react-icons/bs";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";

import { useLocalStorage } from "../hooks/useLocalStorage";
import AppContext from "../context/AppContext";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function ProductItem({ product, categoryProduct }) {
  const toastSuccessfullyAddeToCartdMsg = () => (
    <div className="toast-c-container">
      <FaCheck size="1.25rem" /> <span>Successfully aadded to Cart</span>
    </div>
  );

  const toastSuccessfullyAddedMsg = () => (
    <div className="toast-c-container">
      <FaCheck size="1.25rem" /> <span>Successfully aadded to Bookmarks</span>
    </div>
  );
  const toastSuccessfullyRemovedMsg = () => (
    <div className="toast-c-container">
      <FaCheck size="1.25rem" />{" "}
      <span>Successfully removed from Bookmarks</span>
    </div>
  );

  const displayToastSuccessfullyAddedToCartMsg = () => {
    toast.success(toastSuccessfullyAddeToCartdMsg);
  };

  const displayToastSuccessfullyAddedMsg = () => {
    toast.success(toastSuccessfullyAddedMsg);
  };
  const displayToastSuccessfullyRemovedMsg = () => {
    toast.success(toastSuccessfullyRemovedMsg);
  };

  const key = `like-${product.id}`;
  const [liked, setLiked] = useLocalStorage(key, false);
  const { addToCart, addToFavs, removeFromFavs } = useContext(AppContext);

  const Icon = liked ? BsBookmarkDash : BsBookmarkPlus;

  const handleCartClick = (item) => {
    addToCart(item);
    displayToastSuccessfullyAddedToCartMsg();
  };

  const handleFavsClick = (item) => {
    setLiked(!liked);

    if (liked) {
      removeFromFavs(item);
      displayToastSuccessfullyRemovedMsg();
    } else {
      addToFavs(item);
      displayToastSuccessfullyAddedMsg();
    }
  };

  return (
    <>
      <div className="theme-product-item-2__wrapper">
        <Link
          to={`/product/${product.id}`}
          className="theme-product-item-2"
          style={{ backgroundImage: "url(" + product.images[0] + ")" }}
        >
          <div className="theme-product-item-2__outer">
            <h2 className="theme-product-item-2__title">{product.title}</h2>

            <div className="theme-product-item-2__inner">
              <div className="theme-product-item-2__price">
                <span>
                  <HiCurrencyDollar size="2.25rem" />
                </span>
                <b>{product.price}</b>
              </div>

              <div className="theme-product-item-2__action">
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 0, hide: 200 }}
                  overlay={
                    <Tooltip>
                      {liked ? "Remove from Bookmarks" : "Add to Bookmarks"}
                    </Tooltip>
                  }
                >
                  <Button
                    className="btn-epsilon"
                    variant=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavsClick(product);
                    }}
                    aria-label={
                      liked ? "Remove from Bookmarks" : "Add to Bookmarks"
                    }
                  >
                    <Icon size="1.75rem" />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  delay={{ show: 0, hide: 200 }}
                  overlay={<Tooltip>Add to Cart</Tooltip>}
                >
                  <Button
                    className="btn-epsilon"
                    variant=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleCartClick(product);
                    }}
                  >
                    <MdOutlineAddShoppingCart size="1.75rem" />
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </Link>
        {!categoryProduct ? (
          <div className="theme-product-item-2__category">
            <Link
              to={`/category/${product.category.id}`}
              className="btn btn-warning"
            >
              {product.category.name}
            </Link>
          </div>
        ) : null}
      </div>

      <ThemeToast />
    </>
  );
}

export default ProductItem;
