import React from "react";
import { MenuActive } from "../components/MenuActive";
import { GiAlienBug } from "react-icons/gi";
import { Helmet } from "react-helmet";

function RestrictedZone() {
  return (
    <>
      <MenuActive page="menu-restricted" />
      <Helmet>
        <title>Restricted Zone - Products App</title>
      </Helmet>

      <h2 className="theme-main-title-aligned">
        <GiAlienBug size="2.5rem" />
        &nbsp;&nbsp;&nbsp; Restricted Zone &nbsp;&nbsp;&nbsp;
        <GiAlienBug size="2.5rem" />
      </h2>
    </>
  );
}

export default RestrictedZone;
