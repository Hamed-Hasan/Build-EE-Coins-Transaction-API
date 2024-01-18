import dollar from "@/assets/dollar.png";
import { userRole } from "@/constant";
import { getMyCoins } from "@/services/businessLogic";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function AnimationCoinModal() {
  const [modalClass, setModalClass] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = (buttonId) => {
    setModalClass(buttonId);
    setIsActive(true);

    // Set a timeout matching the duration of the circle animation
    setTimeout(() => {
      // Logic to display the new image
      // For example, you might toggle a new state or modify the class of the image
    }, 1500); // Assuming 1.5s is the duration of your circle animation
  };

  const handleModalClick = () => {
    setModalClass((prevClass) => prevClass + " out");
    setIsActive(false);
  };

  const [totalCoins, setTotalCoins] = useState(0);

  const fetchData = async () => {
    const res = await getMyCoins();
    setTotalCoins(res?.totalCoins);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div
        id="modal-container"
        className={`${modalClass} ${isActive ? "modal-active" : ""}`}
        onClick={handleModalClick}
      >
        <div className="modal-background">
          <div className="modal">
            <div className="modal-content">
              <Card>
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
            </div>
            <div className="modal-svg"></div> {/* Existing Image */}
            <div className="new-modal-image"></div> {/* New Image */}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="buttons">
          <div
            id="seven"
            className="button"
            onClick={() => handleButtonClick("seven")}
          >
            <Image className="spin-image " src={dollar} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimationCoinModal;
