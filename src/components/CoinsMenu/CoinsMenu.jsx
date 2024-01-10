import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import styles from "./styles.module.css";

const CoinsMenu = ({ isOpen }) => {
  const role = "user";
  return (
    <Card className={`${styles.coinsMenu} ${isOpen && styles.animate}`}>
      <CardContent>
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
      </CardContent>
      <CardActions>
        <Link
          href={`${
            role === "admin"
              ? "/admin/tasks-coins-management"
              : "/user/tasks-coins-management"
          }`}
          size="small"
        >
          All Of Tasks
        </Link>
      </CardActions>
    </Card>
  );
};

export default CoinsMenu;
