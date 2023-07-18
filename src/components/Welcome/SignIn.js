import { Stack, Typography, TextField, Button, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../store/context";
import { useHistory } from "react-router-dom";
import SnackbarBtn from "../Miscellaneous/Snackbar";
import classes from './welcome.module.css';
export default function FormStack() {
  let { SignInHandler, isLoggedIn } = GlobalContext();
  const history = useHistory();
  const [sev, setSeverity] = useState({ severity: "error", message: "" });
  let EmailValue = useRef();
  let PasswordValue = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setOpen(true);
      setSeverity({ severity: "info", message: "Welcome!" });
      history.replace("/welcome");
    }
  }, [history, isLoggedIn]);

  const HandleSignIn = (event) => {
    event.preventDefault();
    let email = EmailValue.current.value;
    let password = PasswordValue.current.value;

    if (!email || !password) {
      setOpen(true);
      setSeverity({ severity: "error", message: "All fields are mandatory!" });
      return;
    }

    SignInHandler(email.toLowerCase().trim(), password).then((x) => {
      if (!x) {
        setOpen(true);
        setSeverity({
          severity: "error",
          message: "Invalid Credentials, Please try Again!!",
        });
        return;
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "40ch" },
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
        my: 10,
      }}
      noValidate
      autoComplete="off"
      onSubmit={HandleSignIn}
    >
      <Stack spacing={2}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          className={classes.signInTypography}
        >
          Sign In
        </Typography>
        <TextField
          type="email"
          fullWidth
          label="Email"
          id="email"
          inputRef={EmailValue}
        />
        <TextField
          type="password"
          fullWidth
          label="Password"
          id="password"
          inputRef={PasswordValue}
        />
        <Button type="submit" color="error" variant="contained">
          Sign In
        </Button>
        <SnackbarBtn
          severity={sev.severity}
          open={open}
          handleClose={handleClose}
          message={sev.message}
        />
      </Stack>
    </Box>
  );
}
