import {
  Grid,
  Avatar,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useState, useRef } from "react";
import avatarPic from "../../../src/profilePic.png";
import { GlobalContext } from "../../store/context";
import useWidthHook from "../../hooks/WidthHook";
import classes from './employee.module.css';
import styled from "@emotion/styled";


const StyledAvatar = styled(Avatar)({
  height: '90%',
  width: '100%'
});

// let userItem = JSON.parse(localStorage.getItem("user"));
const Profile = ({ users }) => {
  const [bal, setBalance] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  let { newBalance, TransactionsInDB } = GlobalContext();
  const balRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    setBalance(false);
  };

  let { id, userId, balance, email, name, role } = { ...users };
  const { width } = useWidthHook();
  const updateBalance = (event) => {
    event.preventDefault();
    newBalance({ ...users, balance: balRef.current.value }).then(res => {
      TransactionsInDB({
        id,
        updatedBy: user.name,
        flow: "credited",
        amount: balRef.current.value,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, balance: balRef.current.value })
      );
      setBalance(true);
    }).catch(err => console.log('Something went wrong!'));

  };
  return (
    <Grid container spacing={3}>
      <Grid
        item
        md={4}
        xs={12}
      >
        <StyledAvatar
          alt="profile pic"
          src={avatarPic}
        />
      </Grid>
      <Grid
        item
        container
        md={8}
        xs={12}
        justifyContent="center"
      >
        <Typography align="center" variant="h4">User Profile</Typography>
        <form
          className={classes.emp__form}
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
              InputProps={{
                readOnly: bal,
              }}
              placeholder={balance}
              inputRef={balRef}
            />
          </FormGroup>
        </form>
        <div>
          <Button size="small" variant="contained" onClick={submitHandler} >Add Balance</Button>
          &nbsp;
          <Button size="small" variant="contained" onClick={updateBalance} >Submit</Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Profile;
