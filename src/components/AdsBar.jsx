import React, { useState, useRef } from "react";
import { Box, Button, Container, Slider, Typography } from "@material-ui/core";

import "./styles/ads.scss";
import { ads } from "./content/ads";

const AdsBar = ({ props }) => {
  const {
    adPhoto,
    header,
    handleGlobalOffset,
    handleGlobalScale,
    saveImage,
    toggleDisplayPreview,
  } = props;

  const [scale, setScale] = useState(1);
  const [sliderX, setSliderX] = useState(10);
  const [sliderY, setSliderY] = useState(10);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const cardRect = useRef(null);
  const imgRect = useRef(null);

  const handleScale = (event, value) => {
    const existCoordinates = { x: translate.x, y: translate.y };
    setTranslate({
      x: 0,
      y: 0,
    });
    setScale(value);
    const cardBoundingBox = cardRect.current.getBoundingClientRect();
    const imgBoundingBox = imgRect.current.getBoundingClientRect();
    const offset = {
      x: cardBoundingBox.left - imgBoundingBox.left,
      y: cardBoundingBox.top - imgBoundingBox.top,
    };
    setSliderX(offset.x / scale);
    setSliderY(offset.y / scale);
    if (existCoordinates.x > offset.x) {
      setTranslate({
        x: offset.x,
        y: existCoordinates.y,
      });
    } else {
      setTranslate({
        x: existCoordinates.x,
        y: existCoordinates.y,
      });
    }
    setSliderX(offset.x / scale);
    setSliderY(offset.y / scale);
    handleGlobalScale(event, value);
  };

  const handleXTransform = (event, value) => {
    const existCoordinates = { x: translate.x, y: translate.y };
    setTranslate({
      x: value,
      y: existCoordinates.y,
    });
    handleGlobalOffset(event, value, {
      x: value,
      y: existCoordinates.y,
    });
  };

  const handleYTransform = (event, value) => {
    const existCoordinates = { x: translate.x, y: translate.y };
    setTranslate({
      x: existCoordinates.x,
      y: value,
    });
    handleGlobalOffset(event, value, {
      x: existCoordinates.x,
      y: value,
    });
  };

  return (
    <Box className="adsContainer">
      <Container>
        <Box py={2} />
        <Typography>Zoom</Typography>
        <Slider
          aria-labelledby="discrete-slider-small-steps"
          step={0.25}
          min={1}
          max={3}
          valueLabelDisplay="on"
          onChange={(event, value) => handleScale(event, value)}
          onChangeCommitted={(event, value) => handleScale(event, value)}
        />

        <Box py={2} />
        <Typography>Move along x-axis</Typography>
        <Slider
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          value={translate.x}
          min={-sliderX}
          max={sliderX}
          valueLabelDisplay="on"
          track={false}
          onChange={(event, value) => handleXTransform(event, value)}
        />

        <Box py={2} />
        <Typography>Move along y-axis</Typography>
        <Slider
          defaultValue={1}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          value={translate.y}
          min={-sliderY}
          max={sliderY}
          valueLabelDisplay="on"
          onChange={(event, value) => handleYTransform(event, value)}
        />
      </Container>
      {ads.map((ad) => (
        <Box
          key={ad.id}
          id={ad.id}
          ref={cardRect}
          className="adImageDisplay"
          onClick={() => toggleDisplayPreview(ad.id)}
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
              style={{ fontSize: ad.cardSize.font.fontSize }}
            >
              {header}
            </p>
            <img
              ref={imgRect}
              src={adPhoto}
              alt="test"
              style={{
                objectFit: "cover",
                transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
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
      <Button onClick={(event) => saveImage(event)}>SAVE</Button>
    </Box>
  );
};

export default AdsBar;
