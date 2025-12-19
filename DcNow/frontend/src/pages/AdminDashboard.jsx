import axios from "../api/axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Hospitals: {stats.hospitals}</p>
      <p>Doctors: {stats.doctors}</p>
      <p>Patients: {stats.patients}</p>
      <p>Appointments: {stats.appointments}</p>
    </div>
  );
}
