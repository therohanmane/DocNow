import api from "../api/axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    alert("Login Successful");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <input className="w-full p-2 border mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border mb-4" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={login} className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </div>
    </div>
  );
}
