import React, { memo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";
import "./CustomDatePicker.css";

const DatePickerField = ({
  value,
  onChange,
  dateFormat = "dd/MM/yyyy",
  className = "",
}) => {
  return (
    <Form.Group controlId="date_field">
      <DatePicker
        className={`form-control ${className}${value && "is-valid"}`}
        selected={value ? new Date(value) : null}
        onChange={onChange}
        dateFormat={dateFormat}
        aria-label={`date_field date picker`}
        isClearable
        placeholderText="Select a date"
      />
    </Form.Group>
  );
};

export default memo(DatePickerField);
