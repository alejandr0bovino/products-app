import React, { useEffect } from "react";
import FavsProductList from "../components/FavsProductList"
import { MenuActive } from "../components/MenuActive"

function Favs() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, []);
  
  return (
    <>
      <MenuActive page="menu-bookmarks" />
      <FavsProductList />
    </>
  );
}

export default Favs;
