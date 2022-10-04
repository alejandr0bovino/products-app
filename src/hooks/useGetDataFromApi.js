import { useEffect, useState } from "react";
import axios from "axios";

const useGetDataFromApi = (API) => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios(API);
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { products, error, loaded };
};

export default useGetDataFromApi;
