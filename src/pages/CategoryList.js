import React, { useEffect } from "react";
import useGetDataFromApi from "../hooks/useGetDataFromApi";
import { Link } from "react-router-dom";
import { API, FEATURED_CATEGORY_LIMITS } from "../constants/constants";
import { Loading } from "./../components/Loading";
import { MenuActive } from "../components/MenuActive";
import { Helmet } from "react-helmet";

const FEATURED_CATEGORIES = FEATURED_CATEGORY_LIMITS.map(({ slug }) => slug);

const categoryKey = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

function CategoryLink({ category }) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="list-group-item list-group-item-action d-flex gap-3 py-3"
    >
      <img
        src={category.image}
        alt={category.name}
        width="64"
        height="64"
        className="rounded-circle flex-shrink-0"
      />
      <div className="d-flex gap-2 w-100 justify-content-between">
        <h5 className="mb-0">{category.name}</h5>
      </div>
    </Link>
  );
}

function CategoriesList() {
  const data = useGetDataFromApi(`${API}/categories`);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const categories =
    data.loaded && Array.isArray(data.products)
      ? FEATURED_CATEGORIES.map((key) =>
          data.products.find(
            (category) =>
              categoryKey(category.id) === key ||
              categoryKey(category.name) === key
          )
        ).filter(Boolean)
      : [];

  const midpoint = Math.ceil(categories.length / 2);
  const columns = [categories.slice(0, midpoint), categories.slice(midpoint)];

  return (
    <>
      <MenuActive page="menu-categories" />
      <Helmet>
        <title>Categories - Products App</title>
      </Helmet>

      {!data.loaded && <Loading />}

      <div className="row theme-category-list">
        {columns.map((column, columnIndex) => (
          <div className="col-md-6" key={columnIndex}>
            <div
              className={`theme-category-list__group theme-category-list__group--${
                columnIndex + 1
              } list-group${columnIndex === 1 ? " w-auto" : ""}`}
            >
              {column.map((category) => (
                <CategoryLink key={category.id} category={category} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoriesList;
