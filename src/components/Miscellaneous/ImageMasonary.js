import { ImageList, ImageListItem, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useStyles } from "./MiscellaneousCss";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
];
export default function Images() {
  const [checked, setChecked] = useState(false);

  const classes = useStyles();

  setTimeout(() => setChecked(true), 500);

  return (
    <Box className={classes.ImageMasonaryRoot}>
      <Zoom in={checked}>
        <ImageList variant="masonry" cols={2} gap={9}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Zoom>
    </Box>
  );
}
