import React from "react";
import Form from "react-bootstrap/Form";

const FormikFormField = ({
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
        isInvalid={name && errors && touched && !!errors[name] && touched[name]}
        isValid={name && errors && touched && touched[name] && !errors[name]}
        type={type || "text"}
        value={value || null}
        placeholder={placeholder || ""}
        onChange={handleChange || null}
        onBlur={handleBlur}
        name={name}
        {...additional}
        style={{
          border: "1px solid #c9c9c9",
          padding: ".375rem .75rem",
          borderRadius: "0.375rem",
        }}
      />
      {name && errors && touched && errors[name] && touched[name] ? (
        <Form.Control.Feedback type="invalid">
          <small>{errors[name]}</small>
        </Form.Control.Feedback>
      ) : (
        <div style={{ height: "24px" }}></div>
      )}
    </Form.Group>
  );
};

export default FormikFormField;
