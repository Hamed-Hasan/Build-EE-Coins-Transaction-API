import { userRole } from "@/constant";
import { getMyCoins } from "@/services/businessLogic";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const CoinsMenu = ({ isOpen, setIsOpen }) => {
  const [totalCoins, setTotalCoins] = useState(0);

  const fetchData = async () => {
    const res = await getMyCoins();
    console.log(res);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
            userRole === "admin"
              ? `/${userRole}/tasks-coins-management`
              : `/${userRole}/tasks-coins-management`
          }`}
          size="small"
        >
          Tasks
        </Link>
        <Link
          href={`${
            userRole === "admin"
              ? `/${userRole}/employeecoins`
              : `/${userRole}/employeecoins`
          }`}
          size="small"
        >
          Coins
        </Link>
      </CardActions>
    </Card>
  );
};

export default CoinsMenu;
