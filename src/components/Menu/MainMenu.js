import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Popover,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import { GlobalContext } from "../../store/context";
import Loader from "../Miscellaneous/Loader";
import SnackbarBtn from "../Miscellaneous/Snackbar";
import useWidthHook from "../../hooks/WidthHook";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "1rem",
    marginTop: "1rem",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  },
  popover: {
    padding: "0.5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "0.5rem",
  },
  search: {
    width: "100%",
    marginTop: "1rem",
    fontSize: "1.4rem",
    display: "flex",
    flexDirection: "column",
  },
  card__container: {
    display: "grid",
    gridTemplateColumns: (theme) => [theme.breakpoints.down('sm')] ? "repeat(1,1fr)" : "repeat(3,1fr)",
    gap: "1rem",
    marginTop: "1rem",
  },
  sortBy: {
    display: "flex",
    padding: "1rem",
    justifyContent: "space-between",
    alignContent: "baseline"
  }
});

const MainMenu = () => {
  let { GetMainMenuFromDB, TodayMenuToDB, mainmenu } = GlobalContext();
  const [menu, setMenu] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [Item, setItem] = useState({});
  const [sortBy, setSortBy] = useState("strMeal");
  const [sortIn, setSortIn] = useState(false);
  const [alert, setAlertBtn] = useState({ severity: "", message: "" });
  const qtyValue = useRef();


  const { width } = useWidthHook();

  const classes = useStyles();

  useEffect(() => {
    GetMainMenuFromDB().then((list) => {
      if (!list) {
        setAlertBtn({ severity: "error", message: "no items present!" });
      }
      setMenu(list);
    });
  }, []);

  const QtySubmitHandler = (event) => {
    event.preventDefault();
    setItem({ ...Item, quantity: qtyValue.current.value });
    TodayMenuToDB({ ...Item, quantity: qtyValue.current.value });
    closeHandler();
  };

  const ClickHandler = (event, item) => {
    setAnchorEl(event.currentTarget);
    setItem(item);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //SEARCH

  const SortHandler = (event) => {
    setSortIn(!sortIn);

    let sortedMenu;
    if (sortBy === "strMeal") {
      sortedMenu = menu.sort((a, b) => {
        let meal1 = a.strMeal.toLowerCase();
        let meal2 = b.strMeal.toLowerCase();
        if (sortIn) {
          return meal1 > meal2 ? 1 : -1;
        } else {
          return meal1 < meal2 ? 1 : -1;
        }
      });
    } else {
      sortedMenu = menu.sort((a, b) =>
        sortIn ? +b.strPrice - +a.strPrice : +a.strPrice - +b.strPrice
      );
    }
    setMenu(sortedMenu);
  };

  const options = (
    <Box component="form"
    >
      <select
        onChange={(event) => setSortBy(event.currentTarget.value)}
        style={{
          width: "5rem",
          padding: "0.2rem 0rem",
          outline: "none",
          fontFamily: "Quicksand",
          fontSize: "1rem",
          borderRadius: "0.6rem",
          backgroundColor: "#d32f2f",
          color: "white",
        }}
      >
        <option value="strMeal">Meal</option>
        <option value="strPrice">Price</option>
      </select>
      <Button variant="text" onClick={SortHandler}>
        {!sortIn ? "↑" : "↓"}
      </Button>
    </Box>
  );

  const SearchItem = useRef();

  const SearchHandler = () => {
    let search = SearchItem.current.value.toLowerCase();
    let filteredArray = mainmenu.filter((item) =>
      item.strMeal.toLowerCase().includes(search)
    );
    setMenu(filteredArray);
  };



  const search = (
    <Container
      className={classes.search}
    >
      <TextField
        variant="standard"
        label="Search..."
        type="search"
        fullWidth
        onChange={SearchHandler}
        inputRef={SearchItem}
      />
      <Box
        className={classes.sortBy}
      >
        <Typography variant="h6">Sort By:</Typography>
        {options}
      </Box>
    </Container>
  );

  //POPOVER
  const popover = (
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
      <Box
        component="form"
        className={classes.popover}
        onSubmit={QtySubmitHandler}
      >
        <TextField
          variant="outlined"
          size="small"
          type="number"
          label="Quantity"
          autoComplete="off"
          autoFocus={true}
          required
          inputRef={qtyValue}
        />
        <Button type="submit" color="error" variant="contained">
          add
        </Button>
      </Box>
    </Popover>
  );

  const handleClose = () => {
    setAlertBtn(false);
  };

  return (
    <>
      {!menu.length && (
        <SnackbarBtn
          open={open}
          handleClose={handleClose}
          severity={alert.severity}
          message={alert.message}
        />
      )}
      {search}
      {!menu.length && <Loader />}
      {menu && (
        <div>
          <Container>
            <Container
              sx={{
                display: "grid",
                gridTemplateColumns: width < 470 ? "repeat(1,1fr)" : "repeat(3,1fr)",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {menu.map((item) => {
                return (
                  <Card
                    key={item.idMeal}
                    sx={{
                      maxWidth: 345,
                      maxHeight: 350,
                      lineHeight: "2rem",
                      padding: "0.4rem",
                      bgcolor: "text.primary",
                      color: "white",
                      paddingBottom: '0rem'
                    }}
                    elevation={4}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.strMealThumb}
                      alt={item.strMeal}
                    />

                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ textAlign: "center" }}
                      >
                        Item: {item.strMeal}
                      </Typography>
                      <Box className={classes.content}>
                        <Typography variant="p" color="text.common">
                          Price: ₹ {item.strPrice} /-
                        </Typography>
                        <Typography variant="p" color="text.common">
                          Qty: {item.quantity}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        fullWidth
                        onClick={(event) => {
                          ClickHandler(event, item);
                        }}
                      >
                        add-item
                      </Button>
                    </CardContent>
                    {popover}
                  </Card>
                );
              })}
            </Container>
          </Container>
          )
        </div>
      )}
    </>
  );
};

export default MainMenu;
