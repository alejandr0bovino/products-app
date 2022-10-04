import React, { useState, useRef, useEffect } from "react";
import { MenuActive } from "../components/MenuActive";
import emailjs from "@emailjs/browser";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { BiErrorCircle, BiEnvelope, BiMailSend } from "react-icons/bi";
import { Helmet } from "react-helmet";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import { ThemeToast } from "../components/ThemeToast";
import { useForm } from "react-hook-form";

function Contact() {
  const form = useRef();

  const [loading, setLoading] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const errorMsg = (e) => (
    <div className="toast-c-container">
      <BiErrorCircle size="1.75rem" /> <span>{e}</span>
    </div>
  );
  const displayErrorMsg = (e) => {
    toast.error(errorMsg(e));
  };

  const toastSuccessfullySentMsg = () => (
    <div className="toast-c-container">
      <FaCheck size="1.25rem" /> <span>Successfully sent message</span>
    </div>
  );
  const displayToastSuccessfullySentMsg = () => {
    toast.success(toastSuccessfullySentMsg);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          setLoading(false);
          e.target.reset();
          displayToastSuccessfullySentMsg();
          setShowSuccessMsg(true);
        },
        (error) => {
          setLoading(false);
          displayErrorMsg(error.text);
        }
      );
  };

  return (
    <>
      <MenuActive page="menu-contact" />
      <Helmet>
        <title>Contact - Products App</title>
      </Helmet>

      <h2 className="theme-main-title">Contact</h2>

      <div className="row gy-5">
        <div className="col-md-7">
          {showSuccessMsg ? (
            <h3 className="theme-thank-you theme-thank-you--2">
              <BsCheckCircleFill />
              &nbsp; Thank you
            </h3>
          ) : (
            <>
              <form ref={form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-floating mb-3">
                  <input
                    autoFocus
                    disabled={loading}
                    type="text"
                    id="floatingInputName"
                    className={
                      errors.to_name
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    placeholder="Name"
                    {...register("to_name", { required: true })}
                  />
                  <label htmlFor="floatingInputName">Name</label>

                  <div className="invalid-feedback">
                    {errors.to_name?.type === "required" && (
                      <span>This field is required</span>
                    )}
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    disabled={loading}
                    className={
                      errors.from_name
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="floatingInputEmail"
                    placeholder="name@example.com"
                    {...register("from_name", {
                      required: true,
                      pattern: /\S+@\S+\.\S+/,
                    })}
                  />
                  <label htmlFor="floatingInputEmail">Email address</label>

                  <div className="invalid-feedback">
                    {errors.from_name?.type === "required" && (
                      <span>This field is required</span>
                    )}
                    {errors.from_name?.type === "pattern" && (
                      <span>Invalid email</span>
                    )}
                  </div>
                </div>

                <div className="form-floating mb-4">
                  <textarea
                    as="textarea"
                    rows="6"
                    disabled={loading}
                    className={
                      errors.message
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="floatingInputMsg"
                    placeholder="Message"
                    {...register("message", { required: true, minLength: 10 })}
                  />
                  <label htmlFor="floatingInputMsg">Message</label>

                  <div className="invalid-feedback">
                    {errors.message?.type === "required" && (
                      <span>This field is required</span>
                    )}
                    {errors.message?.type === "minLength" && (
                      <span>Min 10</span>
                    )}
                  </div>
                </div>

                <hr className="mb-4" />

                <div>
                  <button
                    className="btn btn-gamma mh btn--flex btn-gamma--lg w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="grow" size="sm" />
                    ) : (
                      <>
                        <BiMailSend size="1.75rem" />
                        &nbsp;&nbsp; Send
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        <div className="col-md-5">
          <div className="mb-3 pb-3 border-bottom">
            <IoLocationOutline size="2rem" />
            <span className="d-block">Montevideo, Uruguay </span>
          </div>

          <div className="pb-3">
            &nbsp;
            <BiEnvelope size="1.75rem" />
            <span className="d-block">email@example.com </span>
          </div>
        </div>
      </div>

      <ThemeToast />
    </>
  );
}

export default Contact;
