import React, { useState } from "react";
import { Box, Button, List, ListItem, SwipeableDrawer, TextField, Typography } from "@mui/material";
import ReusableModal from "../AlertDialogSlide/ReusableModal";
import CategoryForm from "../TaskForm/CategoryForm";
import TaskForm from "../TaskForm/TaskForm";
import RequestMoneyForm from "../RequestMoneyForm/RequestMoneyForm";

export default function SwipeableTemporaryDrawer({ buttons, task, category, coinsId }) {
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const renderListItems = (anchor) => {
    // Handling "Request Money" action
    if (anchor === "Request Money") {
      return <ListItem><RequestMoneyForm coinsId={coinsId} /></ListItem>;
    }

    // Handling other actions
    return (
      <>
        {anchor === "Edit" && task ? <ReusableModal task={task} /> : null}
        {anchor === "Edit" && task ? <TaskForm task={task} /> : null}
        {anchor === "Add Task" ? <TaskForm /> : null}
        {anchor === "Add Category" ? <CategoryForm /> : null}
        {anchor === "Edit" && category ? <CategoryForm category={category} /> : null}
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
