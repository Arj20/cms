import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    typography: "body1",
  },
  TabBorder: {
    borderBottom: 1,
    borderColor: "divider",
  },
  EmployeeRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    margin: "auto",
  },
  EmployeeTable: {
    width: "100%",
    textAlign: "center",
    marginTop: "1rem",
  },
  EmployeeLoader: {
    margin: "auto 5rem",
  },
  EmployeeAgGrid: {
    height: 400,
    width: 1010,
    margin: "2rem auto",
  },
  FormGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  FormAvatar: {
    height: "90%",
    width: "100%",
  },
  FormProfile: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
  },
  FormStyle: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    width: "80%",
    margin: "2rem auto",
  },
  TransactionAgGrid: {
    height: 400,
    width: 810,
    margin: "2rem auto",
  },
});
