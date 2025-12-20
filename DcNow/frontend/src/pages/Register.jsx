import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    try {
      setLoading(true);
      await api.post("/auth/register", form);
      alert("Registered. Please login.");
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '64vh' }}>
      <div className="card" style={{ width: 420 }}>
        <h3>Create an account</h3>
        <input className="form-input" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-input" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="form-input" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="form-btn" onClick={register} disabled={loading}>{loading ? 'Signing up…' : 'Register'}</button>
      </div>
    </div>
  );
}
