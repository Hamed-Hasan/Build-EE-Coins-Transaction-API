import { ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as React from "react";
import CategoryForm from "../TaskForm/CategoryForm";
import TaskForm from "../TaskForm/TaskForm";
import ReusableModal from "../AlertDialogSlide/ReusableModal";

export default function SwipeableTemporaryDrawer({ buttons, task, category }) {
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
          {anchor === "Edit" && task ? <ReusableModal task={task} /> : ""}
          {anchor === "Edit" && task ? <TaskForm task={task} /> : ""}
          {anchor === "Add Task" && <TaskForm />}
          {anchor === "Add Category" && <CategoryForm />}
          {anchor === "Edit" && category ? (
            <CategoryForm category={category} />
          ) : (
            ""
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
      {[...buttons].map((anchor) => (
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
