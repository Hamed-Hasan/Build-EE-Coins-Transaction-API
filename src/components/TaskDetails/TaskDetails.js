import dollar from "@/assets/dollar.png";
import { getTaskDetail } from "@/services/businessLogic";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const TaskDetails = () => {
  const [taskDetails, setTaskDetails] = useState(null);
  console.log("fetch data: ", taskDetails);
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

  const splitTitle = (title) => {
    return title.split(" ");
  };

  const formatDate = (datetimeStr) => {
    const date = new Date(datetimeStr);
    return date.toISOString().split("T")[0];
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleSeeMoreClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = (description) => {
    if (description?.length <= 140 || showFullDescription) {
      return description;
    }
    return `${description?.substring(0, 140)}... `;
  };
  const getStatusIcon = (status, fontSize = "default") => {
    switch (status) {
      case "Times Out":
        return <HourglassEmptyIcon fontSize={fontSize} />;
      case "On Hold":
        return <PauseCircleOutlineIcon fontSize={fontSize} />;
      case "In Progressing":
      case "Under Reviewing":
        return <AutorenewIcon fontSize={fontSize} />;
      case "Finished":
        return <CheckCircleOutlineIcon fontSize={fontSize} />;
      case "Terminated":
        return <CancelIcon fontSize={fontSize} />;
      default:
        return <ErrorOutlineIcon fontSize={fontSize} />;
    }
  };

  return (
    <Grid
      container
      // spacing={3}
      sx={{
        padding: { xs: 2, sm: 3, md: 2 },
        backgroundColor: "#1E1E1E",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Wrap the two Grid items within another Grid item that contains a Paper */}

      {taskDetails && taskDetails.tasks && (
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3, md: 8 },
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
                zIndex: "100",
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
                md={3}
                style={{
                  position: "relative",

                  zIndex: "1000",
                }}
              >
                <div className="_title_for_task_details">Task Info</div>
                {/* Splitting and rendering the title in two colors */}
                {taskDetails.tasks.title && (
                  <>
                    {splitTitle(taskDetails.tasks.title).map((word, index) => (
                      <Typography
                        key={index}
                        // variant="h3"
                        // component="h3"
                        sx={{
                          color: index === 0 ? "white" : "#706AF6",
                          fontWeight: "bold",
                          paddingTop: index === 0 ? "30px" : 0,
                          fontSize: "2.4rem",
                        }}
                      >
                        {word}
                      </Typography>
                    ))}
                  </>
                )}
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
                  }}
                >
                  {renderDescription(taskDetails.tasks.description)}
                  {taskDetails.tasks.description?.length > 140 &&
                    !showFullDescription && (
                      <span
                        style={{ color: "#706AF6", cursor: "pointer" }}
                        onClick={handleSeeMoreClick}
                      >
                        see more
                      </span>
                    )}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    variant="contained"
                    sx={{
                      marginRight: "20px",
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    <span style={{ opacity: ".5" }}> Category: </span>{" "}
                    {taskDetails.tasks.categoryName}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <span style={{ opacity: ".5", color: "white" }}>
                      status:
                    </span>
                    <span className="_status-icon">
                      {getStatusIcon(taskDetails.tasks.status, "inherit")}
                    </span>
                    <Typography
                      variant="outlined"
                      sx={{
                        color: "white",
                        borderColor: "white",
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "lightgray",
                          color: "lightgray",
                        },
                      }}
                    >
                      {taskDetails.tasks.status}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={3}
                style={{
                  position: "relative",

                  zIndex: "1000",
                }}
              >
                <div className="_title_for_task_details">Task Created By</div>
                {/* Splitting and rendering the title in two colors */}
                {taskDetails.tasks.title && (
                  <>
                    {splitTitle(taskDetails.tasks.taskCreatedEmp.createdBy).map(
                      (word, index) => (
                        <Typography
                          key={index}
                          // variant="h3"
                          // component="h3"
                          sx={{
                            color: index === 0 ? "white" : "#706AF6",
                            fontWeight: "bold",
                            paddingTop: index === 0 ? "30px" : 0,
                            fontSize: "2.4rem",
                          }}
                        >
                          {word}
                        </Typography>
                      )
                    )}
                  </>
                )}
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
                  }}
                >
                  File:{" "}
                  {renderDescription(taskDetails.tasks.taskCreatedEmp.fileName)}
                  {taskDetails.tasks.taskCreatedEmp.fileName?.length > 140 &&
                    !showFullDescription && (
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={handleSeeMoreClick}
                      >
                        see more
                      </span>
                    )}
                  <a
                    href={`http://207.180.244.205:1085/UploadedFiles/TasksUploads/${taskId}/${encodeURIComponent(
                      taskDetails.tasks.taskCreatedEmp.fileName
                    )}`}
                    target="_blank"
                    style={{ marginLeft: "10px" }}
                  >
                    <CloudDownloadIcon
                      style={{ color: "#706AF6", verticalAlign: "middle" }}
                    />
                  </a>
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    variant="contained"
                    sx={{
                      marginRight: "20px",
                      color: "white",
                      textTransform: "none",
                      display:
                        taskDetails.tasks.taskCreatedEmp.submittedCount < 1
                          ? "none"
                          : "block",
                    }}
                  >
                    <span style={{ opacity: ".5" }}> Submit Count: </span>
                    {taskDetails.tasks.taskCreatedEmp.submittedCount < 1
                      ? "No submitted count"
                      : taskDetails.tasks.taskCreatedEmp.submittedCount}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <span style={{ opacity: ".5", color: "white" }}>
                      status:
                    </span>
                    <span className="_status-icon">
                      {getStatusIcon(taskDetails.tasks.status, "inherit")}
                    </span>
                    <Typography
                      variant="outlined"
                      sx={{
                        color: "white",
                        borderColor: "white",
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "lightgray",
                          color: "lightgray",
                        },
                      }}
                    >
                      {taskDetails.tasks.status}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={3}
                style={{
                  position: "relative",

                  zIndex: "1000",
                }}
              >
                <div className="_title_for_task_details">Task Assigned By</div>
                {/* Splitting and rendering the title in two colors */}
                {taskDetails.tasks.title && (
                  <>
                    {splitTitle(
                      taskDetails.tasks.taskAssignedEmp.assignedUser
                    ).map((word, index) => (
                      <Typography
                        key={index}
                        // variant="h3"
                        // component="h3"
                        sx={{
                          color: index === 0 ? "white" : "#706AF6",
                          fontWeight: "bold",
                          paddingTop: index === 0 ? "30px" : 0,
                          fontSize: "2.4rem",
                        }}
                      >
                        {word}
                      </Typography>
                    ))}
                  </>
                )}
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
                  }}
                >
                  {taskDetails.tasks.taskAssignedEmp.fileName}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    variant="contained"
                    sx={{
                      marginRight: "20px",
                      color: "white",
                      textTransform: "none",
                      display:
                        taskDetails.tasks.taskAssignedEmp.objectCount < 1
                          ? "none"
                          : "block",
                    }}
                  >
                    <span style={{ opacity: ".5" }}> Obj Count: </span>
                    {taskDetails.tasks.taskAssignedEmp.objectCount < 1
                      ? "No Obj Count"
                      : taskDetails.tasks.taskAssignedEmp.objectCount}
                  </Typography>

                  <Typography
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "lightgray",
                        color: "lightgray",
                      },
                      display:
                        taskDetails.tasks.taskAssignedEmp.objectReason01 ===
                        null
                          ? "none"
                          : "block",
                    }}
                  >
                    <span style={{ opacity: ".5" }}>Reason-1: </span>{" "}
                    {taskDetails.tasks.taskAssignedEmp.objectReason01 === null
                      ? "No reason found"
                      : taskDetails.tasks.taskAssignedEmp.objectReason01}
                  </Typography>
                  <Typography
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      textTransform: "none",
                      fontStyle: "normal",
                      "&:hover": {
                        borderColor: "lightgray",
                        color: "lightgray",
                      },
                      display:
                        taskDetails.tasks.taskAssignedEmp.objectReason02 ===
                        null
                          ? "none"
                          : "block", // Show or hide based on the condition
                    }}
                  >
                    <span style={{ opacity: ".5" }}>Reason-2: </span>{" "}
                    {taskDetails.tasks.taskAssignedEmp.objectReason02 === null
                      ? "No reason found"
                      : taskDetails.tasks.taskAssignedEmp.objectReason02}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
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
                      end={taskDetails.tasks.totalCoins}
                      duration={45}
                    />
                  </div>
                </div>
              </Grid>

              <Grid
                container
                spacing={3}
                justifyContent="center"
                sx={{ position: "relative", zIndex: "1000" }}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "40px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.8, color: "gray" }}
                    >
                      StartTime:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, whiteSpace: "nowrap", color: "white" }}
                    >
                      {formatDate(taskDetails.tasks.startTime)}
                    </Typography>
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ bgcolor: "white" }}
                  />

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.8, color: "gray" }}
                    >
                      dueTime:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, whiteSpace: "nowrap", color: "white" }}
                    >
                      {formatDate(taskDetails.tasks.dueTime)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default TaskDetails;
