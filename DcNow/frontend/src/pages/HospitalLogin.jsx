import api from "../api/axios";
import { useState } from "react";
import { parseJwt } from "../utils/jwt";
import { useNavigate } from "react-router-dom";

export default function HospitalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/hospital/login", { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      const payload = parseJwt(token);
      if (payload?.role) localStorage.setItem('role', payload.role);
      alert('Hospital logged in');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '64vh' }}>
      <div className="card" style={{ width: 420 }}>
        <h3>Hospital Login</h3>
        <input className="form-input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="form-input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="form-btn" onClick={login}>Login</button>
      </div>
    </div>
  );
}
