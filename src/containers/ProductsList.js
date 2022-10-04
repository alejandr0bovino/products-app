import React, { useEffect, useState } from "react";
import { MenuActive } from "../components/MenuActive";
import ProductItem from "../components/ProductItem";
import { API } from "../constants/constants";
import useGetDataFromApi from "../hooks/useGetDataFromApi";
import { Loading } from "../components/Loading";
import { MdExpandMore } from "react-icons/md";
import { Helmet } from "react-helmet";

function ProductsList() {
  const data = useGetDataFromApi(`${API}/products?limit=48&offset=0`);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const [load, setLoad] = useState(9);

  const loadData = () => {
    setLoad((prev) => prev + 9);
  };

  return (
    <>
      <MenuActive page="menu-products" />
      <Helmet>
        <title>All products - Products App</title>
      </Helmet>

      {data.loaded ? (
        <>
          <div className="row gy-5 theme-products-list">
            {data.products.slice(0, load).map((item) => (
              <div className="col-lg-6 col-xl-4" key={item.id}>
                <ProductItem product={item} />
              </div>
            ))}

            {load < 36 && (
              <div className="theme-products-list__load-more">
                <button
                  onClick={loadData}
                  className="btn btn-gamma btn--flex m-auto"
                >
                  <MdExpandMore size="1.5rem" />
                  &nbsp;&nbsp; Load more
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ProductsList;
