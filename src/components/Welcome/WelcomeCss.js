import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  HeaderToolbar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "black",
  },
  HeaderTypograpghy: { flexGrow: 1, cursor: "pointer" },
  SignInForm: {
    "& > :not(style)": { m: 1, width: "40ch" },
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    my: 10,
  },
  SignInStack: {
    color: "#1976d2",
  },
  SignInTypography: {
    letterSpacing: 4,
    m: 1,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  WelcomeRoot: {
    margin: "10rem auto",
  },
  WelcomeTypography: {
    letterSpacing: "1rem",
  },
});
