import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
function Loading() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Box>
    </>
  );
}

export default Loading;
