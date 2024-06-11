import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { Close } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { BeatLoader } from "react-spinners";
import { assets } from "../../assets";

export default function Login({ setIsRegistered, onHide }) {
  const togglePassword = (fieldId) => {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isError, isSuccess, error, data }] = useLoginMutation();

  const initialValues = {
    email: "",
    password: "",
  };

  const userLoginSchema = Yup.object({
    email: Yup.string("ই-মেইল অথবা মোবাইল নম্বর").required(
      "ই-মেইল অথবা মোবাইল নম্বর"
    ),
    password: Yup.string()
      .required("পাসওয়ার্ড সেট করুন")
      .min(6, "কম্পক্ষে পাসওয়ার্ড ৬ ডিজিতট সেট করুন"),
  });

  const {
    resetForm,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: userLoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        await login({
          email: values.email,
          password: values.password,
        });
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
      dispatch(setCredentials(data?.data));
      resetForm();
      onHide();
      navigate("/");
    }
    // eslint-disabled-next-line
  }, [isError, isSuccess]);

  return (
    <div className="register-container">
      <div className="register-logo">
        <img src={assets.logo} alt="Logo" />
      </div>
      <div className="down-container">
        <div className="d-flex mb-2 justify-content-between">
          <h6>লগইন করুন</h6>
          <Link onClick={() => onHide(false)}>
            <Close />
          </Link>
        </div>
        <form className="register-form text-start" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <input
                type="text"
                name="email"
                placeholder="আপনার ইমেইল  অথবা মোবাইল নম্বর"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                className={`form-control ${
                  errors.email && touched.email
                    ? "is-invalid"
                    : !errors.email && touched.email
                    ? "is-valid"
                    : ""
                }`}
              />
              {errors.email && touched.email ? (
                <small className="text-danger">{errors.email}</small>
              ) : (
                <div style={{ height: "24px" }}></div>
              )}
            </div>

            <div className="col-md-12">
              <div className="password-container">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="পাসওয়ার্ড সেট করুন"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  className={`form-control ${
                    errors.password && touched.password
                      ? "is-invalid"
                      : !errors.password && touched.password
                      ? "is-valid"
                      : ""
                  }`}
                />
                <span
                  className="show-password"
                  onClick={() => togglePassword("password")}
                >
                  👁️
                </span>
              </div>
              {errors.password && touched.password ? (
                <small className="text-danger">{errors.password}</small>
              ) : (
                <div style={{ height: "24px" }}></div>
              )}
            </div>
          </div>
          <button type="submit" className="col-md-12" disabled={isSubmitting}>
            {!isSubmitting ? "লগইন করুন" : <BeatLoader color="#fff" />}
          </button>
          <div className="d-flex mt-2 justify-content-between">
            <Link
              onClick={() => setIsRegistered(true)}
              className="register-link mr-2 pointer"
            >
              রেজিস্ট্রেশন করুন
            </Link>
            <Link
              to="/forgot-password"
              onClick={onHide}
              className="forgot-password"
            >
              পাসওয়ার্ড ভুলে গেছেন ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
