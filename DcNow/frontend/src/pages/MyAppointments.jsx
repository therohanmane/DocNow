import axios from "../api/axios";
import { useEffect, useState } from "react";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("/appointment/my").then(res => setAppointments(res.data || []));
  }, []);

  return (
    <div className="container">
      <div style={{ marginBottom: 12 }}>
        <h2>My Appointments</h2>
        <div className="muted">Upcoming appointments and status</div>
      </div>

      <div className="appointments-grid">
        {appointments.length === 0 && (
          <div className="card">No appointments found</div>
        )}

        {appointments.map(a => (
          <div key={a._id} className="appt-card">
            <div style={{ fontWeight: 700 }}>{a.doctor?.name || 'Doctor'}</div>
            <div className="muted">{a.date} at {a.time}</div>
            <div style={{ marginTop: 8 }}><strong>Status:</strong> {a.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
