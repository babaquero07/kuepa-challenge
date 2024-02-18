import { Routes, Route } from "react-router-dom";
import AuthLayout from "./pages/auth/new-account/AuthLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/new-account" element={<AuthLayout />} />
      </Routes>
    </>
  );
}

export default App;
