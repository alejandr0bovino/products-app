import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import {
  MdOutlineNightlight,
  MdLightMode,
  MdMenu,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { SiReactos } from "react-icons/si";
import { BiLogIn } from "react-icons/bi";

import MyOrder from "../containers/MyOrder";
import { UserAuth } from "../context/AuthContext";

import Search from "./Search";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
  const { state, toggleTheme } = useContext(AppContext);

  const DarkMenuIcon =
    state.darkTheme === "light" ? MdLightMode : MdOutlineNightlight;

  const { user } = UserAuth();

  const [showSearch, setShowSearch] = useState(false);
  const handleShowSearch = () => setShowSearch(true);
  const handleCloseSearch = () => setShowSearch(false);

  const [showResponsiveMenuOffcanvas, setShowResponsiveMenuOffcanvas] =
    useState(false);
  const handleCloseResponsiveMenuOffcanvas = () =>
    setShowResponsiveMenuOffcanvas(false);
  const handleshowResponsiveMenuOffcanvas = () =>
    setShowResponsiveMenuOffcanvas(true);

  const [showCartOffcanvas, setShowCartOffcanvas] = useState(false);

  const location = useLocation();
  const disableCartLink = location.pathname.includes("checkout-success");

  const handleShowCartOffcanvas = () => setShowCartOffcanvas(true);
  const handleCloseCartOffcanvas = () => setShowCartOffcanvas(false);

  return (
    <>
      <header className="theme-header">
        <Navbar fixed="top">
          <Container fluid>
            <Nav>
              <Nav.Item className="d-xl-none">
                <button
                  className="btn nav-link"
                  onClick={handleshowResponsiveMenuOffcanvas}
                >
                  <MdMenu size="1.5rem" />
                </button>
              </Nav.Item>

              <Nav.Item>
                <Link to="/" className="btn nav-link">
                  <SiReactos size="1.5rem" />
                </Link>
              </Nav.Item>
            </Nav>

            <Nav className="d-none d-xl-flex">
              <Nav.Item id="menu-products">
                <Link className="btn nav-link" to="/products">
                  Products
                </Link>
              </Nav.Item>

              <Nav.Item id="menu-categories">
                <Link className="btn nav-link" to="/categories">
                  Categories
                </Link>
              </Nav.Item>

              <Nav.Item id="menu-restricted">
                <Link className="btn nav-link" to="/restricted-zone">
                  Restricted
                </Link>
              </Nav.Item>

              <Nav.Item id="menu-contact">
                <Link className="btn nav-link" to="/contact">
                  Contact
                </Link>
              </Nav.Item>
            </Nav>

            <Nav className="navbar-right ms-auto">
              <Nav.Item>
                <button className="btn nav-link" onClick={handleShowSearch}>
                  <AiOutlineSearch size="1.5rem" />
                  <span className="d-none d-xl-block">Search</span>
                </button>
              </Nav.Item>

              <Nav.Item id="menu-bookmarks">
                <Link to="/bookmarks" className="btn nav-link">
                  <BsBookmark size="1.5rem" />
                  <span className="d-none d-xl-block">Bookmarks</span>
                  {state.favs.length ? (
                    <>
                      <Badge pill bg="danger">
                        {state.favs.length}
                      </Badge>
                    </>
                  ) : null}
                </Link>
              </Nav.Item>

              <Nav.Item id="menu-cart">
                <button
                  className={
                    disableCartLink ? "btn nav-link disabled" : "btn nav-link"
                  }
                  onClick={handleShowCartOffcanvas}
                >
                  <MdOutlineShoppingCart size="1.5rem" />
                  <span className="d-none d-xl-block">Cart</span>
                  {state.cart.length ? (
                    <>
                      <Badge pill bg="danger">
                        {state.cart.length}
                      </Badge>
                    </>
                  ) : null}
                </button>
              </Nav.Item>

              <Nav.Item>
                <Button
                  className="nav-link d-none d-sm-flex"
                  variant=""
                  onClick={toggleTheme}
                  aria-label={
                    state.darkTheme === "dark"
                      ? "Enable dark mode"
                      : "Disable dark mode"
                  }
                >
                  <DarkMenuIcon size="1.5rem" />
                  <span className="d-none d-xl-block">
                    {state.darkTheme === "dark" ? "Dark mode" : "Light mode"}
                  </span>
                </Button>
              </Nav.Item>

              <Nav.Item id="menu-signin">
                {!user ? (
                  <>
                    <Link to="/signin" className="btn nav-link">
                      <BiLogIn size="1.5rem" />
                      <span className="d-none d-xl-block">Sign In</span>
                    </Link>
                  </>
                ) : (
                  <Link to="/account" className="btn nav-link">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.email} />
                    ) : (
                      <FaRegUserCircle size="1.5rem" />
                    )}
                    <span className="d-none d-xl-block">Account</span>
                  </Link>
                )}
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Search showSearch={showSearch} onClose={handleCloseSearch} />

      <Navbar.Offcanvas
        id="responsive-menu"
        aria-labelledby="responsive-menu-label"
        placement="start"
        show={showResponsiveMenuOffcanvas}
        onHide={handleCloseResponsiveMenuOffcanvas}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="responsive-menu-label">
            <SiReactos size="1.5rem" />
            &nbsp; Products App
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="theme-responsive-menu__container">
            <ul>
              <li>
                <Link
                  to="/"
                  className="btn"
                  onClick={handleCloseResponsiveMenuOffcanvas}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="btn"
                  onClick={handleCloseResponsiveMenuOffcanvas}
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="btn"
                  onClick={handleCloseResponsiveMenuOffcanvas}
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/restricted-zone"
                  className="btn"
                  onClick={handleCloseResponsiveMenuOffcanvas}
                >
                  Restricted
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="btn"
                  onClick={handleCloseResponsiveMenuOffcanvas}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <hr />

            <ul>
              <li>
                <Link
                  to="/bookmarks"
                  className="btn"
                  onClick={handleCloseResponsiveMenuOffcanvas}
                >
                  <BsBookmark size="1.5rem" />
                  Bookmarks
                  {state.favs.length ? (
                    <>
                      <Badge pill bg="danger">
                        {state.favs.length}
                      </Badge>
                    </>
                  ) : null}
                </Link>
              </li>

              <li>
                <button
                  className={disableCartLink ? "disabled btn" : "btn"}
                  onClick={() => {
                    handleCloseResponsiveMenuOffcanvas();
                    setShowCartOffcanvas(true);
                  }}
                >
                  <MdOutlineShoppingCart size="1.5rem" />
                  Cart
                  {state.cart.length ? (
                    <>
                      <Badge pill bg="danger">
                        {state.cart.length}
                      </Badge>
                    </>
                  ) : null}
                </button>
              </li>

              <li>
                <button
                  className="btn"
                  variant=""
                  onClick={() => {
                    handleCloseResponsiveMenuOffcanvas();
                    toggleTheme();
                  }}
                  aria-label={
                    state.darkTheme === "dark"
                      ? "Enable dark mode"
                      : "Disable dark mode"
                  }
                >
                  <DarkMenuIcon size="1.5rem" />
                  <span>
                    {state.darkTheme === "dark" ? "Dark mode" : "Light mode"}
                  </span>
                </button>
              </li>

              <li>
                {!user ? (
                  <>
                    <Link
                      to="/signin"
                      className="btn"
                      onClick={handleCloseResponsiveMenuOffcanvas}
                    >
                      <BiLogIn size="1.5rem" />
                      <span>Sign In</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/account"
                    className="btn"
                    onClick={handleCloseResponsiveMenuOffcanvas}
                  >
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.email} />
                    ) : (
                      <FaRegUserCircle size="1.5rem" />
                    )}
                    <span>Account</span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>

      <Navbar.Offcanvas
        id="cart-menu"
        aria-labelledby="cart-menu-label"
        placement="end"
        show={showCartOffcanvas}
        onHide={handleCloseCartOffcanvas}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="cart-menu-label">
            <MdOutlineShoppingCart
              size="1.5rem"
              style={{ verticalAlign: "text-top" }}
            />
            &nbsp; Cart
            {state.cart.length ? (
              <>
                &nbsp;&nbsp;
                <Badge pill bg="danger">
                  {state.cart.length}
                </Badge>
              </>
            ) : null}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <MyOrder />
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </>
  );
}

export default Header;
