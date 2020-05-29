import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box } from "@material-ui/core";

import "./styles/sidebar.scss";
import AdsBar from "../AdsBar";
import Editor from "../Editor";
import UnsplashSearch from "../UnsplashSearch";
import SidebarNav from "../SidebarNav";

const useStyles = makeStyles({
  sidebar: {
    display: "flex",
  },
  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    width: "80px",
    background: "#3E736A",
  },
  sidebarContents: {
    background: "rgba(122, 191, 179, .4)",
    height: "100vh",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "initial",
    overflowY: "scroll",
  },
});

const Sidebar = ({ props }) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState("");

  const handleToggle = (componentId) => {
    setIsVisible(componentId);
  };

  return (
    <Box id="sidebar">
      <Box id="sidebarNav">
        <SidebarNav handleToggle={handleToggle} />
      </Box>
      <Box id="sidebarContents" className={classes.sidebarContents}>
        {isVisible === "ads" && <AdsBar props={props} />}
        {isVisible === "search" && <UnsplashSearch props={props} />}
        {isVisible === "editor" && <Editor props={props} />}
      </Box>
    </Box>
  );
};

export default Sidebar;
