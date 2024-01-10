import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as React from "react";
import CategoryForm from "../TaskForm/CategoryForm";
import TaskForm from "../TaskForm/TaskForm";

export default function SwipeableTemporaryDrawer({ userRole }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const renderListItems = (anchor) => {
    return (
      <>
        <ListItem>
          {userRole === "admin" ? (
            <>
              {anchor === "ADD TASK" && <TaskForm />}
              {anchor === "ADD CATEGORY" && <CategoryForm />}
            </>
          ) : (
            <TaskForm />
          )}
        </ListItem>
      </>
    );
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 550 }}
      role="presentation"
    >
      <List>{renderListItems(anchor)}</List>
    </Box>
  );

  return (
    <div>
      {userRole === "admin"
        ? ["ADD TASK", "ADD CATEGORY"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
              <SwipeableDrawer
                anchor={"right"}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))
        : ["ADD TASK"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
              <SwipeableDrawer
                anchor={"right"}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))}
    </div>
  );
}
