import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Login from "../../pages/frontend/Login";
import UserRegister from "../../pages/frontend/Register";

const LoginRegister = ({ onHide, ...props }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <Modal
      {...props}
      onHide={onHide}
      size={isRegistered ? "lg" : "md" }
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {isRegistered ? (
        <UserRegister setIsRegistered={setIsRegistered} onHide={onHide} />
      ) : (
        <Login setIsRegistered={setIsRegistered} onHide={onHide} />
      )}
    </Modal>
  );
};

export default LoginRegister;
