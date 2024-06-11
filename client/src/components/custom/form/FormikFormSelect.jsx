import React from "react";
import Form from "react-bootstrap/Form";

const FormikFormSelect = ({
  value,
  name,
  label,
  errors,
  touched,
  placeholder,
  options,
  handleChange,
  handleBlur,
  additional,
  required,
}) => {
  const data = options || [];
  return (
    <Form.Group controlId={name}>
      {label && (
        <Form.Label>
          {label} {!required && <span className="text-danger fs-6">*</span>}
        </Form.Label>
      )}
      <Form.Select
        aria-label={label}
        isInvalid={!!errors[name] && touched[name]}
        isValid={touched[name] && !errors[name]}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        {...additional}
      >
        <option value="">{placeholder}</option>
        {data.map((option, index) => (
          <option
            key={index}
            value={option.value}
            selected={option.id === value}
          >
            {option.label}
          </option>
        ))}
      </Form.Select>
      {errors[name] && touched[name] ? (
        <Form.Control.Feedback type="invalid">
          <small>{errors[name]}</small>
        </Form.Control.Feedback>
      ) : (
        <div style={{ height: "24px" }}></div>
      )}
    </Form.Group>
  );
};

export default FormikFormSelect;
