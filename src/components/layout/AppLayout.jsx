import React, { useState } from "react";

import html2canvas from "html2canvas";
import axios from "axios";
import * as firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import { Box } from "@material-ui/core";

import Sidebar from "./Sidebar";
import Preview from "./Preview";

import "./styles/appLayout.scss";

import firebaseConfig from "../../firebase-config";
firebase.initializeApp(firebaseConfig);

const AppLayout = () => {
  const clientId = "S_hMS1vQlTbpC8qbSKv08Nv6Amz8qzgPd65D7UgL3ZU";

  const [header, setHeader] = useState("Ad Nauseam");
  const [search, setSearch] = useState(null);
  const [adPhoto, setAdPhoto] = useState("");
  const [result, setResult] = useState([]);
  const [bgPosition, setBgPosition] = useState("center");
  var [pageNum, setPageNum] = useState(1);
  const [displayPreview, setDisplayPreview] = useState("");
  const [globalScale, setGlobalScale] = useState(1);
  const [globalOffset, setGlobalOffset] = useState({ x: 0, y: 0 });

  const handleCurrentPhoto = (image) => {
    setAdPhoto(image);
    setBgPosition("center");
  };

  const handleFirebaseUpload = (filename) => {
    firebase
      .storage()
      .ref("test")
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        setAdPhoto(url);
      });
  };

  const handleHeader = (event) => {
    let value = event.target.value;
    setHeader(value);
  };

  const handlePage = (event) => {
    setPageNum(++pageNum);
    getUnsplashPhotos(event, pageNum);
  };

  const handlePhotoSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePosition = () => {
    if (bgPosition === "center") {
      setBgPosition("bottom");
    } else {
      setBgPosition("center");
    }
  };

  const handleGlobalScale = (e, value) => {
    setGlobalScale(value);
  };

  const handleGlobalOffset = (e, v, offset) => {
    setGlobalOffset({ x: offset.x, y: offset.y });
  };

  const getUnsplashPhotos = (event, pageNum) => {
    event.preventDefault();
    const url =
      "https://api.unsplash.com/search/photos?page=" +
      pageNum +
      "&per_page=9&query=" +
      search +
      "&client_id=" +
      clientId;
    axios.get(url).then((response) => {
      setResult(response.data.results);
      if (adPhoto === "") {
        setAdPhoto(response.data.results[0].urls.full);
      }
      setBgPosition("center");
    });
  };

  const saveImage = (event) => {
    event.preventDefault();
    html2canvas(document.querySelector("#facebook_600x600"), {
      allowTaint: true,
    }).then((canvas) => {
      document.body.appendChild(canvas);
    });
  };

  const toggleDisplayPreview = (id) => {
    setDisplayPreview(id);
  };

  const previewProps = {
    adPhoto,
    header,
    displayPreview,
    globalOffset,
    globalScale,
  };

  const sideBarProps = {
    adPhoto,
    bgPosition,
    header,
    result,
    getUnsplashPhotos,
    handleCurrentPhoto,
    handleHeader,
    handlePage,
    handlePhotoSearch,
    handlePosition,
    handleGlobalOffset,
    handleGlobalScale,
    saveImage,
    toggleDisplayPreview,
  };

  return (
    <Box className="appContainer">
      <Sidebar props={sideBarProps} />
      <Box className="searchContainer">
        <FileUploader
          accept="image/*"
          name="image"
          storageRef={firebase.storage().ref("test")}
          onUploadSuccess={(filename) => handleFirebaseUpload(filename)}
        />
        <Preview props={previewProps} />
      </Box>
    </Box>
  );
};

export default AppLayout;
