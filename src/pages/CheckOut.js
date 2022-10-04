import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

import Form from "react-bootstrap/Form";
import SumTotalOrder from "../utils/SumTotalOrder";
import Badge from "react-bootstrap/Badge";
import { MenuActive } from "../components/MenuActive";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { HiCurrencyDollar } from "react-icons/hi";
import { MdOutlineShoppingCart, MdWarningAmber } from "react-icons/md";

function CheckOut() {
  const { state } = useContext(AppContext);
  const sumTotal = SumTotalOrder(state.cart);

  const form = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const data2 = {
      name: formData.get("name"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      address: formData.get("address"),
      address2: formData.get("address2"),
      country: formData.get("country"),
      state: formData.get("state"),
      zip: formData.get("zip"),
    };
    navigate("/checkout-success", { state: { data: data2 } });
  };

  return (
    <>
      <MenuActive page="menu-cart" />
      <Helmet>
        <title>Checkout - Products App</title>
      </Helmet>
      <h2 className="theme-main-title">Checkout</h2>

      {state.cart.length > 0 ? (
        <>
          <div className="row gy-5">
            <div className="col-md-5 order-md-last">
              <h3 className="theme-main-title-2 theme-checkout__title">
                <span>Your cart</span>
                <Badge pill bg="danger">
                  {state.cart.length}
                </Badge>
              </h3>

              <ul className="list-group mb-0">
                {state.cart.map((item, index) => (
                  <li
                    className="list-group-item theme-checkout__item"
                    key={index}
                    index={index}
                  >
                    <div>
                      <h6 className="my-0">{item.title}</h6>
                    </div>
                    <span>$ {item.price}</span>
                  </li>
                ))}

                <li className="list-group-item d-flex justify-content-between theme-checkout__total__inner">
                  <strong>Total:</strong>
                  <strong>
                    <HiCurrencyDollar size="1.75rem" />
                    &nbsp;
                    {sumTotal}
                  </strong>
                </li>
              </ul>
            </div>

            <div className="col-md-7">
              <h3 className="theme-main-title-2">Billing address</h3>

              <Form
                ref={form}
                className="theme-checkout-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      autoFocus
                      type="text"
                      id="firstName"
                      placeholder=""
                      className={
                        errors.name ? "form-control is-invalid" : "form-control"
                      }
                      {...register("name", { required: true })}
                    />
                    <div className="invalid-feedback">
                      {errors.name?.type === "required" && (
                        <span>Valid first name is required</span>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder=""
                      className={
                        errors.lastname
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      {...register("lastname", { required: true })}
                    />
                    <div className="invalid-feedback">
                      {errors.lastname?.type === "required" && (
                        <span>Valid last name is required</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      className={
                        errors.email
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      {...register("email", {
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.email?.type === "required" && (
                        <span>Email is required</span>
                      )}
                      {errors.email?.type === "pattern" && (
                        <span>Invalid email</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      placeholder="1234 Main St"
                      className={
                        errors.address
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      {...register("address", { required: true })}
                    />
                    <div className="invalid-feedback">
                      {errors.address?.type === "required" && (
                        <span>Please enter your shipping address</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="address2" className="form-label">
                      Address 2 <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                      placeholder="Apartment or suite"
                      name="address2"
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <select
                      id="country"
                      className={
                        errors.country
                          ? "form-select is-invalid"
                          : "form-select"
                      }
                      {...register("country", { required: true })}
                    >
                      <option value="">Choose...</option>
                      <option>United States</option>
                    </select>
                    <div className="invalid-feedback">
                      {errors.country?.type === "required" && (
                        <span>Please select a valid country</span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <select
                      id="state"
                      className={
                        errors.state ? "form-select is-invalid" : "form-select"
                      }
                      {...register("state", { required: true })}
                    >
                      <option value="">Choose...</option>
                      <option>California</option>
                    </select>
                    <div className="invalid-feedback">
                      {errors.state?.type === "required" && (
                        <span>Please provide a valid state</span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      id="zip"
                      placeholder=""
                      className={
                        errors.zip ? "form-control is-invalid" : "form-control"
                      }
                      {...register("zip", { required: true })}
                    />
                    <div className="invalid-feedback">
                      {errors.zip?.type === "required" && (
                        <span>Zip code required</span>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mb-4" />

                <div>
                  <button className="btn btn-gamma btn--flex btn-gamma--lg w-100">
                    <MdOutlineShoppingCart size="1.75rem" />
                    &nbsp;&nbsp; Continue to checkout
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-secondary theme-alert" role="alert">
          <div>
            <MdWarningAmber size="1.6rem" />
          </div>

          <div>
            <p className="mb-0">No items in cart</p>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckOut;
