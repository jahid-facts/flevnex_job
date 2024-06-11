import { Box, Typography } from "@mui/material";
import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { assets } from "../assets";

const NotFoundPage = () => {
  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      //   backgroundColor: "#f5f5f5",
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
            src={assets.notFound}
            style={styles.image}
            alt="404 Not Found"
            fluid
          />
          <Typography variant="h5" component="h2" gutterBottom>
            Oops! Page not found
          </Typography>
          <Typography variant="body1" gutterBottom>
            The page you are looking for might have been removed or is
            temporarily unavailable.
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

export default NotFoundPage;
