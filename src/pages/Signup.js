import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { BsGoogle } from "react-icons/bs";
import { BiLogIn, BiErrorCircle } from "react-icons/bi";

import { MenuActive } from "../components/MenuActive";

import { toast } from "react-toastify";
import { ThemeToast } from "../components/ThemeToast";
import Spinner from "react-bootstrap/Spinner";
import { Helmet } from "react-helmet";

function Signup() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, auth, googleSignin } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUser(email, password);
      setLoading(false);
    } catch (e) {
      const errorMsg = e.message.replace("Firebase: ", "");
      setError(errorMsg);
      displayToastLoginErrorMsg(errorMsg);
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await googleSignin();
    } catch (e) {
      console.log(e);
    }
  };

  const loginErrorMsg = (e) => (
    <div className="toast-c-container">
      <BiErrorCircle size="1.75rem" /> <span>{e}</span>
    </div>
  );
  const displayToastLoginErrorMsg = (e) => {
    toast.error(loginErrorMsg(e));
  };

  return (
    <>
      <MenuActive />
      <Helmet>
        <title>Sign up - Products App</title>
      </Helmet>

      {!auth.currentUser ? (
        <>
          <div className="row">
            <div className="col-md-6 offset-md-3  text-center">
              <h2 className="theme-main-title">Sign up</h2>

              {error ? (
                <Alert variant="danger" className="mb-3">
                  <p className="mb-0">{error}</p>
                </Alert>
              ) : null}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="theme-form-1 mb-4"
              >
                <Form.Group className="theme-form-1__group-1">
                  <FloatingLabel label="Email address" htmlFor="input-email">
                    <Form.Control
                      disabled={loading}
                      autoFocus
                      id="input-email"
                      type="email"
                      placeholder="email@example.com"
                      onChange={(e) => {
                        setError("");
                        setEmail(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="theme-form-1__group-2 mb-3">
                  <FloatingLabel label="Password" htmlFor="input-password">
                    <Form.Control
                      disabled={loading}
                      id="input-password"
                      autoComplete="true"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setError("");
                        setPassword(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>

                <div className="mb-4">
                  <button
                    disabled={loading}
                    className="btn btn-gamma mh btn--flex btn-gamma--lg w-100"
                  >
                    {loading ? (
                      <Spinner animation="grow" size="sm" />
                    ) : (
                      <>
                        <BiLogIn size="1.75rem" />
                        <span>&nbsp;&nbsp; Sign up</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="fs-5 mb-0">
                  Already have an account? <Link to="/signin">Sign in</Link>
                </p>
              </form>

              <div>
                <button
                  type="button"
                  className="btn btn-delta btn--flex btn-delta--lg w-100"
                  onClick={handleGoogleSignUp}
                >
                  <BsGoogle size="1.25rem" />
                  &nbsp;&nbsp; Sign up with Google
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/account" />
      )}
      <ThemeToast />
    </>
  );
}

export default Signup;
