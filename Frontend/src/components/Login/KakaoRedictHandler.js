import axios from "axios";
import { useNavigate } from "react-router-dom";
var access_token;

function KakaoRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = "6d5b3488701905eecd07dfc7034e45ec";

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=http://localhost:3000/oauth/callback/kakao&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log(res);

        access_token = res.data.access_token;
        console.log(access_token);
        //서버에서 데이터 생성할때는 POST사용
        axios
          .post(
            "https://kapi.kakao.com/v2/user/me",
            {},
            {
              headers: {
                Authorization: "Bearer " + access_token,
              },
            }
          )
          //성공시 then 실행
          .then((res) => {
            console.log(res);
            console.log(res.data.kakao_account.profile.nickname);
            navigate("/");
          });
        //실패시 catch실행
      });
  });

  function KakaoLogout() {
    console.log(access_token);
    axios
      .post(
        `https://kapi.kakao.com/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div>
      <button className="bg-red-500" onClick={KakaoLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default KakaoRedirectHandler;
