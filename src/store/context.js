import React, { useContext, useState } from "react";
import { meals } from "../components/Menu/menuData";

export const AppContext = React.createContext({});

const API_KEY = "AIzaSyAdzcngPWBYIem3MbVcLEswK91Vm2DeZJg";

const createRandomUserId = () => {
  const UserId = Math.ceil(Math.random() * 1000000);
  return UserId;
};

const createRandomMoney = () => {
  const money = Math.ceil(Math.random() * 1000);
  return money;
};

const Capitalize = (name) => {
  return name.charAt(0).concat(name.substring(1, name.length));
};
export const AppProvider = ({ children }) => {
  let getUserFromLS = JSON.parse(localStorage.getItem("user"));
  let initialToken = localStorage.getItem("token");

  const [loadedData, setLoadedData] = useState([]);
  const [loadedMenuData, setLoadedMenuData] = useState([]);
  const [user, setUser] = useState(getUserFromLS);
  const [token, setToken] = useState(initialToken);
  const [transactions, setTransactions] = useState([]);
  const [mainmenu, setMainMenu] = useState([]);
  const isLoggedIn = !!token;

  const SignInHandler = async (email, password) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          referrerPolicy: "no-referrer",
          mode: "cors",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),

          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      const users = await getDataFromDB();

      const user = users.find((us) => us.email === email);
      setUser(user);
      setToken(data.idToken);

      // Cookies.set("token", data.idToken);
      // Cookies.set("user", JSON.stringify(user));
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("user", JSON.stringify(user));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const SignOutHandler = () => {
    setToken(null);
    // Cookies.remove("token");
    // Cookies.remove("user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return token;
  };

  const SignUpHandler = async (email, password, first, last) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          method: "POST",

          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      if (!data) {
        throw new Error("invalid data or the data exists");
      }
      postDataInDB(data.email, data.idToken, first, last);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const postDataInDB = async (email, idToken, first, last) => {
    const response = await fetch(
      "https://rtb1-d9727-default-rtdb.firebaseio.com/Employees.json",
      {
        method: "POST",
        referrerPolicy: "no-referrer",
        mode: "cors",

        body: JSON.stringify({
          UserId: createRandomUserId(),
          email: email.toLowerCase(),
          idToken: idToken,
          role: email.includes("@admin") ? "admin" : "employee",
          name: `${Capitalize(first)} ${Capitalize(last)}`,
          balance: createRandomMoney(),
        }),

        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const postData = await response.json();
    return postData;
  };

  //GET:EMPLOYEES
  const getDataFromDB = async () => {
    const response = await fetch(
      "https://rtb1-d9727-default-rtdb.firebaseio.com/Employees.json"
    );
    const getData = await response.json();
    const loadedData = [];
    for (const key in getData) {
      loadedData.push({
        id: key,
        userId: getData[key].UserId,
        email: getData[key].email,
        idToken: getData[key].idToken,
        role: getData[key].role,
        name: getData[key].name,
        balance: getData[key].balance,
      });
    }
    setLoadedData(loadedData);
    return loadedData;
  };

  const GetAnEmployee = async (userId) => {
    let emp = await loadedData.find((user) => user.userId === userId);
    return emp;
  };

  const newBalance = async (data) => {
    const url = `https://rtb1-d9727-default-rtdb.firebaseio.com/Employees/${data?.id}.json`;
    const response = await fetch(url, {
      method: "PATCH",
      referrerPolicy: "no-referrer",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    const balance = await response.json();
    return balance;
  };

  const AddMoney = async (id, balance) => {
    const url = `https://rtb1-d9727-default-rtdb.firebaseio.com/Employees/${id}.json`;
    const response = await fetch(url, {
      method: "PATCH",
      referrerPolicy: "no-referrer",
      mode: "cors",

      body: JSON.stringify({
        balance,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const users = await response.json();
    return users;
  };

  // UPDATE TODAYS MENU
  const UpdateTodaysMenu = async (menu) => {
    const response = await fetch(
      `https://rtb1-d9727-default-rtdb.firebaseio.com/Today/${menu.id}.json`,
      {
        method: "PATCH",
        referrerPolicy: "no-referrer",
        mode: "cors",

        body: JSON.stringify(menu),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    getTodayMenuFromDB();
    return data;
  };

  // POST: MAINMENU - 1 TIME
  const PostFoodtoDB = async () => {
    const response = await fetch(
      "https://rtb1-d9727-default-rtdb.firebaseio.com/Meals.json",
      {
        method: "POST",
        referrerPolicy: "no-referrer",
        mode: "cors",

        body: JSON.stringify(meals),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  };

  //GET:MAINMENU
  const GetMainMenuFromDB = async () => {
    const response = await fetch(
      "https://rtb1-d9727-default-rtdb.firebaseio.com/Meals.json"
    );
    const data = await response.json();
    let loadedData = [];
    for (let key in data) {
      loadedData = data[key];
    }
    setMainMenu(loadedData);
    return loadedData;
  };

  // POST: TODAYS MENU
  const TodayMenuToDB = async (item) => {
    let id;
    let defaultObj = {
      url: "https://rtb1-d9727-default-rtdb.firebaseio.com/Today.json",
      method: "POST",
    };
    const getItem = loadedMenuData.find((menu) => menu.idMeal === item.idMeal);
    if (getItem) {
      id = getItem.id;
      defaultObj = {
        url: `https://rtb1-d9727-default-rtdb.firebaseio.com/Today/${id}.json`,
        method: "PUT",
      };
    }
    const response = await fetch(defaultObj.url, {
      method: defaultObj.method,
      referrerPolicy: "no-referrer",
      mode: "cors",
      body: JSON.stringify(item),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    const loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        idMeal: data[key].idMeal,
        quantity: data[key].quantity,
        strMeal: data[key].strMeal,
        strMealThumb: data[key].strMealThumb,
        strPrice: data[key].strPrice,
      });
    }
    setLoadedMenuData(loadedData);
  };

  //GET:TODAYS MENU
  const getTodayMenuFromDB = async () => {
    const response = await fetch(
      "https://rtb1-d9727-default-rtdb.firebaseio.com/Today.json"
    );

    const data = await response.json();
    const loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        idMeal: data[key].idMeal,
        quantity: data[key].quantity,
        strMeal: data[key].strMeal,
        strMealThumb: data[key].strMealThumb,
        strPrice: data[key].strPrice,
      });
    }
    setLoadedMenuData(loadedData);
    return loadedData;
  };

  const TransactionsInDB = async ({ id, updatedBy, flow, amount }) => {
    const response = await fetch(
      `https://rtb1-d9727-default-rtdb.firebaseio.com/Employees/${id}/Transactions.json`,
      {
        method: "POST",
        referrerPolicy: "no-referrer",
        mode: "cors",
        body: JSON.stringify({
          Date: new Date().toLocaleString("en-US"),
          Updated_By: updatedBy,
          flow: flow,
          amount: amount,
        }),

        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  };

  const GetTransactionsFromDB = async (id) => {
    const response = await fetch(
      `https://rtb1-d9727-default-rtdb.firebaseio.com/Employees/${id}/Transactions.json`
    );
    const data = await response.json();
    const loadedData = [];
    for (let key in data) {
      loadedData.push(data[key]);
    }
    setTransactions(loadedData);
    // return data;
  };

  return (
    <AppContext.Provider
      value={{
        SignInHandler,
        SignOutHandler,
        SignUpHandler,
        getDataFromDB,
        loadedData,
        AddMoney,
        newBalance,
        user,
        isLoggedIn,
        PostFoodtoDB,
        GetMainMenuFromDB,
        TodayMenuToDB,
        getTodayMenuFromDB,
        loadedMenuData,
        UpdateTodaysMenu,
        TransactionsInDB,
        GetAnEmployee,
        GetTransactionsFromDB,
        transactions,
        mainmenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const GlobalContext = () => {
  const ctx = useContext(AppContext);
  return ctx;
};
