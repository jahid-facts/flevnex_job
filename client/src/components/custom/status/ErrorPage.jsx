import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { theme } from "../../theme";

function ErrorPage() {
  setTimeout(() => {
    window.location.href = "/fees-reminder-inbox";
  }, [3000]);
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
        style={{ height: "60vh" }}
      >
        <Box textAlign="center">
          <ErrorOutline style={{ fontSize: "4rem", color: "red" }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Payment has been cancelled
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Your payment was not successful. Please try again later.
          </Typography>
          <Link to="/">
            <Button variant="danger">Go to Home</Button>
          </Link>
        </Box>
      </Container>
    </Card>
  );
}

export default ErrorPage;
