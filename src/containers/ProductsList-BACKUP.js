import React, { useEffect } from "react";
import { MenuActive } from "../components/MenuActive";
import ProductItem from "../components/ProductItem";
import { API } from "../constants/constants";
import useGetDataFromApi from "../hooks/useGetDataFromApi";
import { Loading } from "../components/Loading";

function ProductsList() {
  const data = useGetDataFromApi(`${API}/products?limit=12&offset=0`);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <MenuActive page="menu-products" />
      {data.loaded ? (
        <>
          <div className="row gy-5">
            {data.products.map((item) => (
              <div className="col-lg-6 col-xl-4" key={item.id}>
                <ProductItem product={item} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ProductsList;
