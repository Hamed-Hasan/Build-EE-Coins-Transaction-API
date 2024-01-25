import ReusableModal from "@/components/AlertDialogSlide/ReusableModal";
import AnimationCoinModal from "@/components/AnimationCoinModal/AnimationCoinModal";
import CoinsButton from "@/components/CoinsButton/CoinsButton";
import { sendAddRequestLeave } from "@/services/api";
import { getAdminLeaveList, getLeaveRequestDetail, requestgetEmployeeList } from "@/services/businessLogic";

const HomePage = () => {
// This could be inside a component or a function, depending on your app's setup
// const displayLeaveTypes = async () => {
//   try {
//       const leaveTypes = await getLeaveRequestDetail(3);
//       console.log("🚀 ~ displayLeaveTypes ~ leaveTypes:", leaveTypes)
    
//   } catch (error) {
//       console.error('Error fetching leave types:', error);
//       // Handle the error appropriately in your application
//   }
// };

const handleButtonClick = async () => {
  try {
    // Create a FormData object to send the form data
    const formData = new FormData();
    formData.append("Description", "add request leave");
    formData.append("StartTime", "1-25-2024");
    formData.append("EndTime", "1-28-2024");
    formData.append("CategoryId", 1);

    // Make the API request using the API function
    const response = await sendAddRequestLeave(formData);
    console.log("🚀 ~ handleButtonClick ~ response:", response)

  } catch (error) {
    // Handle API request errors
    console.error("Error making API request:", error);
  }
};

// Call the function
// displayLeaveTypes();
 
  return (
    <div>

<button type="button" onClick={handleButtonClick}>
        Submit API Request
      </button>
      <AnimationCoinModal/>
      <CoinsButton />
      <ReusableModal />
    </div>
  );
};

export default HomePage;
