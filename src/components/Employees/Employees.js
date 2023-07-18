import Loader from "../Miscellaneous/Loader";
import { useState, useRef, useEffect } from "react";
import { GlobalContext } from "../../store/context";
import { Container, TextField, Typography } from "@mui/material";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/system";
import "./styles.css";
import classes from './employee.module.css';
const defaultColDef = {
  flex: 1,
  filter: false,
  suppressMenu: true
};


// let userItem = localStorage.getItem("user");
export default function Employees() {
  const { getDataFromDB, loadedData, newBalance, TransactionsInDB, user } =
    GlobalContext();
  const [users, setUsers] = useState([]);
  const [showEmployees, setShowEmployees] = useState(false);
  const searchItemValue = useRef();
  const history = useHistory();

  const GetEmployees = () => {
    const getUsers = getDataFromDB();
    getUsers.then((data) => {
      setUsers(data);
    });

    setShowEmployees(!showEmployees);
  };

  useEffect(() => {
    GetEmployees();
  }, []);

  const searchHandler = (event) => {
    event.preventDefault();
    const searchItem = searchItemValue.current.value;
    const foundItem = loadedData.filter(
      (item) =>
        item.email.includes(searchItem) || item.name.includes(searchItem)
    );
    setUsers(foundItem);
  };

  const updateBalance = (event) => {
    newBalance(event.data);
    let id = event.data.id;
    TransactionsInDB({
      id,
      updatedBy: user.name,
      flow: "credited",
      amount: event.data.balance,
    });
  };

  const gotoEmployeeCard = (event) => {
    history.push({
      pathname: `/users/${event.data.userId}`,
      state: event.data,
    });
  };


  return (
    <Container>
      <Container >
        <Box
          className={classes.employee__head}
        >
          <Typography variant="h3" component="div">
            Users
          </Typography>
        </Box>
        {showEmployees && (
          <form onChange={searchHandler}>
            <TextField
              type="search"
              variant="standard"
              label="Search Employee..."
              inputRef={searchItemValue}
              fullWidth={true}
            />
          </form>
        )}
      </Container>
      {users.length < 0 && (
        <Box>
          <Loader />
        </Box>
      )}

      {showEmployees && (
        <div
          className="ag-theme-material"
          style={{
            height: 500,
            width: '100%',
            margin: "2rem auto",
            scrollX: 'none'
          }}
        >
          <AgGridReact
            headerHeight={32}
            rowData={users}
            onRowDoubleClicked={gotoEmployeeCard}
            suppressRowDrag
            defaultColDef={defaultColDef}
          >
            <AgGridColumn field="userId"></AgGridColumn>
            <AgGridColumn field="name" sortable={true}></AgGridColumn>
            <AgGridColumn
              field="role"
              sortable={true}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn field="email"></AgGridColumn>
            <AgGridColumn
              field="balance"
              editable={true}
              onCellValueChanged={updateBalance}
            ></AgGridColumn>
          </AgGridReact>
        </div>
      )
      }
    </Container >
  );
}
