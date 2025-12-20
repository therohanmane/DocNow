import { Link } from "react-router-dom";

export default function LoginSelector() {
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '64vh' }}>
      <div className="card" style={{ width: 420, textAlign: 'center' }}>
        <h3>Login</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link to="/" className="form-btn">Patient Login</Link>
          <Link to="/hospital/login" className="form-btn">Hospital Login</Link>
        </div>
      </div>
    </div>
  );
}
