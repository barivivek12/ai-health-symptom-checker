import { useState } from "react";
import axios from "axios";

function App() {

  const [symptoms, setSymptoms] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Symptom Check
  const handleCheck = async () => {

    // Empty input check
    if (!symptoms) {
      alert("Please enter symptoms");
      return;
    }

    setLoading(true);

    try {

      // ✅ Backend API Call
      const res = await axios.post(
        "http://localhost:5000/api/symptom",
        {
          symptoms
        }
      );

      console.log("API RESPONSE:", res.data);

      setData(res.data);

    } catch (err) {

      console.log("BACKEND ERROR:", err);

      // ✅ Temporary Mock Data
      setData({
        response: {
          possible_conditions: [
            "Viral Fever",
            "Common Cold",
            "Flu"
          ],
          severity: "Medium",
          recommendation:
            "Drink water, take proper rest, and consult a doctor if symptoms continue.",
          warning: "This is not medical advice"
        }
      });

    }

    setLoading(false);
  };

  // ✅ Severity Color
  const getColor = (severity) => {
    if (severity === "High") return "#e74c3c";
    if (severity === "Medium") return "#f39c12";
    return "#2ecc71";
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          🧠 AI Health Symptom Checker
        </h1>

        {/* Input */}
        <textarea
          style={styles.textarea}
          placeholder="Enter symptoms like fever, headache..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        {/* Button */}
        <button
          style={styles.button}
          onClick={handleCheck}
        >
          {loading ? "Analyzing..." : "Check Symptoms"}
        </button>

        {/* Results */}
        {data && (
          <div style={styles.resultCard}>

            <h2>🩺 Results</h2>

            <h3>Possible Conditions:</h3>

            <ul>
              {data.response?.possible_conditions?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p>
              <b>Severity:</b>{" "}
              <span
                style={{
                  color: getColor(data.response?.severity),
                  fontWeight: "bold",
                }}
              >
                {data.response?.severity}
              </span>
            </p>

            <p>
              <b>Recommendation:</b>{" "}
              {data.response?.recommendation}
            </p>

            <p style={styles.warning}>
              ⚠️ {data.response?.warning}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

// ✅ Styles
const styles = {

  page: {
    minHeight: "100vh",
    background: "#eef2f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "800px",
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "42px",
  },

  textarea: {
    width: "100%",
    height: "150px",
    padding: "15px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    resize: "none",
  },

  button: {
    width: "100%",
    marginTop: "20px",
    padding: "15px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
  },

  resultCard: {
    marginTop: "25px",
    background: "#f9fafb",
    padding: "20px",
    borderRadius: "12px",
    lineHeight: "1.8",
  },

  warning: {
    color: "red",
    fontWeight: "bold",
    marginTop: "15px",
  }

};

export default App;