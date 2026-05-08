import { useState } from "react";
import axios from "axios";

function App() {

  const [symptoms, setSymptoms] = useState("");
  const [data, setData] = useState(null);

  const handleCheck = async () => {

    if (!symptoms) {
      alert("Please enter symptoms");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/symptom",
        {
          symptoms
        }
      );

      setData(res.data);

    } catch (err) {

      console.log(err);

      // fallback demo data
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
  };

  const getColor = (severity) => {

    if (severity === "High") return "red";

    if (severity === "Medium") return "orange";

    return "green";
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          🧠 AI Health Symptom Checker
        </h1>

        <textarea
          style={styles.textarea}
          placeholder="Enter symptoms..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleCheck}
        >
          Check Symptoms
        </button>

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
                  fontWeight: "bold"
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

const styles = {

  page: {
    minHeight: "100vh",
    background: "#eef2f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  card: {
    width: "800px",
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)"
  },

  title: {
    textAlign: "center",
    marginBottom: "20px"
  },

  textarea: {
    width: "100%",
    height: "150px",
    padding: "15px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "1px solid #ccc"
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
    cursor: "pointer"
  },

  resultCard: {
    marginTop: "25px",
    background: "#f9fafb",
    padding: "20px",
    borderRadius: "12px"
  },

  warning: {
    color: "red",
    fontWeight: "bold"
  }
};

export default App;