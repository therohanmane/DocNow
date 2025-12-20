import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AddDoctor from "./pages/AddDoctor";
import SlotList from "./pages/SlotList";
import MyAppointments from "./pages/MyAppointments";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Hospitals from "./pages/Hospitals";
import DoctorList from "./pages/DoctorList";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/doctors/:hospitalId" element={<DoctorList />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/slots/:doctorId" element={<SlotList />} />
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
