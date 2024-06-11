import { Box, Button, Divider, Popover } from "@mui/material";
import React from "react";

const DropdownMenu = ({
  anchorEl,
  handleMenuClose,
  handleAction,
  actionItems,
}) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Box display={"flex"} flexDirection={"column"} p={1}>
        {actionItems.map((item, index) => (
          <>
            <Button
              key={index}
              sx={{ textTransform: "capitalize" }}
              onClick={() => {
                handleMenuClose();
                handleAction(item.type);
              }}
            >
              {item.type}
            </Button>
            <Divider />
          </>
        ))}
      </Box>
    </Popover>
  );
};
export default DropdownMenu;
