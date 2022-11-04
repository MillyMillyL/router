import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../store/api/AuthApi";
import { login } from "../store/reducer/AuthSlice";

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [regFn, { error: regError }] = useRegisterMutation();
  const [loginFn, { error: loginError }] = useLoginMutation();

  const usernameInp = useRef();
  const pwdInp = useRef();
  const emailInp = useRef();

  //获取dispatch
  const dispatch = useDispatch();
  //获取navigate
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.preLocation?.pathname || "/";

  const submitHandler = (e) => {
    e.preventDefault();
    //get user input
    const username = usernameInp.current.value;
    const password = pwdInp.current.value;

    //handle login
    if (isLoginForm) {
      loginFn({ identifier: username, password }).then((res) => {
        if (!res.error) {
          dispatch(login({ token: res.data.jwt, user: res.data.user }));
          //登录成功后，需向系统添加一个标识，标记用户的登录状态
          //登录状态(布尔值，token(jwt), 用户信息)
          //跳转页面到之前的页面
          navigate(from, { replace: true });
        }
      });
    } else {
      const email = emailInp.current.value;
      //   console.log("SignUp--->", username, password, email);
      regFn({ username, password, email }).then((res) => {
        if (!res.error) {
          //success
          setIsLoginForm(true);
        }
      });
    }
  };

  return (
    <div>
      <p style={{ color: "red" }}>
        {regError && !isLoginForm ? regError.data.error.message : null}
      </p>

      <p style={{ color: "red" }}>
        {loginError && isLoginForm ? loginError.data.error.message : null}
      </p>

      <h2>{isLoginForm ? "Login" : "Sign Up"}</h2>
      <form action="" onSubmit={submitHandler}>
        <div>
          <input type="text" placeholder={"User Name"} ref={usernameInp} />
        </div>
        {!isLoginForm && (
          <div>
            <input type="email" placeholder={"Email"} ref={emailInp} />
          </div>
        )}
        <div>
          <input type="password" placeholder={"Password"} ref={pwdInp} />
        </div>
        <div>
          <button>{isLoginForm ? "Login" : "Sign Up"}</button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLoginForm((prev) => !prev);
            }}
          >
            {isLoginForm
              ? "No Account? Click to Sign Up"
              : "Got an Account? Click to Signin"}
          </a>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
