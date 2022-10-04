import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import AppContext from "../context/AppContext";

import { ThemeToast } from "../components/ThemeToast";

import { toast } from "react-toastify";

import { FaCheck, FaRegUserCircle } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineNightlight, MdLightMode } from "react-icons/md";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Button from "react-bootstrap/Button";

import { MenuActive } from "../components/MenuActive";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { Helmet } from "react-helmet";

function Account() {
  // debugger;
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const { state, toggleTheme } = useContext(AppContext);

  const DarkMenuIcon =
    state.darkTheme === "dark" ? MdOutlineNightlight : MdLightMode;

  const toastSuccessfullyAddedMsg = () => (
    <div className="toast-c-container">
      <FaCheck size="1.25rem" /> <span>Successfully signed in</span>
    </div>
  );
  const displayToastSuccessfullyAddedMsg = () => {
    toast.success(toastSuccessfullyAddedMsg);
  };

  const [loadOnce, setLoadOnce] = useLocalStorage("accountFirstLoad", false);

  useEffect(() => {
    if (!loadOnce) {
      setLoadOnce(true);
      displayToastSuccessfullyAddedMsg();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setLoadOnce(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <MenuActive page="menu-signin" />
      <Helmet>
        <title>Account - Products App</title>
      </Helmet>

      <div className="row gy-5 theme-account">
        <div className="col-md-2">
          {user.photoURL ? (
            <>
              <div className="theme-account__picture">
                <img src={user.photoURL} alt={user.email} />
              </div>
            </>
          ) : (
            <>
              <FaRegUserCircle size="8rem" />
            </>
          )}
        </div>

        <div className="col-md-10">
          <h2 className="theme-main-title">Account</h2>

          {user.photoURL && (
            <p className="theme-account__google">
              <a href="https://google.com/" target="_blank">
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="button-tooltip-2">Google account</Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <span
                      ref={ref}
                      {...triggerHandler}
                      variant="danger"
                      className="danger"
                    >
                      <AiFillGoogleCircle size="2rem" />
                    </span>
                  )}
                </OverlayTrigger>
              </a>
            </p>
          )}

          <div className="mb-3 pb-3 border-bottom">
            <strong className="d-block">{user && user.email} </strong>
            Email address
          </div>

          {user.displayName && (
            <div className="mb-3 pb-3 border-bottom">
              <strong className="d-block">{user && user.displayName}</strong>
              @username
            </div>
          )}

          <div className="mb-4 pb-3">
            <Button className="btn btn-beta" variant="" onClick={toggleTheme}>
              <DarkMenuIcon size="1.75rem" />
              &nbsp;&nbsp;
              <strong style={{ verticalAlign: "middle" }}>
                {state.darkTheme === "dark" ? "Dark mode" : "Light mode"}
              </strong>
            </Button>
          </div>

          <div className="theme-account__action">
            <button onClick={handleLogout} className="btn btn-gamma btn--flex">
              <BiLogOut size="1.5rem" />
              &nbsp;&nbsp; Sign out
            </button>
          </div>
        </div>
      </div>

      <ThemeToast />
    </>
  );
}

export default Account;
