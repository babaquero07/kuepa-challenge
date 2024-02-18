import { Routes, Route } from "react-router-dom";
import LessonLayout from "./pages/lesson/LessonLayout";
import AuthLayout from "./pages/auth/AuthLayout";

import LessonPage from "./pages/lesson/LessonPage";
import NewAccountPage from "./pages/auth/new-account/NewAccountPage";
import LoginPage from "./pages/auth/login/LoginPage";
import Footer from "./components/footer/Footer";

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
        <Route
          path="/lesson/:lessonId"
          element={
            <LessonLayout>
              <LessonPage />
            </LessonLayout>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
