import React from "react";
import Form from "react-bootstrap/Form";

const FormikFormFieldMultiple = ({
  value,
  name,
  label,
  errors,
  touched,
  placeholder,
  handleChange,
  handleBlur,
  type,
  additional,
  required,
}) => {
  return (
    <Form.Group controlId={name}>
      {label && (
        <Form.Label>
          {label} {!required && <span className="text-danger fs-6">*</span>}
        </Form.Label>
      )}
      <Form.Control
        isInvalid={!!errors && touched}
        isValid={touched && !errors}
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        {...additional}
      />
      {errors && touched ? (
        <Form.Control.Feedback type="invalid">
          <small>{errors}</small>
        </Form.Control.Feedback>
      ) : (
        <div style={{ height: "24px" }}></div>
      )}
    </Form.Group>
  );
};

export default FormikFormFieldMultiple;
