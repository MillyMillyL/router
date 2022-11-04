import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/reducer/AuthSlice";

const MainMenu = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>

        {auth.isLogged && (
          <>
            <li>
              <Link to={"profile"}>{auth.user.username}</Link>
            </li>
            <li>
              <Link to={"/student"}>Student</Link>
            </li>
            <li>
              <Link to={"/"} onClick={() => dispatch(logout())}>
                Log Out
              </Link>
            </li>
          </>
        )}

        {!auth.isLogged && (
          <li>
            <Link to={"login"}>Login</Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default MainMenu;
