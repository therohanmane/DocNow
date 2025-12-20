import axios from "../api/axios";
import { useEffect, useState } from "react";
import Badge from "../components/Badge";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/appointment/my")
      .then(res => setAppointments(res.data || []))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, []);

  const badgeFor = (status) => {
    if (!status) return { label: 'Unknown', color: 'blue' };
    const s = status.toLowerCase();
    if (s === 'approved' || s === 'confirmed') return { label: 'Approved', color: 'green' };
    if (s === 'pending') return { label: 'Pending', color: 'amber' };
    if (s === 'cancelled' || s === 'rejected') return { label: 'Cancelled', color: 'red' };
    return { label: status, color: 'blue' };
  };

  return (
    <div className="container">
      <div style={{ marginBottom: 12 }}>
        <h2>My Appointments</h2>
        <div className="muted">Upcoming appointments and status</div>
      </div>

      {loading && <div className="card">Loading appointments…</div>}

      {!loading && appointments.length === 0 && (
        <div className="card">No appointments found</div>
      )}

      <div className="appointments-grid">
        {appointments.map(a => {
          const b = badgeFor(a.status);
          return (
            <div key={a._id} className="appt-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{a.doctor?.name || 'Doctor'}</div>
                  <div className="muted">{a.date} at {a.time}</div>
                </div>
                <div>
                  <Badge color={b.color}>{b.label}</Badge>
                </div>
              </div>
              {a.reason && <div style={{ marginTop: 8 }}>{a.reason}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
