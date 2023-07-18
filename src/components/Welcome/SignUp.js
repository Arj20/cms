import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { GlobalContext } from "../../store/context";
import { useRef, useState } from "react";
import SnackbarBtn from "../Miscellaneous/Snackbar";
import { useHistory } from "react-router-dom";
import classes from './welcome.module.css';

export default function FormStack() {
  let { SignUpHandler } = GlobalContext();
  const [sev, setSeverity] = useState({ severity: "error", message: "" });
  const [open, setOpen] = useState(false);
  const history = useHistory();
  let EmailValue = useRef();
  let PasswordValue = useRef();
  let FirstNameValue = useRef();
  let LastNameValue = useRef();

  const HandleSignUp = (event) => {
    event.preventDefault();
    let email = EmailValue.current.value;
    let password = PasswordValue.current.value;
    let first = FirstNameValue.current.value;
    let last = LastNameValue.current.value;
    if (!email || !password || !first || !last) {
      setOpen(true);
      setSeverity({ severity: "error", message: "all fields are mandatory!" });
      return;
    }
    const isValidUser =
      email.split("@")[1].startsWith("employee") ||
      email.split("@")[1].startsWith("admin");
    if (!isValidUser) {
      setOpen(true);
      setSeverity({
        severity: "error",
        message:
          "invalid domain name, domain should be either @admin or @employee",
      });
      return;
    }
    SignUpHandler(
      email.toLowerCase().trim(),
      password,
      first.trim(),
      last.trim()
    )
      .then((x) => {
        setOpen(true);
        if (!x) {
          setSeverity({
            severity: "error",
            message:
              "something went wrong, please try with a different email!!",
          });
          return;
        } else {
          setSeverity({
            severity: "info",
            message: `user created, Welcome ${first}`,
          });
          EmailValue.current.value =
            PasswordValue.current.value =
            FirstNameValue.current.value =
            LastNameValue.current.value =
            "";
          setTimeout(() => {
            history.push("/login");
          }, 2800);
        }
      })
      .catch((err) => {
        setOpen(true);
        setSeverity({
          severity: "error",
          message: "something went wrong, please try with a different email!!",
        });
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
    >
      <Stack spacing={2}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          className={classes.signInTypography}
        >
          Sign Up
        </Typography>
        <Box className={classes.name__box}>
          <TextField type="text" label="First" inputRef={FirstNameValue}>
            First
          </TextField>
          <TextField type="text" label="Last" inputRef={LastNameValue}>
            Last
          </TextField>
        </Box>
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
        <Button variant="contained" color="error" onClick={HandleSignUp}>
          Create User
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
