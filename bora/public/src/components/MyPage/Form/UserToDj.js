import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../../../store/board";
const UserToDj = () => {
  const dispatch = useDispatch();
  // const flag = true;
  const toggle = useSelector((state) => state.board.toggle);
  // const goBoard = () => {
  //   flag = false;
  // };
  // const goBroadcast = () => {
  //   flag = true;
  // };
  const toggleHandler = () => {
    dispatch(boardActions.toggleBoard());
  };
  return (
    <div>
      {toggle &&
        {
          /**사연이 있는지 없는지 조건 추가 */
        }(
          <Link to="/emptyBoard">
            <button onClick={toggleHandler}>사연함에 사연 신청하러 가기</button>
          </Link>
        )}
      {toggle &&
        {
          /**사연이 있는지 없는지 조건 추가 */
        }(
          <Link to="/viewBoard">
            <button onClick={toggleHandler}>사연함에 사연 신청하러 가기</button>
          </Link>
        )}
      {!toggle && (
        <Link>
          <button onClick={toggleHandler}>방송정보 보러가기</button>
        </Link>
      )}
    </div>
  );
};
export default UserToDj;
