import React from "react";
import { Modal, Button } from "react-bootstrap";
import { assets } from "../../../assets";

const ShowPatient = ({ setPatient, onHide, patient, ...props }) => {
  return (
    <Modal
      {...props}
      onHide={() => {
        setPatient(null);
        onHide();
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <span className="fw-bold px-3">Patient Information</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <div className="text-center">
              <div className="pt-2">
                <strong>Name </strong> {patient?.name}
              </div>
              <div className="pt-2">
                <strong>Phone </strong> {patient?.phone}
              </div>
              <div className="pt-2">
                <strong>Age </strong> {patient?.age}
              </div>
              <div className="pt-2">
                <strong>Blood Group </strong> {patient?.blood_group}
              </div>
              <div className="pt-2">
                <strong>Gender </strong> {patient?.gender}
              </div>
              <div className="pt-2">
                <strong>Email </strong> {patient?.email}
              </div>
              <div className="pt-2">
                <strong>Address </strong> {patient?.address}
              </div>
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
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShowPatient;
