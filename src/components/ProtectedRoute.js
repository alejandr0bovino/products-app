import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { MenuActive } from "../components/MenuActive";
import { MdWarningAmber } from "react-icons/md";
import { Helmet } from "react-helmet";

const ProtectedRoute = ({ children }) => {
  const { auth } = UserAuth();

  if (!auth.currentUser) {
    return (
      <>
        <MenuActive />
        <Helmet>
          <title>Protected route - Products App</title>
        </Helmet>

        <div className="alert alert-secondary theme-alert mb-0" role="alert">
          <div>
            <MdWarningAmber size="1.6rem" />
          </div>

          <div>
            <p>This content is available for signed in users.</p>

            <hr />

            <p className="mb-0">
              <Link to="/signin">Sign in here</Link>.
            </p>
          </div>
        </div>
      </>
    );
  }
  return children;
};

export default ProtectedRoute;
