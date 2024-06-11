import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const IconBreadcrumbs = ({ breadcrumbs }) => {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          <Link
            key={index}
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href={breadcrumb.url}
          >
            {breadcrumb.icon &&
              React.createElement(breadcrumb.icon, {
                sx: { mr: 0.5 },
                fontSize: "inherit",
              })}
            {breadcrumb.title}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default IconBreadcrumbs;
