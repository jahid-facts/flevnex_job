import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { Home } from "@mui/icons-material";
import { useFormik } from "formik";
import { useForgotPasswordMutation } from "../../redux/api/authApiSlice";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

export default function ForgotPassword() {
  const [forgotPassword, { isError, isSuccess, error, data }] =
    useForgotPasswordMutation();
  const initialValues = {
    email: "",
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || error?.data?.error);
    }
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isError, isSuccess, error, data]);

  const userSchema = Yup.object({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
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

        await forgotPassword({
          email: values.email,
        });
        resetForm();
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container-fluid mt-0 bodyyyy forgotPass d-flex justify-content-center align-items-center">
      <div className="row justify-content-center w-100 ">
        <div className="col-md-4">
          <div className="register-container">
            <div className="register-logo">
              <img src="assets/images/logo3.png" alt="Logo" />
            </div>
            <div className="down-container">
              <div className="d-flex mb-2 justify-content-between">
                <h6>পাসওয়ার্ড ভুলে গেছেন?</h6>
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
                </div>
                <button
                  type="submit"
                  id="submitButton"
                  className="col-md-12"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    "রিসেট লিংক পাঠান"
                  ) : (
                    <BeatLoader color="#fff" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
