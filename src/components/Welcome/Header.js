import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import { GlobalContext } from "../../store/context";
import useWidthHook from "../../hooks/WidthHook";
import classes from './welcome.module.css';

export default function Header() {
  const history = useHistory();
  const { isLoggedIn, SignOutHandler, user } = GlobalContext();

  const { width } = useWidthHook();

  let JsonUser = user;
  const SignUpHandler = () => {
    history.push("/");
  };

  const SignInHandler = () => {
    history.push("/login");
  };

  const SignOut = () => {
    SignOutHandler();
    history.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense" className={classes.headerToolbar}>
        <Typography
          variant="h6"
          className={classes.headerTypograpghy}
          onClick={() => history.push("/welcome")}
        >
          {width < 470 ? "CMS" : "Canteen Management System"}
        </Typography>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          {!isLoggedIn && (
            <Button variant="string" onClick={SignUpHandler}>
              SignUp
            </Button>
          )}
          {!isLoggedIn && (
            <Button variant="string" onClick={SignInHandler}>
              Login
            </Button>
          )}
          {isLoggedIn && user.role === "admin" && (
            <Button
              variant="string"
              onClick={() => {
                history.push("/menu");
              }}
            >
              menu
            </Button>
          )}
          {isLoggedIn && (
            <Button
              variant="string"
              onClick={() => {
                JsonUser.role === "admin"
                  ? history.push("/users")
                  : history.push(`/users/${JsonUser.userId}`);
              }}
            >
              {JsonUser.role === "admin" ? "Users" : "Profile"}
            </Button>
          )}
          {isLoggedIn && (
            <Button variant="string" onClick={SignOut}>
              Logout
            </Button>
          )}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
