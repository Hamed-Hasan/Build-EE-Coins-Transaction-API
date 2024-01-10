import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as React from "react";
import UserRoleForm from "../TaskForm/UserRoleForm";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  // Assuming you have a way to get the current user's role
  const userRole = "admin"; // employee | admin

  const isRoleAllowed = ["admin", "employee"].includes(userRole);

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const renderListItems = () => {
    const handleItemClick = () => {
      setState({ ...state, right: false });
    };

    if (userRole === "admin") {
      return (
        <>
          <ListItem onClick={handleItemClick} onKeyDown={handleItemClick}>
            <UserRoleForm role="admin" />
          </ListItem>
          {/* ... other items */}
        </>
      );
    } else if (userRole === "employee") {
      return (
        <>
          <ListItem>
            <UserRoleForm role="employee" />
          </ListItem>
        </>
      );
    }
    return (
      <ListItem button onClick={handleItemClick}>
        <ListItemText primary="No items available" />
      </ListItem>
    );
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List>{renderListItems()}</List>
    </Box>
  );

  return (
    <div>
      {isRoleAllowed &&
        ["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer("right", true)}>ADD TASK</Button>

            <SwipeableDrawer
              anchor="right"
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
              onOpen={toggleDrawer("right", true)}
            >
              {list("right")}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
    </div>
  );
}
