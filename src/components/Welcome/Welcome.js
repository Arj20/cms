import { Typography, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { GlobalContext } from "../../store/context";
import classes from './welcome.module.css';
import useWidthHook from "../../hooks/WidthHook";

export default function Welcome() {
  let { user } = GlobalContext();
  const { width } = useWidthHook();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 500);
  }, []);


  return (
    <Box className={classes.welcomeRoot}>
      <Zoom in={checked}>
        <Typography
          variant={width < 470 ? "h4" : "h2"}
          align="center"
          className={classes.welcomeTypography}
        >
          Welcome {user.name.split(" ")[0]}!
        </Typography>
      </Zoom>
    </Box>
  );
}
