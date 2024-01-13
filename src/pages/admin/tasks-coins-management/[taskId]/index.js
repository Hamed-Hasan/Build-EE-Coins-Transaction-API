import dollar from "@/assets/dollar.png";
import { getTaskDetail } from "@/services/businessLogic";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const DetailsPage = () => {
  const imageNames = ["logo1.png", "logo2.png", "logo3.png", "logo4.png"];
  const [taskDetails, setTaskDetails] = useState(null);
console.log("fetch data: ", taskDetails)
  const params = useParams();
  const taskId = params?.taskId; 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getTaskDetail(taskId);
        setTaskDetails(data);
        console.log("Task Details:", data); 
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchDetails();
  }, [taskId]);

  return (
    <Grid
      container
      // spacing={3}
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#1E1E1E",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Wrap the two Grid items within another Grid item that contains a Paper */}
      <Grid item xs={12}>
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "#1F2541",
            height: "100%",
            width: "100%",
            maxWidth: "lg",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "25px",
            paddingBottom: "70px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Image in the top-left corner */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "-20px",
              zIndex: "100",
            }}
          >
            <Image
              src="/left-top-clip.png"
              alt="Top-left Image"
              width={500}
              height={500}
              layout="fixed"
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              right: "-20px",
            }}
          >
            <Image
              src="/right-bottom-clip.png"
              alt="Top-left Image"
              width={500}
              height={500}
              layout="fixed"
            />
          </div>

          {/* Inner Grid items */}
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                position: "relative",

                zIndex: "1000",
              }}
            >
              <Typography
                variant="h2"
                component="h2"
                sx={{ color: "white", fontWeight: "bold", paddingTop: "30px" }}
              >
                Startup
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                sx={{ color: "#706AF6", fontWeight: "bold" }}
              >
                Landing
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{
                  color: "gray",
                  fontWeight: "light",
                  fontSize: "0.75rem",
                  maxWidth: "400px",
                  width: "100%",
                  paddingTop: "40px",
                  paddingBottom: "30px",
                  // margin: 'auto'
                }}
              >
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content.
              </Typography>

              <div className="button-for-coins-detail">
                {/* Get Started Button */}
                <Button
                  variant="contained"
                  sx={{
                    marginRight: "20px",
                    color: "white",
                    borderRadius: "20px",
                    textTransform: "none",
                    background:
                      "linear-gradient(to right, #F9AE57 30%, #E9702F 90%)",
                    "&:hover": {
                      background:
                        "linear-gradient(to right, #F9AE57 30%, #E9702F 90%)",
                      opacity: 0.9,
                    },
                  }}
                >
                  Get Started
                </Button>

                {/* Watch Demo Button */}
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    borderRadius: "20px",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "lightgray",
                      color: "lightgray",
                    },
                  }}
                  endIcon={<PlayCircleOutlineIcon />}
                >
                  Watch Demo
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              {/* <Image
                src="/computer.png" 
                alt="Description of image"
                width={450} 
                height={450} 
              /> */}

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="spin-container-3d-details">
                  <Image
                    className="spin-image-details"
                    src={dollar}
                    width={500}
                    height={500}
                    alt=""
                  />
                </div>
                <div>
                  <CountUp
                    className="count-up"
                    style={{
                      color: "#FFA100",
                      fontSize: "50px",
                      marginTop: "60px",
                    }}
                    end={485554}
                    duration={45}
                  />
                </div>
              </div>
            </Grid>
            <Grid container spacing={3} justifyContent="center">
              {imageNames.map((imageName, index) => (
                <Grid
                  item
                  xs={6}
                  md={3}
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={`/${imageName}`}
                    alt={`Image ${index + 1}`}
                    width={210}
                    height={50}
                    layout="fixed"
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DetailsPage;
