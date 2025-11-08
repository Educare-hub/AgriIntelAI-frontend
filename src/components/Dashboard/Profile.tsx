import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-box">
      <h1 className="title">👤 Farmer Profile</h1>
      <p className="subtitle">Your professional farm summary</p>

      <div style={{ textAlign: "left", lineHeight: "1.8", marginTop: "20px" }}>
        <h3>👩‍🌾 Personal Info</h3>
        <p><b>Phone:</b> {user?.phone || "N/A"}</p>
        <p><b>Email:</b> {user?.email || "N/A"}</p>
        <p><b>Role:</b> {user?.role || "Farmer"}</p>

        <h3>🌾 Farm Overview</h3>
        <ul>
          <li>Current crops: Maize, Beans</li>
          <li>Animals: Dairy Cows</li>
          <li>Income (this month): Ksh 42,000</li>
          <li>Balance: Ksh 8,500</li>
        </ul>

        <h3>⭐ Testimonials</h3>
        <p>“Excellent produce quality — highly reliable!” – Local Buyer</p>
        <p>“Always delivers on time and keeps farm neat.” – Peer Farmer</p>
      </div>
    </div>
  );
}
