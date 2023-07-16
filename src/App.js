import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import EmployeeCard from "./components/Employees/EmployeeCard";
import Header from "./components/Welcome/Header";
import Menu from "./components/Menu/Menu";
import EmployeesPage from "./pages/EmployeesPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import WelcomePage from "./pages/WelcomePage";
import { GlobalContext } from "./store/context";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 500,
    fontWeightBold: 900,
  },
  palette: {
    primary: {
      main: "#333333"
    }
  }
});

function App() {
  const { isLoggedIn } = GlobalContext();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route path="/" exact component={SignUpPage} />
          <Route path="/login" exact component={SignInPage} />
          {isLoggedIn && (
            <Route path="/users" exact component={EmployeesPage} />
          )}
          {isLoggedIn && (
            <Route path="/users/:userId" exact component={EmployeeCard} />
          )}

          {isLoggedIn && (
            <Route exact path="/welcome" component={WelcomePage} />
          )}

          {isLoggedIn && <Route path="/menu" component={Menu} />}
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
