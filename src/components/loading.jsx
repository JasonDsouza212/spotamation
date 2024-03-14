import React, { useEffect, useState, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export default function loading() {
  return (
    <div className="loading">
      <CircularProgress color="inherit" />
    </div>
  );
}
