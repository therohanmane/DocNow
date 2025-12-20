import { Link } from "react-router-dom";

export default function Sidebar({ role = 'patient' }) {
  return (
    <aside style={{ width: 220, padding: 12 }}>
      <div style={{ marginBottom: 12, fontWeight: 700 }}>Menu</div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {role === 'admin' ? (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/hospitals">Hospitals</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/hospitals">Hospitals</Link>
            <Link to="/appointments">My Appointments</Link>
          </>
        )}
      </nav>
    </aside>
  );
}
