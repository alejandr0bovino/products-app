import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../containers/Layout";
import Home from "../pages/Home";
import ProductsList from "../containers/ProductsList";
import ProductDetail from "../pages/ProductDetail";
import Favs from "../pages/Favs";
import CategoryList from "../pages/CategoryList";
import CategoryProductList from "../components/CategoryProductList";
import CheckOut from "../pages/CheckOut";
import CheckOutSuccess from "../pages/CheckOutSuccess";
import About from "../pages/About";
import Help from "../pages/Help";
import NotFound from "../pages/NotFound";

import RestrictedZone from "../pages/RestrictedZone";

import AppContext from "../context/AppContext";
import useInitialState from "../hooks/useInitialState";

import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Account from "../pages/Account";
import ProtectedRoute from "../components/ProtectedRoute";

import { AuthContextProvider } from "../context/AuthContext";

import Contact from "../pages/Contact";

function App() {
  const initialState = useInitialState();
  return (
    <AuthContextProvider>
      <AppContext.Provider value={initialState}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/products" element={<ProductsList />} />
              <Route exact path="/signin" element={<Signin />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/help" element={<Help />} />

              <Route
                exact
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />

              <Route exact path="/product/:id" element={<ProductDetail />} />
              <Route exact path="/bookmarks" element={<Favs />} />
              <Route exact path="/categories" element={<CategoryList />} />

              <Route
                exact
                path="/restricted-zone"
                element={
                  <ProtectedRoute>
                    <RestrictedZone />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/category/:id"
                element={<CategoryProductList />}
              />
              <Route exact path="/checkout" element={<CheckOut />} />
              <Route
                exact
                path="/checkout-success"
                element={<CheckOutSuccess />}
              />

              <Route exact path="/contact" element={<Contact />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AppContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
