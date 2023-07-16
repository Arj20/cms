import { useEffect, useState } from "react";
import { GlobalContext } from "../../store/context";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Profile from "./Form";
import Transactions from "./Transactions";
import Today from "../Menu/Today";
import { useLocation } from "react-router-dom";
import { useStyles } from "./EmployeesCss";

export default function EmployeeCard() {
  const { user } = GlobalContext();
  const [userprofile, setUserProfile] = useState();
  const [value, setValue] = useState("1");
  const { state } = useLocation();
  useEffect(() => {
    if (user.role === "admin") {
      setUserProfile(state);
    } else {
      setUserProfile(user);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={useStyles.root}>
      <TabContext value={value}>
        <Box className={useStyles.TabBorder}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs"
            variant="fullWidth"
            indicatedColor="text.primary"
          >
            <Tab label="User Profile" value="1" />
            <Tab label="Menu" value="2" />

            <Tab label="Transaction" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Profile users={userprofile} />
        </TabPanel>
        <TabPanel value="3">
          <Transactions user={userprofile} />
        </TabPanel>
        <TabPanel value="2">
          <Today user={userprofile} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
