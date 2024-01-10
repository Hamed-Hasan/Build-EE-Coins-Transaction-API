import SidebarTaskTable from "@/components/TaskTable/SidebarTaskTable";
import { Typography } from "@mui/material";

const TasksCoinsManagement = () => {
  return (
    <>
      <h1
        style={{
          width: "fit-content",
          margin: "auto",
        }}
      >
        Tasks Coins Management
      </h1>
      <div
        style={{
          width: "fit-content",
          margin: "20px auto",
        }}
      >
        <Typography component="div">
          <span
            style={{
              color: "red",
            }}
          >
            1
          </span>{" "}
          Coin ={" "}
          <span
            style={{
              color: "green",
            }}
          >
            {0.5}
          </span>{" "}
          SAR
        </Typography>
        <Typography component="div">
          Total Coins:{" "}
          <span
            style={{
              color: "orange",
            }}
          >
            {500}
          </span>
        </Typography>
        <Typography component="div">
          Equal in SAR:{" "}
          <span
            style={{
              color: "purple",
            }}
          >
            {250}
          </span>
        </Typography>
      </div>
      <SidebarTaskTable />
    </>
  );
};

export default TasksCoinsManagement;
