import { Popover, TextField, Box, Button, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import MainMenu from "../Menu/MainMenu";
import Today from "../Menu/Today";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
// import PopOver from "./Popover";

export default function PopOver({ pop }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("1");
  const { path, url } = useRouteMatch();

  useEffect(() => {
    setAnchorEl(pop);
  }, []);

  console.log(path, url);

  const closeHandler = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(pop);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {/* <Button variant="contained" onClick={handleClick}>
        Menu
      </Button> */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={closeHandler}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab
            value="1"
            label="main-menu"
            LinkComponent={Link}
            to={`${url}/mainmenu`}
          />
          <Tab
            value="2"
            label="today's-menu"
            LinkComponent={Link}
            to={`${url}/today`}
          />
        </Tabs>
      </Popover>
      <Switch>
        <Route path={`${path}/mainmenu`} exact component={MainMenu} />
        <Route path={`${path}/today`} exact component={Today} />
      </Switch>
    </div>
  );
}
