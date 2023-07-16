import { Typography, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { GlobalContext } from "../../store/context";
import { useStyles } from "./WelcomeCss";

export default function Welcome() {
  let { user } = GlobalContext();
  const [checked, setChecked] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 500);
  }, []);

  return (
    <Box className={classes.WelcomeRoot}>
      <Zoom in={checked}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          className={classes.WelcomeTypography}
        >
          Welcome {user.name.split(" ")[0]}!
        </Typography>
      </Zoom>
    </Box>
  );
}
