import { Routes, Route } from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout";
import NewAccountPage from "./pages/auth/new-account/NewAccountPage";
import LoginPage from "./pages/auth/login/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/new-account"
          element={
            <AuthLayout>
              <NewAccountPage />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
