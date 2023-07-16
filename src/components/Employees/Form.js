import {
  Grid,
  Avatar,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useRef } from "react";
import avatarPic from "../../../src/profilePic.png";
import { GlobalContext } from "../../store/context";

// let userItem = JSON.parse(localStorage.getItem("user"));
const Profile = ({ users }) => {
  const [bal, setBalance] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  let { newBalance, TransactionsInDB } = GlobalContext();

  const submitHandler = (e) => {
    e.preventDefault();
    setBalance(false);
  };

  let { id, userId, balance, email, name, role } = { ...users };

  const updateBalance = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      newBalance({ ...user, balance: event.target.value });
      TransactionsInDB({
        id,
        updatedBy: user.name,
        flow: "credited",
        amount: event.target.value,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, balance: event.target.value })
      );
      setBalance(true);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={4}
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Avatar
          alt="profile pic"
          src={avatarPic}
          sx={{ height: "90%", width: "100%" }}
        />
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">User Profile</Typography>
        <form
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            width: "80%",
            margin: "2rem auto",
          }}
        >
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <TextField
              value={name}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <TextField
              value={email}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Role</FormLabel>
            <TextField
              value={role}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>UserId</FormLabel>
            <TextField
              value={userId}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Balance</FormLabel>
            <TextField
              type="number"
              placeholder={+balance}
              InputProps={{
                readOnly: bal,
              }}
              onDoubleClick={submitHandler}
              onKeyPress={updateBalance}
            />
          </FormGroup>
        </form>
      </Grid>
    </Grid>
  );
};

export default Profile;
