import React from "react";
import { Modal, Button } from "react-bootstrap";
import { assets } from "../../../assets";

const ShowUser = ({ onHide, user, ...props }) => {
  return (
    <Modal
      {...props}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <span className="fw-bold px-3">ব্যবহারকারীর তথ্য</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <div className="text-center">
              <div className="pt-2">
                <img
                  src={user?.image ? user.image : assets.avatar}
                  alt={user?.name}
                  style={{ height: "120px" }}
                />
              </div>
              <div className="pt-2">
                <strong>নামঃ </strong> {user?.name}
              </div>
              <div className="pt-2">
                <strong>ব্যবহারকারী নামঃ </strong> {user?.role}
              </div>
              <div className="pt-2">
                <strong>ই-মেইলঃ </strong> {user?.email}
              </div>
              <div className="pt-2">
                <strong>মোবাইল নম্বরঃ </strong> {user?.phone}
              </div>
              {user?.signature && (
                <div className="pt-2">
                  <strong>স্বাক্ষর </strong>
                  <img
                    src={user?.signature && user.signature}
                    alt={user?.name}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <hr />
            <div className="text-center">
              <Button
                variant="secondary"
                onClick={onHide}
                style={{ width: "100px" }}
              >
                বাতিল
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShowUser;
