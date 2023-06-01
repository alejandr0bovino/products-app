import React from "react";
import { Link } from "react-router-dom"
import { MenuActive } from "../components/MenuActive"
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <MenuActive />
      <Helmet>
        <title>Products App</title>
      </Helmet>
      
      <div className="theme-home">
        <h1>Welcome to Products App,<br /> the new standar in data analysis</h1>
        <p>Use Data to Get a 360-Degree<br class="d-none d-sm-block"/> View of Your Business</p>
        <div>
          <Link to="/products" className="btn btn-omega btn-omega--lg">See all Products</Link>
        </div>
      </div>
    </>
  );
}

export default Home;
