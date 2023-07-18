import { TextField, Container } from "@mui/material";
import { useRef } from "react";

export default function Search({
  ItemArray,
  handleChange,
}) {

  const SearchItem = useRef();

  const ChangeHandler = () => {
    let search = SearchItem.current.value.toLowerCase();
    let Items = ItemArray;
    let filteredArray = Items.filter((item) =>
      item.strMeal.toLowerCase().includes(search)
    );
    handleChange(filteredArray);
  };

  return (
    <Container sx={{ width: "100%", marginTop: "1rem", fontSize: "1.4rem" }}>
      <TextField
        variant="standard"
        color="error"
        label="Search..."
        type="search"
        fullWidth
        onChange={ChangeHandler}
        inputRef={SearchItem}
      />
    </Container>
  );
}
