import dollar from "@/assets/dollar.png";
import { getTaskDetail } from "@/services/businessLogic";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const DetailsPage = () => {
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

  const splitTitle = (title) => {
    return title.split(" ");
  };

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
      

      {taskDetails && taskDetails.tasks && (
       <Grid item xs={12}>
       <Paper
         elevation={3}
         sx={{
           padding: { xs: 2, sm: 3, md: 4},
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
             md={6}
             style={{
               position: "relative",

               zIndex: "1000",
             }}
           >
             {/* Splitting and rendering the title in two colors */}
             {taskDetails.tasks.title && (
            <>
              {splitTitle(taskDetails.tasks.title).map((word, index) => (
                <Typography
                  key={index}
                  variant="h2"
                  component="h2"
                  sx={{ color: index === 0 ? "white" : "#706AF6", fontWeight: "bold", paddingTop: index === 0 ? "30px" : 0 }}
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
                {taskDetails.tasks.description}
             </Typography>

             <div className="button-for-coins-detail">
              
               <Typography
                 variant="contained"
                 sx={{
                   marginRight: "20px",
                   color: "white",
                   textTransform: "none",
              
                 }}
               >
                <span style={{opacity: '.5'}}> Category: </span> {taskDetails.tasks.categoryName}
               </Typography>

               
               <Typography
                 variant="outlined"
                 sx={{
                   color: "white",
                   borderColor: "white",
                  //  borderRadius: "20px",
                   textTransform: "none",
                   "&:hover": {
                     borderColor: "lightgray",
                     color: "lightgray",
                   },
                 }}
                //  endIcon={<PlayCircleOutlineIcon />}
               >
               <span style={{opacity: '.5'}}>status: </span> {taskDetails.tasks.status}
               </Typography>
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
                   end={taskDetails.tasks.totalCoins}
                   duration={45}
                 />
               </div>
             </div>
           </Grid>
       


           <Grid container spacing={3} justifyContent="center" sx={{
            position: 'relative',
            zIndex: '1000'
           }}>
      <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8, color: 'gray' }}>
            StartTime:
          </Typography>
          <Typography variant="body2" sx={{ ml: 1, whiteSpace: 'nowrap', color: 'white' }}>
            {taskDetails.tasks.startTime}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white' }} />
        {/* <Divider sx={{ width: '10%', bgcolor: 'white', my: 2 }} /> */}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8, color: 'gray' }}>
          dueTime:
          </Typography>
          <Typography variant="body2" sx={{ ml: 1, whiteSpace: 'nowrap', color: 'white' }}>
            {taskDetails.tasks.dueTime}
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

export default DetailsPage;
