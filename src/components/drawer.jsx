import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import Edit_automation from "./edit_automation";
import { gloabalcontext } from "../App.js";
import { FaArrowRightLong } from "react-icons/fa6";

const DrawerComponent = ({ card, isactive }) => {
  const { resetPayloadToNull } = useContext(gloabalcontext);
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    resetPayloadToNull();
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 550 }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="drawer"
    >
      <Divider />
      {/* {card_title} */}
      <Edit_automation card={card} isactive={isactive} />
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className="btn_setup_sec"
            onClick={toggleDrawer(anchor, true)}
          >
            {isactive == false ? (
              <span>Add Automation </span>
            ) : (
              <span className="btn_for_view">View Automation </span>
            )}

            <span className="setup_sec_icon">
              {" "}
              <FaArrowRightLong />
            </span>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DrawerComponent;
