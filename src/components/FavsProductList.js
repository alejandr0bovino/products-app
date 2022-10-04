import React, { useContext } from "react";
import ProductItem from "./ProductItem";
import AppContext from "../context/AppContext";
import { Helmet } from "react-helmet";
import { MdWarningAmber } from "react-icons/md";

const FavsProductList = () => {
  const { state } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>Bookmarks - Products App</title>
      </Helmet>
      {state.favs.length > 0 ? (
        <div className="row gy-5 theme-products-list">
          {state.favs.map((item) => (
            <div className="col-lg-6 col-xl-4" key={item.id}>
              <ProductItem product={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-secondary theme-alert" role="alert">
          <div>
            <MdWarningAmber size="1.6rem" />
          </div>

          <div>
            <p className="mb-0">No bookmarks</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FavsProductList;
