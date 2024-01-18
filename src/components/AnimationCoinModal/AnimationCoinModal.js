import dollar from "@/assets/dollar.png";
import { userRole } from "@/constant";
import { getMyCoins } from "@/services/businessLogic";
import { CardActions, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
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


              <div>
                <div>
                  <Typography component="div">
                    <span
                      style={{
                        color: "red",

                      }}
                    >
                      1
                    </span>{" "}
                    <span>Coin = </span>
                    <span
                      style={{
                        color: "green",
                        fontWeight: 'bold'
                      }}
                    >
                      {0.5}
                    </span>{" "}
                    <span>SAR</span>
                  </Typography>
                  <Typography component="div">
                    <div style={{ padding: '5px 0px' }}>
                      <span>Total Coins:</span>
                      <span
                        style={{
                          color: "orange",
                          fontWeight: 'bold'
                        }}
                      >
                        {totalCoins}
                      </span>
                    </div>
                  </Typography>
                  <Typography component="div">
                    <span>Equal in SAR:</span>
                    <span
                      style={{
                        color: "purple",
                        fontWeight: 'bold'
                      }}
                    >
                      {totalCoins * 0.5}
                    </span>
                  </Typography>
                </div>
                <CardActions sx={{ paddingTop: '40px', display: 'flex', marginLeft: '-40px', gap: '16px' }}>

                  <div style={{ display: 'flex', alignContent: 'center', gap: '4px' }}>
                    <Link
                      href={`${userRole === "admin"
                          ? `/${userRole}/tasks-coins-management`
                          : `/${userRole}/tasks-coins-management`
                        }`}
                      size="small"
                      style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black', display: 'flex', alignContent: 'center', gap: '5px' }}

                    >
                      Tasks

                      <span>
                        <PlaylistAddCheckIcon />
                      </span>
                    </Link>


                  </div>
                  <div style={{ display: 'flex', alignContent: 'center', gap: '4px' }}>





                    <Link
                      href={`${userRole === "admin"
                          ? `/${userRole}/employeecoins`
                          : `/${userRole}/employeecoins`
                        }`}
                      size="small"
                      style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black', display: 'flex', alignContent: 'center', gap: '5px' }}

                    >
                      Coins

                      <span>
                        <PriceCheckIcon />
                      </span>
                    </Link>


                  </div>
                </CardActions>
              </div>
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
