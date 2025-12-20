import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="container" style={{ width: '100%', maxWidth: 1024 }}>
      <div className="header">
        <Link to="/hospitals"><div className="logo">H+</div></Link>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>DocNow</div>
          <div className="muted" style={{ fontSize: 12 }}>Hospital Appointments</div>
        </div>
        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/hospitals">Hospitals</Link>
          {(role === 'HOSPITAL' || role === 'ADMIN') && <Link to="/add-doctor">Add Doctor</Link>}
          <Link to="/appointments">My Appointments</Link>
          {!token && <Link to="/login">Login</Link>}
          {!token && <Link to="/register">Register</Link>}
          {role === 'ADMIN' && <Link to="/admin">Admin</Link>}
          {token ? (
            <button onClick={handleLogout} className="form-btn">Logout</button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
