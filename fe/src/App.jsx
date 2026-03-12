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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const predictPrice = async () => {
    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    setPrice(data.predicted_price);
    setLoading(false);
  };

  return (
    <div className="container">

      <div className="card">
        <h1>🏡 House Price Predictor</h1>

        <div className="grid">

          <input name="area" placeholder="Area (sqft)" onChange={handleChange}/>
          <input name="bedrooms" placeholder="Bedrooms" onChange={handleChange}/>
          <input name="bathrooms" placeholder="Bathrooms" onChange={handleChange}/>
          <input name="stories" placeholder="Stories" onChange={handleChange}/>
          <input name="parking" placeholder="Parking" onChange={handleChange}/>

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

        <button onClick={predictPrice}>
          {loading ? "Predicting..." : "Predict Price"}
        </button>

        {price && (
          <div className="result">
            ₹ {Math.round(price).toLocaleString()}
          </div>
        )}

      </div>

    </div>
  );
}

export default App;