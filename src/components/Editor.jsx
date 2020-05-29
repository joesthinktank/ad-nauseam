import React from "react";
import { Box, IconButton, InputBase, Typography } from "@material-ui/core";

import "./styles/ads.scss";

import TextFieldsIcon from "@material-ui/icons/TextFields";

const Editor = ({ props }) => {
  const { handleHeader, header } = props;
  return (
    <Box>
      <Typography variant="h6">Header</Typography>
      <Box className="searchBar">
        <IconButton>
          <TextFieldsIcon />
        </IconButton>
        <InputBase
          className="searchBar"
          onChange={handleHeader}
          type="input"
          name="header"
          placeholder={header}
        />
      </Box>
    </Box>
  );
};

export default Editor;
