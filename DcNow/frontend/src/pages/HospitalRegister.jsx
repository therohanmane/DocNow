import axios from "../api/axios";
import { useState } from "react";

export default function HospitalRegister() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await axios.post("/hospital/register", form);
    alert("Hospital Registered");
  };

  return (
    <div>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <input placeholder="City" onChange={e => setForm({ ...form, city: e.target.value })} />
      <button onClick={submit}>Register</button>
    </div>
  );
}
