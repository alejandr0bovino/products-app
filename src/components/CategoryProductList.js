import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import useGetDataFromApi from "../hooks/useGetDataFromApi";
import { API } from "../constants/constants";
import { Loading } from "./Loading";
import { MenuActive } from "../components/MenuActive";
import { MdExpandMore } from "react-icons/md";
import { Helmet } from "react-helmet";

const CategoryProductList = () => {
  const { id } = useParams();
  const data = useGetDataFromApi(`${API}/categories/${id}`);
  const dataProducts = useGetDataFromApi(
    `${API}/categories/${id}/products?limit=36&offset=0`
  );
  const [load, setLoad] = useState(9);
  const loadData = () => {
    setLoad((prev) => prev + 9);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div>
      <MenuActive />

      {data.loaded ? (
        data.error ? (
          <h2 className="theme-main-title">Category not found</h2>
        ) : (
          <>
            <div>
              <Helmet>
                <title>Category: {data.products.name} - Products App</title>
              </Helmet>

              <div className="theme-category__title list-group-item list-group-item-action d-flex gap-3 py-3">
                <img
                  src={data.products.image}
                  alt={data.products.name}
                  width="64"
                  height="64"
                  className="rounded-circle flex-shrink-0"
                />
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <h5 className="mb-0">{data.products.name}</h5>
                </div>
              </div>

              {dataProducts.loaded ? (
                <div className="row gy-5 theme-products-list">
                  {dataProducts.products.slice(0, load).map((product) => (
                    <div key={product.id} className="col-lg-6 col-xl-4">
                      <ProductItem product={product} categoryProduct={true} />
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
              ) : (
                ""
              )}
            </div>
          </>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CategoryProductList;
