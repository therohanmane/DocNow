import axios from "../api/axios";
import { useState } from "react";

export default function HospitalRegister() {
  const [form, setForm] = useState({});

  const submit = async () => {
    if (!form.name || !form.email || !form.password || !form.city || !form.phone) {
      alert('Please fill name, email, password, city and phone');
      return;
    }
    try {
      await axios.post("/hospital/register", form);
      alert("Hospital Registered. Pending approval by admin.");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '64vh' }}>
      <div className="card" style={{ width: 520 }}>
        <h3>Hospital Registration</h3>
        <input className="form-input" placeholder="Hospital Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-input" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="form-input" placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input className="form-input" placeholder="City" onChange={e => setForm({ ...form, city: e.target.value })} />
        <input className="form-input" placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
        <input className="form-input" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="form-btn" onClick={submit}>Register Hospital</button>
      </div>
    </div>
  );
}
  );
}
