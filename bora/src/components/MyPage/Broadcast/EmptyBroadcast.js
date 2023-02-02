import { Link } from "react-router-dom";
import "./EmptyBroadcast.scss";

const EmptyBoard = () => {
  return (
    <div>
      <div className="text">아직 방송국을 생성하지 않았어요😢</div>
      <Link to="/makeBroadcast">
        <div className="createButton">방송국 생성하러가기</div>
      </Link>
    </div>
  );
};
export default EmptyBoard;
