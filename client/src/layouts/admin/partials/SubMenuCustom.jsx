import React, { useEffect, useState } from "react";
import { SubMenu } from "react-pro-sidebar";
import { useLocation } from "react-router-dom";

export const SubMenuCustom = ({ icon, label, url, children }) => {
  const location = useLocation();
  const activeUrl = url.includes(location.pathname);
  const className = activeUrl ? " bg-secondary bg-opacity-10" : "text-secondary";
  const [open, setOpen] = useState();

  useEffect(() => {
    setOpen(activeUrl);
  }, [activeUrl]);

  return (
    <SubMenu
      label={label}
      open={open}
      onClick={() => setOpen(!open)}
      icon={icon}
      className={className}
    >
      {children}
    </SubMenu>
  );
};
