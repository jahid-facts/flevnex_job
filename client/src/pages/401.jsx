import { Box, Typography } from "@mui/material";
import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { assets } from "../assets";

const UnauthorizedPage = () => {
  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      textAlign: "center",
      padding: "16px",
    },
    image: {
      width: "100%",
      maxWidth: "400px",
      marginBottom: "16px",
    },
    button: {
      marginTop: "24px",
    },
  };

  return (
    <Box style={styles.root}>
      <Row>
        <Col>
          <Image
            src={assets.unauthorize} // Ensure you have an appropriate image in your assets
            style={styles.image}
            alt="Unauthorized Access"
            fluid
          />
          <Typography variant="h5" component="h2" gutterBottom>
            Unauthorized Access
          </Typography>
          <Typography variant="body1" gutterBottom>
            You do not have permission to view this page.
          </Typography>
          <Link to={"/"}>
            <Button variant="primary" style={styles.button}>
              Go to Homepage
            </Button>
          </Link>
        </Col>
      </Row>
    </Box>
  );
};

export default UnauthorizedPage;
