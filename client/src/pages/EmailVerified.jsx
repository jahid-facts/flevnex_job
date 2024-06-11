import React, { useEffect } from "react";
import { Container, Paper, Typography, Box } from "@mui/material";
import { Verified } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEmailVerifyQuery } from "../redux/api/authApiSlice";
import toast from "react-hot-toast";
import Loader from "../components/custom/Loader";

const EmailVerified = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const navigate = useNavigate();
  const { data, isSuccess, isError, error, isLoading } =
    useEmailVerifyQuery(token);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.data?.error);
    }
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isError, isSuccess, data, error?.data?.message]);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, [2000]);
    // eslint-disable-next-line
  }, [isError, isSuccess]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: "700px" }}>
        <Box display={"flex"} flexDirection="column" alignItems="center">
          {isSuccess && (
            <Verified sx={{ fontSize: "55px", color: "#198754", mb: 2 }} />
          )}
          {isError && (
            <Verified sx={{ fontSize: "55px", color: "#ff0000", mb: 2 }} />
          )}
          {isSuccess && (
            <h5 className="text-success">Email Verified Successfully!</h5>
          )}
          {isError && (
            <h5 className="text-danger">Email Verified Unsuccessful!</h5>
          )}
          <Typography variant="body1" paragraph align="center">
            You will be redirected to the admin page in 5 seconds...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmailVerified;
