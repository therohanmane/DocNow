import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SlotList() {
  const { doctorId } = useParams();
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios.get(`/slot/${doctorId}`).then(res => setSlots(res.data));
  }, []);

  const book = async (slotId) => {
    await axios.post("/appointment/book", { doctorId, slotId });
    alert("Appointment Booked");
  };

  return (
    <div>
      <h2>Available Slots</h2>
      {slots.map(s => (
        <div key={s._id}>
          {s.date} {s.time}
          <button onClick={() => book(s._id)}>Book</button>
        </div>
      ))}
    </div>
  );
}
