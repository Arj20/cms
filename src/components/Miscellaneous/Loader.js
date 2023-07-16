import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useStyles } from "./MiscellaneousCss";

export default function Loader() {
  const classes = useStyles();

  return (
    <Box className={classes.Loader}>
      <CircularProgress />
    </Box>
  );
}
