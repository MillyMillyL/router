import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NeedAuth from "./components/NeedAuth";
import StudentList from "./components/Student/StudentList";
import useAutoLogout from "./hooks/useAutoLogout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import StudentPage from "./pages/StudentPage";

function App() {
  useAutoLogout();
  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route
          path={"profile"}
          element={
            <NeedAuth>
              <ProfilePage />
            </NeedAuth>
          }
        />
        <Route path={"login"} element={<AuthPage />} />
        <Route
          path={"student"}
          element={
            <NeedAuth>
              <StudentPage />
            </NeedAuth>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
