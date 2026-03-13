import { useState } from "react";
import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    stories: "",
    parking: "",
    mainroad_yes: 0,
    guestroom_yes: 0,
    basement_yes: 0,
    hotwaterheating_yes: 0,
    airconditioning_yes: 0,
    prefarea_yes: 0,
    furnishingstatus_semi_furnished: 0,
    furnishingstatus_unfurnished: 0
  });

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: Number(value)
    });

    setError("");
  };

  const predictPrice = async () => {

    const requiredFields = [
      "area",
      "bedrooms",
      "bathrooms",
      "stories",
      "parking"
    ];

    for (let field of requiredFields) {
      if (formData[field] === "") {
        setError("Please fill Area, Bedrooms, Bathrooms, Stories and Parking");
        return;
      }
    }

    try {
      setLoading(true);
      setError("");
      // const res = await fetch("http://127.0.0.1:8000/predict/", {

      const res = await fetch("https://full-stack-house-price-prediction-fast.onrender.com/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Prediction failed");
      }

      const data = await res.json();
      setPrice(data.predicted_price);

    } catch (err) {
      console.error(err);
      setError("Server error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <div className="card">
        <h1>🏡 House Price Predictor</h1>

        <div className="grid">

          <input
            name="area"
            placeholder="Area (sqft)"
            onChange={handleChange}
          />

          <input
            name="bedrooms"
            placeholder="Bedrooms"
            onChange={handleChange}
          />

          <input
            name="bathrooms"
            placeholder="Bathrooms"
            onChange={handleChange}
          />

          <input
            name="stories"
            placeholder="Stories"
            onChange={handleChange}
          />

          <input
            name="parking"
            placeholder="Parking"
            onChange={handleChange}
          />

          <select name="mainroad_yes" onChange={handleChange}>
            <option value="0">Main Road - No</option>
            <option value="1">Main Road - Yes</option>
          </select>

          <select name="guestroom_yes" onChange={handleChange}>
            <option value="0">Guest Room - No</option>
            <option value="1">Guest Room - Yes</option>
          </select>

          <select name="basement_yes" onChange={handleChange}>
            <option value="0">Basement - No</option>
            <option value="1">Basement - Yes</option>
          </select>

          <select name="hotwaterheating_yes" onChange={handleChange}>
            <option value="0">Hot Water Heating - No</option>
            <option value="1">Hot Water Heating - Yes</option>
          </select>

          <select name="airconditioning_yes" onChange={handleChange}>
            <option value="0">AC - No</option>
            <option value="1">AC - Yes</option>
          </select>

          <select name="prefarea_yes" onChange={handleChange}>
            <option value="0">Preferred Area - No</option>
            <option value="1">Preferred Area - Yes</option>
          </select>

          <select name="furnishingstatus_semi_furnished" onChange={handleChange}>
            <option value="0">Semi Furnished - No</option>
            <option value="1">Semi Furnished - Yes</option>
          </select>

          <select name="furnishingstatus_unfurnished" onChange={handleChange}>
            <option value="0">Unfurnished - No</option>
            <option value="1">Unfurnished - Yes</option>
          </select>

        </div>

        {/* Error message */}
        {error && <p className="error">{error}</p>}

        <button onClick={predictPrice} disabled={loading}>
          {loading ? "🤖 AI Predicting..." : "🚀 Predict Price"}
        </button>

        {price !== null && (
          <div className="result">
            ₹ {Math.round(price).toLocaleString()}
          </div>
        )}

      </div>

    </div>
  );
}

export default App;