import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const useInitialState = () => {
  const [localCart, setLocalCart] = useLocalStorage("cartState", []);
  const [localFavs, setLocalFavs] = useLocalStorage("favsState", []);

  const [localTheme, setLocalTheme] = useLocalStorage("themeState", "dark");

  const initialState = {
    cart: localCart,
    favs: localFavs,
    darkTheme: localTheme,
  };

  const [state, setState] = useState(initialState);

  // Dark theme /////////////////////////////////////////////////////////////////////////////////

  const toggleTheme = () => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        darkTheme: localTheme === "light" ? "dark" : "light",
      };
      setLocalTheme(newState.darkTheme);
      return newState;
    });
  };

  // CART /////////////////////////////////////////////////////////////////////////////////

  const addToCart = (payload) => {
    setState((prevState) => {
      const newState = { ...prevState, cart: [...prevState.cart, payload] };
      setLocalCart(newState.cart);
      return newState;
    });
  };

  const removeFromCart = (payload, indexValue) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        cart: prevState.cart.filter(
          (item, index) => item.id !== payload && index !== indexValue
        ),
      };
      setLocalCart(newState.cart);
      return newState;
    });
  };

  const emptyCart = () => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        cart: (prevState.cart = []),
      };
      setLocalCart(newState.cart);
      return newState;
    });
  };

  // FAVS /////////////////////////////////////////////////////////////////////////////////

  const addToFavs = (payload) => {
    setState((prevState) => {
      const newState = { ...prevState, favs: [...prevState.favs, payload] };
      setLocalFavs(newState.favs);
      return newState;
    });
  };

  const removeFromFavs = (payload) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        favs: prevState.favs.filter((item) => item.id !== payload.id),
      };
      setLocalFavs(newState.favs);
      return newState;
    });
  };

  /////////////////////////////////////////////////////////////////////////////////

  return {
    state,
    addToCart,
    removeFromCart,
    emptyCart,
    addToFavs,
    removeFromFavs,
    toggleTheme,
  };
};

export default useInitialState;
