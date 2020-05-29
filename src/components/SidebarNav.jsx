import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Button } from "@material-ui/core";

import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import TuneIcon from "@material-ui/icons/Tune";

const useStyles = makeStyles({
  root: {
    color: "#29403c",
    display: "flex",
    height: "90px",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      fontSize: "2.5em",
    },
  },
});

const SidebarNav = ({ handleToggle }) => {
  const classes = useStyles();
  const navItems = [
    {
      id: "search",
      icon: <ImageSearchIcon />,
    },
    {
      id: "ads",
      icon: <PhotoLibraryIcon />,
    },
    {
      id: "editor",
      icon: <TuneIcon />,
    },
  ];

  return (
    <Fragment>
      {navItems.map((item) => (
        <Button
          //   className="navBtn"
          onClick={() => handleToggle(item.id)} // test
        >
          <Box className={classes.root}>{item.icon}</Box>
        </Button>
      ))}
    </Fragment>
  );
};

export default SidebarNav;
