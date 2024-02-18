import { Routes, Route } from "react-router-dom";
import AuthLayout from "./pages/auth/new-account/AuthLayout";
import NewAccountPage from "./pages/auth/new-account/NewAccountPage";

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
      </Routes>
    </>
  );
}

export default App;
