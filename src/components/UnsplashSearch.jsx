import React from "react";

import { Box, Button, IconButton, InputBase } from "@material-ui/core";

import PhotoGrid from "../components/PhotoGrid";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";

const UnsplashSearch = ({ props }) => {
  const {
    getUnsplashPhotos,
    handleCurrentPhoto,
    handlePage,
    handlePhotoSearch,
    result,
  } = props;

  return (
    <Box className="searchContainer">
      <Box component="form" className="searchBar" my={6}>
        <IconButton onClick={getUnsplashPhotos} type="submit">
          <ImageSearchIcon />
        </IconButton>
        <InputBase
          className="searchBar"
          onChange={handlePhotoSearch}
          type="input"
          name="search"
          placeholder="Search Photos"
        />
      </Box>

      <PhotoGrid result={result} handleCurrentPhoto={handleCurrentPhoto} />
      <Button onClick={handlePage} type="submit">
        Next
      </Button>
    </Box>
  );
};

export default UnsplashSearch;
