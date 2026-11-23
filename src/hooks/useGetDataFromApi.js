import { useEffect, useState } from "react";
import axios from "axios";
import { FEATURED_CATEGORY_LIMITS } from "../constants/constants";
import { coverForCategory, photosForProduct } from "../utils/catalogPhotos";

const PLATZI_API = "https://api.escuelajs.co/api/v1";
const CATALOG_API = "https://dummyjson.com";

let categoryNamesPromise;

const getCategoryNames = () => {
  if (!categoryNamesPromise) {
    categoryNamesPromise = axios
      .get(`${CATALOG_API}/products/categories`)
      .then((response) =>
        Object.fromEntries(
          response.data.map((category) => [category.slug, category.name])
        )
      )
      .catch((error) => {
        categoryNamesPromise = null;
        throw error;
      });
  }

  return categoryNamesPromise;
};

const toCatalogProduct = (product, categoryNames) => {
  const slug =
    typeof product.category === "string" ? product.category : product.category?.id;
  const images = photosForProduct(product);

  return {
    ...product,
    images,
    thumbnail: images[0],
    category: {
      id: slug,
      name: categoryNames[slug] || slug,
      image: coverForCategory(slug),
    },
  };
};

const interleaveProducts = (lists) => {
  const mixed = [];
  const longest = lists.reduce(
    (count, list) => Math.max(count, list.length),
    0
  );

  for (let index = 0; index < longest; index += 1) {
    lists.forEach((list) => {
      if (list[index]) {
        mixed.push(list[index]);
      }
    });
  }

  return mixed;
};

const fetchFeaturedProducts = async (categoryNames) => {
  const lists = await Promise.all(
    FEATURED_CATEGORY_LIMITS.map(async ({ slug, limit }) => {
      const response = await axios.get(
        `${CATALOG_API}/products/category/${slug}`,
        { params: { limit } }
      );

      return response.data.products
        .slice(0, limit)
        .map((product) => toCatalogProduct(product, categoryNames));
    })
  );

  return interleaveProducts(lists);
};

const fetchCatalog = async (url) => {
  const requested = new URL(url);
  const path = requested.pathname.replace(/^\/api\/v1/, "") || "/";
  const limit = Number(requested.searchParams.get("limit") || 0);
  const offset = Number(requested.searchParams.get("offset") || 0);
  const categoryNames = await getCategoryNames();

  if (path === "/products" && requested.searchParams.get("selection") === "featured") {
    return fetchFeaturedProducts(categoryNames);
  }

  if (path === "/products") {
    const response = await axios.get(`${CATALOG_API}/products`, {
      params: { limit: limit || 0, skip: offset },
    });

    return response.data.products.map((product) =>
      toCatalogProduct(product, categoryNames)
    );
  }

  const productMatch = path.match(/^\/products\/(\d+)$/);
  if (productMatch) {
    const response = await axios.get(
      `${CATALOG_API}/products/${productMatch[1]}`
    );
    return toCatalogProduct(response.data, categoryNames);
  }

  if (path === "/categories") {
    const categories = await axios.get(`${CATALOG_API}/products/categories`);

    const list = categories.data.map((category) => ({
      id: category.slug,
      name: category.name,
      image: coverForCategory(category.slug),
    }));

    return limit ? list.slice(offset, offset + limit) : list;
  }

  const categoryMatch = path.match(/^\/categories\/([^/]+)$/);
  if (categoryMatch) {
    const slug = decodeURIComponent(categoryMatch[1]);
    const categories = await axios.get(`${CATALOG_API}/products/categories`);
    const category = categories.data.find((item) => item.slug === slug);

    if (!category) {
      throw new Error("Category not found");
    }

    return {
      id: category.slug,
      name: category.name,
      image: coverForCategory(category.slug),
    };
  }

  const categoryProductsMatch = path.match(/^\/categories\/([^/]+)\/products$/);
  if (categoryProductsMatch) {
    const slug = decodeURIComponent(categoryProductsMatch[1]);
    const response = await axios.get(`${CATALOG_API}/products/category/${slug}`, {
      params: { limit: limit || 0, skip: offset },
    });

    return response.data.products.map((product) =>
      toCatalogProduct(product, categoryNames)
    );
  }

  throw new Error("Unknown catalog request");
};

const useGetDataFromApi = (API) => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setProducts(null);
    setError("");
    setLoaded(false);

    (async () => {
      try {
        const data = API.startsWith(PLATZI_API)
          ? await fetchCatalog(API)
          : (await axios(API)).data;

        if (!cancelled) {
          setProducts(data);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.message);
        }
      } finally {
        if (!cancelled) {
          setLoaded(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [API]);

  return { products, error, loaded };
};

export default useGetDataFromApi;
