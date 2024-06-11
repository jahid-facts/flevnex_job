import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useChangePasswordMutation } from "../../redux/api/authApiSlice";
export const ChangePassword = () => {
  const [visibility, setVisibility] = useState(true);

  const [changePassword, { isError, isSuccess, error, data }] =
    useChangePasswordMutation();

  const initialValues = {
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  };

  const userSchema = Yup.object({
    old_password: Yup.string()
      .required("Old password is required")
      .min(8, "Old password must have at least 8 characters"),
    new_password: Yup.string()
      .required("New password is required")
      .min(8, "New password must have at least 8 characters"),
    new_password_confirmation: Yup.string()
      .required("New Confirm Password is required")
      .oneOf([Yup.ref("new_password"), null], "New Passwords must match"),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        await changePassword(values);

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
      resetForm();
    }
  }, [isError, isSuccess, error, data]);

  return (
    <Form onSubmit={handleSubmit} className="w-100">
      <div className="py-5">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <Form.Group as={Row} controlId="gas_usage_hours">
                  <Form.Label column sm="12" md="4">
                    Old Password
                    <br />
                  </Form.Label>
                  <Col sm="12" md="8">
                    <InputGroup>
                      <Form.Control
                        isInvalid={
                          !!errors.old_password && touched.old_password
                        }
                        isValid={touched.old_password && !errors.old_password}
                        type={visibility ? "password" : "text"}
                        value={values.old_password}
                        placeholder="Old Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="old_password"
                      />
                      <InputGroup.Text
                        onClick={() => setVisibility(!visibility)}
                      >
                        {visibility ? <Visibility /> : <VisibilityOff />}
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.old_password && touched.old_password ? (
                      <small
                        className="text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        {errors.old_password}
                      </small>
                    ) : (
                      <div style={{ height: "24px" }}></div>
                    )}
                  </Col>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group as={Row} controlId="formGroupConfirmPassword">
                  <Form.Label column sm="12" md="4">
                    New Password
                  </Form.Label>
                  <Col sm="12" md="8">
                    <InputGroup>
                      <Form.Control
                        isValid={touched.new_password && !errors.new_password}
                        isInvalid={
                          !!errors.new_password && touched.new_password
                        }
                        type={visibility ? "password" : "text"}
                        value={values.new_password}
                        placeholder="new Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="new_password"
                      />
                      <InputGroup.Text
                        onClick={() => setVisibility(!visibility)}
                      >
                        {visibility ? <Visibility /> : <VisibilityOff />}
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.new_password && touched.new_password ? (
                      <small
                        className="text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        {errors.new_password}
                      </small>
                    ) : (
                      <div style={{ height: "24px" }}></div>
                    )}
                  </Col>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group as={Row} controlId="formGroupConfirmPassword">
                  <Form.Label column sm="12" md="4">
                    New Confirm Password
                  </Form.Label>
                  <Col sm="12" md="8">
                    <InputGroup>
                      <Form.Control
                        isValid={
                          touched.new_password_confirmation &&
                          !errors.new_password_confirmation
                        }
                        isInvalid={
                          !!errors.new_password_confirmation &&
                          touched.new_password_confirmation
                        }
                        type={visibility ? "password" : "text"}
                        value={values.new_password_confirmation}
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="new_password_confirmation"
                      />
                      <InputGroup.Text
                        onClick={() => setVisibility(!visibility)}
                      >
                        {visibility ? <Visibility /> : <VisibilityOff />}
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.new_password_confirmation &&
                    touched.new_password_confirmation ? (
                      <small
                        className="text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        {errors.new_password_confirmation}
                      </small>
                    ) : (
                      <div style={{ height: "24px" }}></div>
                    )}
                  </Col>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <div className="text-center">
                  <Button
                    disabled={isSubmitting}
                    variant="success"
                    type="submit"
                    className="w-100"
                  >
                    {!isSubmitting ? (
                      "Save changes"
                    ) : (
                      <BeatLoader color="#fff" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </Form>
  );
};
