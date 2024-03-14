import React, { useContext } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "../components/drawer";

import { gloabalcontext } from "../App";

const CardComponent = () => {
  const { setPayload, payload, create_fe_name, all_cards } =
    useContext(gloabalcontext);

  return (
    <div className="cards">
      {all_cards.map((card, index) => (
        <Card className="card" sx={{ maxWidth: 345, height: 420 }} key={index}>
          <CardMedia
            sx={{ height: 140 }}
            image={card.img}
            title="green iguana"
          />
          <CardContent className="card_content">
            <Typography
              className="card_content_title"
              gutterBottom
              variant="h5"
              component="div"
            >
              {card.title}
            </Typography>
            <p className="small_description">{card.small_description}</p>
          </CardContent>
          <CardActions className="card_btns">
            <Drawer card={card} />
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CardComponent;
