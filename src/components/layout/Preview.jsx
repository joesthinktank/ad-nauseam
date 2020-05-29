import React, { useRef, useState } from "react";

import { Box, Button, Typography } from "@material-ui/core";

import "./styles/ads.scss";
import { ads } from "../content/ads";

import Logo from "../../images/sci-logo.png";

const Preview = ({ props }) => {
  const { adPhoto, header, globalOffset, globalScale } = props;

  const [headerColor, setHeaderColor] = useState("white");

  const cardRect = useRef(null);
  const imgRect = useRef(null);

  const handleColor = (event) => {
    event.preventDefault();
    headerColor === "white" ? setHeaderColor("black") : setHeaderColor("white");
  };

  return (
    <>
      <Button onClick={(event) => handleColor(event)}> Color </Button>

      <Box className="adsContainer">
        {ads.map((ad) => (
          <Box
            key={ad.id}
            id={ad.id}
            ref={cardRect}
            className="adImageDisplay"
            style={{
              width: `${ad.cardSize.dimension.width}px`,
              height: `${ad.cardSize.dimension.height}px`,
            }}
          >
            <Typography variant="h6">{ad.id}</Typography>
            <Box
              className="img"
              style={{
                width: `${ad.cardSize.dimension.width}px`,
                height: `${ad.cardSize.dimension.height}px`,
              }}
            >
              <p
                className="adCopy"
                style={{
                  fontSize: ad.cardSize.font.fontSize,
                  color: headerColor,
                }}
              >
                {header}
              </p>
              <img
                src={Logo}
                alt="test-logo"
                style={{
                  width: `calc(${ad.cardSize.dimension.width}px * .4)`,
                  height: `auto`,
                  position: "absolute",
                  bottom: 0,
                  zIndex: "1000",
                }}
              />
              <img
                ref={imgRect}
                src={adPhoto}
                alt="test"
                style={{
                  objectFit: "cover",
                  transform: `scale(${globalScale}) translate(${globalOffset.x}px, ${globalOffset.y}px)`,
                  width:
                    ad.cardSize.dimension.width / ad.cardSize.dimension.height >
                    1.1
                      ? `100%`
                      : `inherit`,
                  height:
                    ad.cardSize.dimension.width / ad.cardSize.dimension.height >
                    1.1
                      ? `inherit`
                      : `100%`,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Preview;
