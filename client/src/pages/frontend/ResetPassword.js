import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Register.css";
import { Home } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../../redux/api/authApiSlice";
import { BeatLoader } from "react-spinners";

export default function ResetPassword() {
  const togglePassword = (fieldId) => {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");
  const navigate = useNavigate();

  const [resetPassword, { isError, isSuccess, error, data }] =
    useResetPasswordMutation();
  const initialValues = {
    password: "",
    confirm_password: "",
  };
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.error);
    }
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/");
    }
  }, [isError, isSuccess, error, data]);

  const userSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must have at least 6 characters"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);

        const res = await resetPassword({
          token,
          email,
          password: values.password,
          password_confirmation: values.confirm_password,
        });
        resetForm();
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container-fluid mt-0 bodyyyy forgotPass justify-content-center align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-md-4">
          <div className="register-container">
            <div className="register-logo">
              <img src="assets/images/logo3.png" alt="Logo" />
            </div>
            <div className="down-container">
              <div className="d-flex mb-2 justify-content-between">
                <h6>পাসওয়ার্ড পরিবর্তন করুন</h6>
                <Link to="/">
                  {" "}
                  <Home /> হোম পেইজ
                </Link>
              </div>
              <form
                className="register-form  text-start"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="password-container">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="নতুন পাসওয়ার্ড সেট করুন"
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
                  <div className="col-md-12">
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
                            : !errors.confirm_password &&
                              touched.confirm_password
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
                      <small className="text-danger">
                        {errors.confirm_password}
                      </small>
                    ) : (
                      <div style={{ height: "24px" }}></div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  id="submitButton"
                  className="col-md-12"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? "পাঠান" : <BeatLoader color="#fff" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
