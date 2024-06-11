import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { theme } from "../../theme";

function SuccessPage({ data }) {
  setTimeout(() => {
    window.location.href = "/payment-list";
  }, [6000]);
  return (
    <Card
      sx={{
        boxShadow: theme.palette.boxShadow,
        borderRadius: "10px",
        padding: "5px 10px",
        position: "relative",
        width: "100%",
        height: "100%",
        bgcolor: "#ffffff",
        p: 3,
      }}
    >
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: "80vh" }}
      >
        <Box textAlign="center">
          <CheckCircleOutline style={{ fontSize: "4rem", color: "green" }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Success!
          </Typography>

          <Typography variant="h6" component="p" gutterBottom>
            Your operation was completed successfully.
          </Typography>

          <div className="py-2">
            <Card>
              <Card.Body>
                <Card.Text>
                  <strong>Transaction ID:</strong> {data.TransactionId}
                  <br />
                  <strong>Invoice No:</strong> {data.InvoiceNo}
                  <br />
                  <strong>Applicant Name:</strong> {data.ApplicantName}
                  <br />
                  <strong>Invoice Date:</strong> {data.InvoiceDate}
                  <br />
                  <strong>Total Amount:</strong> {data.TotalAmount}
                  <br />
                  <strong>Commission:</strong> {data.Commission}
                  <br />
                  <strong>VAT:</strong> {data.Vat}
                  <br />
                  <strong>Payment Status:</strong> Paid
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <Link to="/">
            <Button variant="success">Go to Home</Button>
          </Link>
        </Box>
      </Container>
    </Card>
  );
}

export default SuccessPage;
