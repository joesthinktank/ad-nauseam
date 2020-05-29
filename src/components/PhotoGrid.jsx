import React from "react";
import { Box, GridList, GridListTile } from "@material-ui/core";

import "./styles/photoGrid.scss";

const PhotoGrid = ({ handleCurrentPhoto, result }) => {
  return (
    <Box className="photoGrid">
      <GridList cellHeight={200} cols={2}>
        {result.map((photo) => (
          <GridListTile
            className="gridTile"
            key={photo.id}
            onClick={() => handleCurrentPhoto(photo.urls.regular)}
          >
            <img src={photo.urls.small} alt="alt" />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  );
};

export default PhotoGrid;
