import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Modal,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ButtonGroup,
  Divider,
  Badge,
  TextField,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState, useRef } from "react";
import { GlobalContext } from "../../store/context";
import SnackbarBtn from "../Miscellaneous/Snackbar";
import { useLocation } from "react-router-dom";
import classes from './menu.module.css';

import useWidthHook from "../../hooks/WidthHook";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: '70%',
  minWidth: 320,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

let options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const getdate = new Date();
const date = getdate.toLocaleString("en-US", options);
let userItem = JSON.parse(localStorage.getItem("user"));

export default function Today({ user }) {
  const [Cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState("strMeal");
  const [sortIn, setSortIn] = useState(false);

  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [opensnack, setOpenSnack] = useState(false);
  const { pathname } = useLocation();

  let {
    getTodayMenuFromDB,
    loadedMenuData,
    TransactionsInDB,
    UpdateTodaysMenu,
    newBalance,
  } = GlobalContext();

  const [menu, setMenu] = useState(loadedMenuData);

  useEffect(() => {
    getTodayMenuFromDB().then((list) => setMenu(list));
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //SEARCH

  const sortHandler = (event) => {
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
    <Box component="form">
      <select
        onChange={(event) => setSortBy(event.currentTarget.value)}
        className={classes.select}
      >
        <option value="strMeal">Meal</option>
        <option value="strPrice">Price</option>
      </select>
      <Button variant="text" onClick={sortHandler} color="error">
        {!sortIn ? "↑" : "↓"}
      </Button>
    </Box>
  );

  const SearchItem = useRef();

  const SearchHandler = () => {
    let search = SearchItem.current.value.toLowerCase();
    let filteredArray = loadedMenuData.filter((item) =>
      item.strMeal.toLowerCase().includes(search)
    );
    setMenu(filteredArray);
  };

  const search = (
    <Container className={classes.todayContainer}>
      <TextField
        variant="standard"
        label="Search..."
        type="search"
        fullWidth
        onChange={SearchHandler}
        inputRef={SearchItem}
      />
      <Box className={classes.todaySort}>
        <Typography variant="h6">Sort By:</Typography>
        {options}
      </Box>
    </Container>
  );

  const handleClick = () => {
    if (+user?.balance >= total) {
      menu.forEach((menu) => {
        let found = Cart.find((cart) => cart.idMeal === menu.idMeal);
        if (found) {
          UpdateTodaysMenu({
            ...found,
            quantity: +found.quantity - +found.qty,
            balance: +user?.balance - +total,
          });
          newBalance({ ...user, balance: +user?.balance - +total });
        }
      });
      handleClose();
      setOpenSnack(true);
      let id = user.id;
      TransactionsInDB({
        id,
        updatedBy: userItem.name,
        flow: "debited",
        amount: total,
      });
      setCart([]);
    } else {
      alert("Not enough money to buy food!! 😢");
    }
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const AddToCartItem = (item) => {
    const exist = Cart.find((cart) => cart.idMeal === item.idMeal);
    if (!exist) {
      setCart([...Cart, item]);
      UpdateTotal([...Cart, item]);
    } else {
      increamentHandler(item.idMeal);
    }
  };

  const increamentHandler = (id) => {
    let newCart = [];

    let exist = Cart.find((cart) => cart.idMeal === id);
    if (!exist) {
      newCart = [...Cart, { ...exist, qty: 1, totalPrice: +exist.strPrice }];
    } else {
      if (exist.quantity >= exist.qty + 1) {
        newCart = Cart.map((cart) =>
          cart.idMeal === id
            ? {
              ...cart,
              qty: cart.qty + 1,
              totalPrice: +cart.strPrice * (cart.qty + 1),
            }
            : cart
        );
      } else {
        newCart = Cart;
        alert("no more item left");
      }
    }
    setCart(newCart);
    UpdateTotal(newCart);
  };

  const decreamentHandler = (id) => {
    let newCart = [];
    const exist = Cart.find((cart) => cart.idMeal === id);
    if (exist.qty === 1) {
      newCart = Cart.filter((cart) => cart.idMeal !== id);
      setCart(newCart);
    } else {
      newCart = Cart.map((cart) =>
        cart.idMeal === id
          ? {
            ...cart,
            qty: cart.qty - 1,
            totalPrice: cart.strPrice * (cart.qty - 1),
          }
          : cart
      );
      setCart(newCart);
    }
    UpdateTotal(newCart);
  };


  const { width } = useWidthHook();


  const UpdateTotal = (newCart) => {
    let totalSum = newCart.reduce((acc, cart) => cart.totalPrice + acc, 0);
    setTotal(totalSum);
  };

  const CartModal = (
    <div>
      <Badge badgeContent={Cart.length} color="error">
        <Button
          variant="contained"
          size="small"
          onClick={handleOpen}
          color="error"
        >
          <AddShoppingCartIcon /> &nbsp; Cart
        </Button>
      </Badge>{" "}
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.cart}>
          <Typography variant="h4" component="h2" textAlign="center" >
            Cart
          </Typography>
          <Divider variant="inset" fullWidth />

          {!Cart.length && (
            <Typography variant="h4" align="center">
              Cart is Empty!
            </Typography>
          )}
          {Cart.length > 0 && (
            <div>
              <List sx={{ width: "100%", bgcolor: "inherit" }}>
                {Cart.map((cart) => {
                  return (
                    <ListItem
                      disableGutters
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar alt={cart.strMeal} src={cart.strMealThumb} />
                        </ListItemAvatar>
                        <ListItemText primary={`Price: ₹${cart.totalPrice}`} />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <ListItemText primary={`x: ${cart.qty}`} />
                        <ButtonGroup>
                          <Button
                            color="error"
                            variant="contained"
                            size="small"
                            onClick={() => increamentHandler(cart.idMeal)}
                          >
                            +
                          </Button>
                          <Button
                            color="error"
                            variant="contained"
                            size="small"
                            onClick={() => decreamentHandler(cart.idMeal)}
                          >
                            -
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
              <Divider variant="inset" fullWidth />
              <ListItemText
                primary="Total:"
                secondary={`₹${total}`}
                sx={{ display: "flex", justifyContent: "space-between" }}
              />
              <Button
                variant="contained"
                color="error"
                size="small"
                fullWidth
                onClick={handleClick}
              >
                Checkout
              </Button>
            </div>
          )}
        </Box>
      </Modal>
      <SnackbarBtn
        open={opensnack}
        handleClose={handleCloseSnack}
        message="Order Placed!"
      />
    </div>
  );

  return (
    <>
      {(menu.length <= 0 && (
        <Typography component="div" variant="h4" align="center">
          Menu being prepared...
        </Typography>
      )) ||
        (menu.length <= 0 &&
          setTimeout(() => {
            <SnackbarBtn
              open={true}
              handleClose={handleCloseSnack}
              severity={"error"}
              message={"no items present.."}
            />;
          }, 2000))}
      {menu.length !== 0 && (
        <Box>
          <Container sx={{ display: "flex", my: 2, flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "text.primary", flexGrow: 1 }}
              >
                {date}
              </Typography>
              {pathname.includes("today-menu") && CartModal}
            </Box>
            {search}
          </Container>
          <Container
            sx={{
              display: "grid",
              gridTemplateColumns: width < 470 ? "repeat(1,1fr)" : "repeat(3,1fr)",
              gap: "1rem",
            }}
          >
            {menu
              .filter((item) => +item.quantity !== 0)
              .map((item) => {
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
                    }}
                    elevation={4}
                  >
                    <CardMedia
                      component="img"
                      height="190"
                      image={item.strMealThumb}
                      alt={item.strMeal}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                      >
                        Title: {item.strMeal}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">
                          Price: ₹{item.strPrice} /-
                        </Typography>
                        <Typography variant="h6">
                          Qty: {item.quantity}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        fullWidth
                        onClick={() =>
                          AddToCartItem({
                            ...item,
                            qty: 1,
                            totalPrice: item.strPrice,
                          })
                        }
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
          </Container>
        </Box>
      )}
    </>
  );
}
