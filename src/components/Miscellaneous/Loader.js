import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import classes from './misc.module.css';

export default function Loader() {

  return (
    <Box className={classes.loader}>
      <CircularProgress />
    </Box>
  );
}
