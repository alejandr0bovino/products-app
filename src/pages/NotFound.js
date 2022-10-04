import React from "react";
import { Helmet } from "react-helmet";
import { MenuActive } from "../components/MenuActive";

function NotFound() {
  return (
    <>
      <MenuActive />
      <Helmet>
        <title>Not found - Products App</title>
      </Helmet>
      <h2 className="theme-main-title">Not found</h2>
    </>
  );
}

export default NotFound;
