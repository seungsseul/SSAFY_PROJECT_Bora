import CategoryButton from "../../../UI/Button/CategoryButton";
import MoodButton from "../../../UI/Button/MoodButton";
import UserCnt from "../../../UI/UserCnt/UserCnt";
import NavProfile from "../../../UI/NavProfile/NavProfile";
import Profile from "../../../UI/Profile/Profile";
import Modal from "../../../UI/Modal/Modal";

const Broadcast = () => {
  return (
    <div style={{ color: "white" }}>
      방송국입니다.
      <CategoryButton name="노래"></CategoryButton>
      <MoodButton name="잔잔한"></MoodButton>
      <UserCnt num="100"></UserCnt>
      <NavProfile name="윤하"></NavProfile>
      <Profile></Profile>
      <Modal name="모달입니다" name2=""></Modal>
    </div>
  );
};
export default Broadcast;
