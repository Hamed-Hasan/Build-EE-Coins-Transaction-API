import ReusableModal from "@/components/AlertDialogSlide/ReusableModal";
import AnimationCoinModal from "@/components/AnimationCoinModal/AnimationCoinModal";
import CoinsButton from "@/components/CoinsButton/CoinsButton";
import { sendAddRequestLeave, sendManagerApproveLeaveDeposit } from "@/services/api";
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
    formData.append("Id", "12");
    formData.append("ManagerStatus", "Approved");
    formData.append("ManagerComment", "fsfs");

    // Log the FormData to the console
    console.log("FormData:", formData);

    // Make the API request using the API function
    const response = await sendManagerApproveLeaveDeposit(formData);
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
        Send API Request and Log Data
      </button>
      <AnimationCoinModal/>
      <CoinsButton />
      <ReusableModal />
    </div>
  );
};

export default HomePage;
