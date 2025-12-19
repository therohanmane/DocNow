import axios from "../api/axios";
import { useEffect, useState } from "react";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("/appointment/my").then(res => setAppointments(res.data));
  }, []);

  return (
    <div>
      <h2>My Appointments</h2>
      {appointments.map(a => (
        <div key={a._id}>
          {a.doctor.name} | {a.date} | {a.time} | {a.status}
        </div>
      ))}
    </div>
  );
}
