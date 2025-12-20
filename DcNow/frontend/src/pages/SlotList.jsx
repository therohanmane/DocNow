import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function SlotList() {
  const { doctorId } = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`/slot/${doctorId}`).then(res => setSlots(res.data || [])).finally(() => setLoading(false));
  }, []);

  const book = async (slotId) => {
    try {
      await axios.post("/appointment/book", { doctorId, slotId });
      alert("Appointment Booked");
      navigate('/appointments');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: 12 }}>
        <h2>Available Slots</h2>
        <div className="muted">Pick a slot to book an appointment</div>
      </div>

      {loading && <Card>Loading slots…</Card>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: 12 }}>
        {slots.map(s => (
          <Card key={s._id} className="">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{s.date}</div>
                <div className="muted">{s.time}</div>
              </div>
              <div>
                <Button onClick={() => book(s._id)}>Book</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
