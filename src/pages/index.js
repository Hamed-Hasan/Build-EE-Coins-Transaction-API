import ReusableModal from "@/components/AlertDialogSlide/ReusableModal";
import AnimationCoinModal from "@/components/AnimationCoinModal/AnimationCoinModal";
import CoinsButton from "@/components/CoinsButton/CoinsButton";
import { postRequestMoneyByCoins } from "@/services/businessLogic";

const HomePage = () => {
  const handleButtonClick = () => {
    const formData = new FormData();
    formData.append('CoinsId', '3');
    formData.append('TotalConvertedCoins', '200');
    formData.append('beforeATotal', ''); // Assuming this is optional or has a value
    formData.append('ReqReason', 'for travel');
    formData.append('ProjectName', '268-popp');
    formData.append('LocationName', '301-الرياض');

    postRequestMoneyByCoins(formData)
      .then(response => {
        console.log(response); // Handle the successful response
      })
      .catch(error => {
        console.error(error); // Handle errors
      });
  };


 
  return (
    <div>

<button onClick={handleButtonClick}>Request Money By Coins</button>
      <AnimationCoinModal/>
      <CoinsButton />
      <ReusableModal />
    </div>
  );
};

export default HomePage;
