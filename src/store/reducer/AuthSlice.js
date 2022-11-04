import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return { isLogged: false, token: null, user: null, expirationTime: null };
    }
    return {
      isLogged: true,
      token, //服务器发送给我们的token默认有效期为1个月
      user: JSON.parse(localStorage.getItem("user")),
      expirationTime: +localStorage.getItem("expirationTime"),
    };
  },
  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      //获取当前时间戳
      const currentTime = Date.now();
      //设置登录有效时间
      const timeout = 1000 * 60 * 60 * 24 * 15;
      state.expirationTime = currentTime + timeout;
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("expirationTime", state.expirationTime);
    },
    logout(state, action) {
      state.isLogged = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { login, logout } = AuthSlice.actions;
