import dollar from "@/assets/dollar.png";
import { userRole } from "@/constant";
import { getMyCoins } from "@/services/businessLogic";
import { CardActions, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CountUp from "react-countup";
import SwipeableTemporaryDrawer from "../TaskTable/SwipeableTemporaryDrawer";

function AnimationCoinModal() {
  const [modalClass, setModalClass] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [coins, setCoins] = useState(0);
  // console.log("🚀 ~ AnimationCoinModal ~ totalCoins:", coins)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Modify the handleButtonClick function or create a new one for the drawer
  const handleRequestMoneyClick = () => {
    setIsDrawerOpen(true);
  };

  const handleButtonClick = (buttonId) => {
    setModalClass(buttonId);
    setIsActive(true);
    // Set a timeout matching the duration of the circle animation
    setTimeout(() => {
      // Logic to display the new image
      // For example, you might toggle a new state or modify the class of the image
    }, 1500);
  };

  const handleModalClick = () => {
    setModalClass((prevClass) => prevClass + " out");
    setIsActive(false);
  };



  const fetchData = async () => {
    const res = await getMyCoins();
    setCoins(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wave-container">
      <div
        id="modal-container"
        className={`${modalClass} ${isActive ? "modal-active" : ""}`}
        onClick={handleModalClick}
      >
        <div className="modal-background">
          <div className="modal">
            <div class="wave"> </div>
            <div>
              <CountUp
                className="count-up"
                style={{
                  color: "#ffff",
                  fontSize: "40px",
                  marginTop: "60px",
                  position: 'absolute',
                  top: '-52px'
                }}
                end={554}
                duration={45}
              />
            </div>
            <div className="modal-content">
              <div>
                <div style={{
                  position: 'relative',
                  top: '13px',
                  left:'6px'
                }}>
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
                        {coins?.totalCoins}
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
                      {coins?.totalCoins * 0.5}
                    </span>
                  </Typography>
                </div>
                <CardActions sx={{ paddingTop: '15px', display: 'flex', marginLeft: '-75px', gap: '36px' }}>
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
                  <div style={{ display: 'flex', alignContent: 'center', marginLeft: '-7px', marginTop: '15px' }}>
                    <div>
                    <SwipeableTemporaryDrawer
                      buttons={["Request Money"]}
                      open={isDrawerOpen}
                      onClose={() => setIsDrawerOpen(false)}
                      coinsId={coins?.id} // Passing the coins ID
                    />

                    </div>
                    <div style={{ marginTop: '13px' }}>
                      <PriceCheckIcon />
                    </div>
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
            id="coin_animation_modal"
            className="button"
            onClick={() => handleButtonClick("coin_animation_modal")}
          >
            <Image className="spin-image " src={dollar} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimationCoinModal;
