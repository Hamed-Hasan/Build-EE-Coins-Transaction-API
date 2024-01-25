import ReusableModal from "@/components/AlertDialogSlide/ReusableModal";
import AnimationCoinModal from "@/components/AnimationCoinModal/AnimationCoinModal";
import CoinsButton from "@/components/CoinsButton/CoinsButton";
import { getAdminLeaveList, requestgetEmployeeList } from "@/services/businessLogic";

const HomePage = () => {
// This could be inside a component or a function, depending on your app's setup
const displayLeaveTypes = async () => {
  try {
      const leaveTypes = await getAdminLeaveList();
      console.log("🚀 ~ displayLeaveTypes ~ leaveTypes:", leaveTypes)
    
  } catch (error) {
      console.error('Error fetching leave types:', error);
      // Handle the error appropriately in your application
  }
};

// Call the function
displayLeaveTypes();
 
  return (
    <div>


      <AnimationCoinModal/>
      <CoinsButton />
      <ReusableModal />
    </div>
  );
};

export default HomePage;
