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
      // require basic fields
      if (!form.name || !form.email || !form.password || !form.phone) {
        alert('Please fill name, email, password and phone');
        return;
      }
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
      <div className="card" style={{ width: 480 }}>
        <h3>Create a Patient account</h3>
        <input className="form-input" placeholder="Full name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-input" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="form-input" placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input className="form-input" placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
        <input className="form-input" placeholder="Age" onChange={e => setForm({ ...form, age: e.target.value })} />
        <input className="form-input" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="form-btn" onClick={register} disabled={loading}>{loading ? 'Signing up…' : 'Register'}</button>
      </div>
    </div>
  );
}
