import { Route, Routes } from "react-router-dom"
import Enquiry from "./Enquiry"
import Login from "./Login"
import ProtectedRoute from "./ProtectedRoute"
import SignUp from "./SignUp"
import ForgetPassword from "./ForgetPassword"

function App() {

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/update-login" element={<ForgetPassword />} />
      <Route path="/" element={<ProtectedRoute><Enquiry /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
