import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/Login";
import UserRegist from "./components/UserRegist";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/regist" element={<UserRegist />} />
    </Routes>
  );
};

export default App;
