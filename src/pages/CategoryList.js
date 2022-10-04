import React, { useEffect } from "react";
import useGetDataFromApi from "../hooks/useGetDataFromApi";
import { Link } from "react-router-dom";
import { API } from "../constants/constants";
import { Loading } from "./../components/Loading";
import { MenuActive } from "../components/MenuActive";
import { Helmet } from "react-helmet";

function CategoriesList() {
  const data = useGetDataFromApi(`${API}/categories?limit=5&offset=0`);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <MenuActive page="menu-categories" />
      <Helmet>
        <title>Categories - Products App</title>
      </Helmet>

      {!data.loaded && <Loading />}

      <div className="row theme-category-list">
        <div className="col-md-6">
          <div className="theme-category-list__group theme-category-list__group--1 list-group">
            {data.loaded && (
              <>
                <Link
                  to={`/category/${data.products[0].id}`}
                  className="list-group-item list-group-item-action d-flex gap-3 py-3"
                >
                  <img
                    src={data.products[0].image}
                    alt={data.products[0].name}
                    width="64"
                    height="64"
                    className="rounded-circle flex-shrink-0"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between">
                    <h5 className="mb-0">{data.products[0].name}</h5>
                  </div>
                </Link>

                <Link
                  to={`/category/${data.products[1].id}`}
                  className="list-group-item list-group-item-action d-flex gap-3 py-3"
                >
                  <img
                    src={data.products[1].image}
                    alt={data.products[1].name}
                    width="64"
                    height="64"
                    className="rounded-circle flex-shrink-0"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between">
                    <h5 className="mb-0">{data.products[1].name}</h5>
                  </div>
                </Link>

                <Link
                  to={`/category/${data.products[2].id}`}
                  className="list-group-item list-group-item-action d-flex gap-3 py-3"
                >
                  <img
                    src={data.products[2].image}
                    alt={data.products[2].name}
                    width="64"
                    height="64"
                    className="rounded-circle flex-shrink-0"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between">
                    <h5 className="mb-0">{data.products[2].name}</h5>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="theme-category-list__group theme-category-list__group--2 list-group w-auto">
            {data.loaded && (
              <>
                <Link
                  to={`/category/${data.products[3].id}`}
                  className="list-group-item list-group-item-action d-flex gap-3 py-3"
                >
                  <img
                    src={data.products[3].image}
                    alt={data.products[3].name}
                    width="64"
                    height="64"
                    className="rounded-circle flex-shrink-0"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between">
                    <h5 className="mb-0">{data.products[3].name}</h5>
                  </div>
                </Link>
                <Link
                  to={`/category/${data.products[4].id}`}
                  className="list-group-item list-group-item-action d-flex gap-3 py-3"
                >
                  <img
                    src={data.products[4].image}
                    alt={data.products[4].name}
                    width="64"
                    height="64"
                    className="rounded-circle flex-shrink-0"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between">
                    <h5 className="mb-0">{data.products[4].name}</h5>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesList;
