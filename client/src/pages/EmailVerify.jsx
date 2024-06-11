import React, { useEffect } from "react";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import { EmailOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useEmailReSendMutation } from "../redux/api/authApiSlice";
import { BeatLoader } from "react-spinners";
import { maskEmail } from "../utils/MaskEmail";
import toast from "react-hot-toast";

function EmailVerify() {
  const email = useSelector((state) => state?.auth?.userInfo?.email);
  const maskedEmail = maskEmail(email);

  const [resendEmail, { isSuccess, isError, isLoading, data, error }] =
    useEmailReSendMutation();
  const handleResendEmail = () => {
    resendEmail();
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isError, isSuccess, data, error?.data?.message]);

  //   if (isLoading) return <Loader />;
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
          <EmailOutlined sx={{ fontSize: "55px", mb: 2 }} />
          <Typography variant="h4" gutterBottom align="center">
            Email Verification
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Thank you for signing up! We've sent an email to your registered
            email address {maskedEmail}. Please click the verification link in
            the email to activate your account.
          </Typography>
          <Button
            onClick={handleResendEmail}
            variant="contained"
            disabled={isLoading}
            color="primary"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {isLoading ? (
              <BeatLoader color="#fff" />
            ) : (
              " Resend Verification Email"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default EmailVerify;
