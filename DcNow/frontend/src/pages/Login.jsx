import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate('/appointments');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '72vh' }}>
      <div className="card" style={{ width: 420 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div className="logo">H+</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Welcome to DocNow</div>
            <div className="muted" style={{ fontSize: 13 }}>Manage hospital appointments quickly</div>
          </div>
        </div>
        <div>
          <input className="form-input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" className="form-input" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button onClick={login} className="form-btn" style={{ width: '100%' }}>Login</button>
        </div>
      </div>
    </div>
  );
}
