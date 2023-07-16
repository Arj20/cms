import {
  Typography,
  Box,
  Button,
  ButtonGroup,
  Container,
} from "@mui/material";
import MainMenu from "./MainMenu";
import Today from "./Today";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Images from "../Miscellaneous/ImageMasonary";
import { useStyles } from "./MenuCss.js";

let user = JSON.parse(localStorage.getItem("user"));
export default function Menu(props) {
  const { path, url } = useRouteMatch();

  const classes = useStyles();

  return (
    <>
      <Container className={classes.MenuContainer}>
        <Box className={classes.MenuTabs}>
          <Typography variant="h4" component="h2" align="left">
            {props.location.pathname.includes("/main-menu")
              ? "Main-Menu"
              : props.location.pathname.includes("/today-menu")
                ? "Today's-Menu"
                : "Menu"}
          </Typography>
          <ButtonGroup>
            {user?.role === "admin" && (
              <Button
                color="error"
                variant="contained"
                size="small"
                onClick={() => {
                  props.history.push(`${url}/main-menu`);
                }}
              >
                main-menu
              </Button>
            )}
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={() => {
                props.history.push(`${url}/today-menu`);
              }}
            >
              today's menu
            </Button>
          </ButtonGroup>
        </Box>
        {!props.location.pathname.includes("/main-menu") &&
          !props.location.pathname.includes("/today-menu") && <Images />}
      </Container>
      <Switch>
        <Route exact path={`${path}/main-menu`} component={MainMenu} />
        <Route exact path={`${path}/today-menu`} component={Today} />
      </Switch>
    </>
  );
}
