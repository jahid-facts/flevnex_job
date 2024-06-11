import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import "./Register.css";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../redux/api/authApiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { BeatLoader } from "react-spinners";
import { assets } from "../../assets";

export default function UserRegister({ setIsRegistered, onHide }) {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const captchaInputRef = useRef(null);

  const togglePassword = (fieldId) => {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  };

  const handleCaptchaChange = () => {
    const userCaptchaValue = captchaInputRef.current.value;
    if (validateCaptcha(userCaptchaValue)) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
      toast.error("Invalid CAPTCHA. Please try again.");
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  // form submit
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const initialValues = {
    name: "",
    enname: "",
    email: "",
    password: "",
    confirm_password: "",
    cell: "",
  };

  const userSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    enname: Yup.string().required("Name is required"),
    cell: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 11 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must have at least 6 characters"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
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
    validationSchema: userSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (!isCaptchaValid) {
        toast.error("Please complete the CAPTCHA.");
        return;
      }
      try {
        setSubmitting(true);
        const formData = {
          name: values.name,
          enname: values.enname,
          email: values.email,
          password: values.password,
          cell: "0" + values.cell,
        };
        const response = await register(formData).unwrap();
        setSubmitting(false);
        if (response.success) {
          navigate("/verify-email");
          toast.success(response.message);
          dispatch(setCredentials(response.data));
          resetForm();
          onHide();
        } else {
          console.log(response);
          toast.error(response.message);
          setErrors(handleServerErrors(response.data));
        }
      } catch (err) {
        setSubmitting(false);
        if (err.data && err.data.message) {
          toast.error(err.data.message);
          setErrors(handleServerErrors(err.data.data || {}));
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    },
  });

  const handleServerErrors = (serverErrors) => {
    const errors = {};
    Object.keys(serverErrors).forEach((field) => {
      errors[field] = serverErrors[field].join(", ");
    });
    return errors;
  };

  return (
    <div className="register-container">
      <div className="register-logo">
        <img src={assets.logo} alt="Logo" />
      </div>
      <div className="down-container">
        <div className="d-flex mb-2 justify-content-between">
          <h6>রেজিস্ট্রেশন করুন</h6>
          <Link onClick={() => onHide(false)}>
            <Close />
          </Link>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="row  text-start">
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                placeholder="আপনার পুরো নাম"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                className={`form-control ${
                  errors.name && touched.name
                    ? "is-invalid"
                    : !errors.name && touched.name
                    ? "is-valid"
                    : ""
                }`}
              />
              {errors.name && touched.name ? (
                <small className="text-danger">{errors.name}</small>
              ) : (
                <div style={{ height: "24px" }}></div>
              )}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="enname"
                placeholder="Your Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.enname}
                className={`form-control ${
                  errors.enname && touched.enname
                    ? "is-invalid"
                    : !errors.enname && touched.enname
                    ? "is-valid"
                    : ""
                }`}
              />
              {errors.enname && touched.enname ? (
                <small className="text-danger">{errors.enname}</small>
              ) : (
                <div style={{ height: "24px" }}></div>
              )}
            </div>
            <div className="col-md-6">
              <input
                type="email"
                name="email"
                placeholder="আপনার ইমেইল"
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
            <div className="col-md-6">
              <input
                type="number"
                name="cell"
                placeholder="আপনার ফোন নম্বর "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cell}
                maxLength={11}
                className={`form-control ${
                  errors.cell && touched.cell
                    ? "is-invalid"
                    : !errors.cell && touched.cell
                    ? "is-valid"
                    : ""
                }`}
              />
              {errors.cell && touched.cell ? (
                <small className="text-danger">{errors.cell}</small>
              ) : (
                <div style={{ height: "24px" }}></div>
              )}
            </div>
            <div className="col-md-6">
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
            <div className="col-md-6">
              <div className="password-container">
                <input
                  type="password"
                  name="confirm_password"
                  id="password2"
                  placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirm_password}
                  className={`form-control ${
                    errors.confirm_password && touched.confirm_password
                      ? "is-invalid"
                      : !errors.confirm_password && touched.confirm_password
                      ? "is-valid"
                      : ""
                  }`}
                />
                <span
                  className="show-password"
                  onClick={() => togglePassword("password2")}
                >
                  👁️
                </span>
              </div>
              {errors.confirm_password && touched.confirm_password ? (
                <small className="text-danger">{errors.confirm_password}</small>
              ) : (
                <div style={{ height: "24px" }}></div>
              )}
            </div>
          </div>
          <div>
            <div className="text-center my-3">
              <LoadCanvasTemplate />
            </div>
            <input
              ref={captchaInputRef}
              type="text"
              placeholder="Enter CAPTCHA"
              onBlur={handleCaptchaChange}
              className={`form-control ${isCaptchaValid && "is-valid"}`}
            />
          </div>
          <button
            type="submit"
            id="submitButton"
            className="col-md-12 mt-4"
            disabled={isSubmitting}
          >
            {!isSubmitting ? "সম্পন্ন করুন" : <BeatLoader color="#fff" />}
          </button>
          <div className="mt-3">
            <Link
              onClick={() => setIsRegistered(false)}
              className="register-link mr-2"
            >
              লগইন করতে ক্লিক করুন ( লগইন করুন )
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
