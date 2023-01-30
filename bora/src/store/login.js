import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = { showLogin: false, id: "", age: 0, gender: "" };

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    toggleLogin(state) {
      state.showLogin = !state.showLogin;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

//전체다 하지말고 리듀서만 임포트하기 위해
export default loginSlice.reducer;
