import { useEffect, useState } from "react";
import axios from "axios";

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

const productImages = (product) => {
  const images = Array.isArray(product.images)
    ? product.images.filter(Boolean)
    : [];

  if (product.thumbnail && !images.includes(product.thumbnail)) {
    images.push(product.thumbnail);
  }

  const fallback = images[0];
  while (fallback && images.length < 3) {
    images.push(fallback);
  }

  return images;
};

const toCatalogProduct = (product, categoryNames) => {
  const slug =
    typeof product.category === "string" ? product.category : product.category?.id;

  return {
    ...product,
    images: productImages(product),
    category: {
      id: slug,
      name: categoryNames[slug] || slug,
      image: product.thumbnail || product.images?.[0] || "",
    },
  };
};

const fetchCatalog = async (url) => {
  const requested = new URL(url);
  const path = requested.pathname.replace(/^\/api\/v1/, "") || "/";
  const limit = Number(requested.searchParams.get("limit") || 0);
  const offset = Number(requested.searchParams.get("offset") || 0);
  const categoryNames = await getCategoryNames();

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
    const [categories, products] = await Promise.all([
      axios.get(`${CATALOG_API}/products/categories`),
      axios.get(`${CATALOG_API}/products`, { params: { limit: 0 } }),
    ]);
    const imageBySlug = {};

    products.data.products.forEach((product) => {
      if (!imageBySlug[product.category]) {
        imageBySlug[product.category] =
          product.thumbnail || product.images?.[0] || "";
      }
    });

    const list = categories.data.map((category) => ({
      id: category.slug,
      name: category.name,
      image: imageBySlug[category.slug] || "",
    }));

    return limit ? list.slice(offset, offset + limit) : list;
  }

  const categoryMatch = path.match(/^\/categories\/([^/]+)$/);
  if (categoryMatch) {
    const slug = decodeURIComponent(categoryMatch[1]);
    const [categories, products] = await Promise.all([
      axios.get(`${CATALOG_API}/products/categories`),
      axios.get(`${CATALOG_API}/products/category/${slug}`, {
        params: { limit: 1 },
      }),
    ]);
    const category = categories.data.find((item) => item.slug === slug);

    if (!category) {
      throw new Error("Category not found");
    }

    const sample = products.data.products?.[0];

    return {
      id: category.slug,
      name: category.name,
      image: sample?.thumbnail || sample?.images?.[0] || "",
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
