import axios from "../api/axios";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({});

  const register = async () => {
    await axios.post("/auth/register", form);
    alert("Registered");
  };

  return (
    <div>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={register}>Register</button>
    </div>
  );
}
