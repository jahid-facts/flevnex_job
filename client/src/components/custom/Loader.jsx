import { Box } from "@mui/material";
import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      width={"100%"}
    >
      <PuffLoader color="#55a155" size={"55px"} />
    </Box>
  );
};

export default Loader;
