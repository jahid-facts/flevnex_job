import React, { memo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";
import "./CustomDatePicker.css";

const FormikDatePicker = ({
  value,
  setFieldValue,
  name,
  label,
  errors,
  touched,
}) => {
  return (
    <Form.Group controlId={name}>
      {label && (
        <Form.Label>
          {label} <span className="text-danger fs-6">*</span>
        </Form.Label>
      )}
      <DatePicker
        className={`form-control ${
          errors && touched && errors[name] && touched[name]
            ? "is-invalid"
            : "is-valid"
        }`}
        selected={value ? new Date(value) : new Date()}
        onChange={(date) =>
          setFieldValue(name, date ? date.toISOString().split("T")[0] : "")
        }
        dateFormat="dd/MM/yyyy"
      />
      {errors && touched && errors[name] && touched[name] ? (
        <small className="text-danger" style={{ fontSize: "12px" }}>
          {errors[name]}
        </small>
      ) : (
        <div style={{ height: "24px" }}></div>
      )}
    </Form.Group>
  );
};

export default memo(FormikDatePicker);
