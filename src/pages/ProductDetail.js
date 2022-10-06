import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGetDataFromApi from "../hooks/useGetDataFromApi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { API } from "../constants/constants";
import { Loading } from "./../components/Loading";
import AppContext from "../context/AppContext";

import { ThemeToast } from "../components/ThemeToast";
import { toast } from "react-toastify";

import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BsBookmarkPlus, BsBookmarkDash } from "react-icons/bs";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";

import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { MenuActive } from "../components/MenuActive";

function ProductDetail() {
  const { id } = useParams();
  const data = useGetDataFromApi(`${API}/products/${id}`);

  const key = `like-${id}`;
  const [liked, setLiked] = useLocalStorage(key, false);
  const Icon = liked ? BsBookmarkDash : BsBookmarkPlus;

  const { addToCart, addToFavs, removeFromFavs } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const toastSuccessfullyAddeToCartdMsg = () => (
    <div className="toast-c-container">
      <FaCheck size="1.25rem" /> <span>Successfully aadded to Cart</span>
    </div>
  );

  const displayToastSuccessfullyAddedToCartMsg = () => {
    toast.success(toastSuccessfullyAddeToCartdMsg);
  };

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

  const displayToastSuccessfullyAddedMsg = () => {
    toast.success(toastSuccessfullyAddedMsg);
  };
  const displayToastSuccessfullyRemovedMsg = () => {
    toast.success(toastSuccessfullyRemovedMsg);
  };

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
      <MenuActive />
      {data.loaded ? (
        data.error ? (
          <h2 className="theme-main-title">Product not found</h2>
        ) : (
          <>
            <div className="row gy-5">
              <div className="col-md-6">
                <div className="theme-product-detail__slider-wrapper">
                  <Carousel interval="2500" fade pause={false}>
                    <Carousel.Item>
                      <figure>
                        <img
                          className="d-block w-100"
                          src={data.products.images[0]}
                          alt={data.products.title}
                        />
                      </figure>
                    </Carousel.Item>
                    <Carousel.Item>
                      <figure>
                        <img
                          className="d-block w-100"
                          src={data.products.images[1]}
                          alt={data.products.title}
                        />
                      </figure>
                    </Carousel.Item>
                    <Carousel.Item>
                      <figure>
                        <img
                          className="d-block w-100"
                          src={data.products.images[2]}
                          alt={data.products.title}
                        />
                      </figure>
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>

              <div className="col-md-6">
                <h2 className="theme-main-title">{data.products.title}</h2>

                <p className="theme-product-detail__desc">
                  {data.products.description}
                </p>

                <div className="row mb-4">
                  <div className="col-6 col-md--12 order-last text-end text-md-start">
                    <Link
                      to={`/category/${data.products.category.id}`}
                      className="btn btn-warning"
                    >
                      {data.products.category.name}
                    </Link>
                  </div>

                  <div className="theme-product-detail__price col-6 col-md-12 order-md-last">
                    <span>
                      <HiCurrencyDollar size="2.25rem" />
                    </span>
                    <b>{data.products.price}</b>
                  </div>
                </div>

                <div className="theme-product-detail__action">
                  <div>
                    <Button
                      className="btn-omega has-icon"
                      onClick={() => {
                        handleFavsClick(data.products);
                      }}
                      variant=""
                    >
                      <Icon size="1.75rem" />
                      <span>
                        {liked ? "Remove from Bookmarks" : "Add to Bookmarks"}
                      </span>
                    </Button>
                  </div>

                  <div>
                    <Button
                      className="btn-gamma has-icon"
                      onClick={() => handleCartClick(data.products)}
                      variant=""
                    >
                      <MdOutlineAddShoppingCart size="1.75rem" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <Loading />
      )}

      <ThemeToast />
    </>
  );
}

export default ProductDetail;
