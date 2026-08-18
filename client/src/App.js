import { useState, useEffect } from "react";
import "./App.css";
import { analyzeSymptoms, getHistory, deleteHistoryItem } from "./services/api";

function App() {
  const [symptoms, setSymptoms] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeHistoryId, setActiveHistoryId] = useState(null);
  const [dbConnected, setDbConnected] = useState(true);

  // Load history on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const historyData = await getHistory();
      setHistory(historyData);
      setDbConnected(true);
    } catch (err) {
      console.warn("Could not fetch history (MongoDB might be offline):", err);
      setDbConnected(false);
    }
  };

  const handleCheck = async () => {
    if (!symptoms.trim()) {
      setError("Please enter your symptoms to run an analysis.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setActiveHistoryId(null);

    try {
      const res = await analyzeSymptoms(symptoms);
      setData(res.response);
      
      // Update DB connection status based on backend saved flag
      if (res.dbSaved !== undefined) {
        setDbConnected(res.dbSaved);
      }
      
      // Refresh history panel
      await fetchHistory();
    } catch (err) {
      console.error("Analysis failed:", err);
      if (err.error) {
        setError(err.error);
      } else {
        setError("AI service is temporarily busy. Please wait a moment and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSymptoms("");
    setError(null);
  };

  const handleDeleteHistory = async (e, id) => {
    e.stopPropagation(); // Prevent selecting the item when deleting
    try {
      await deleteHistoryItem(id);
      if (activeHistoryId === id) {
        setData(null);
        setActiveHistoryId(null);
      }
      await fetchHistory();
    } catch (err) {
      console.error("Failed to delete history item:", err);
      alert("Unable to delete history entry at this moment.");
    }
  };

  const handleSelectHistoryItem = (item) => {
    setError(null);
    setActiveHistoryId(item._id);
    setSymptoms(item.symptoms);
    
    const possible_conditions = item.possible_conditions || item.response?.possible_conditions || [];
    const severity = item.severity || item.response?.severity || "Low";
    const recommendation = item.recommendation || item.response?.recommendation || "";
    const warning_signs = item.warning_signs || item.response?.warning_signs || item.response?.warning || "";

    setData({
      possible_conditions,
      severity,
      recommendation,
      warning_signs
    });
  };

  const handleCheckAnother = () => {
    setData(null);
    setActiveHistoryId(null);
    setSymptoms("");
    setError(null);
  };

  const getSeverityClass = (severity) => {
    if (!severity) return "low";
    const s = severity.toLowerCase();
    if (s === "high" || s === "emergency") return "high";
    if (s === "medium" || s === "moderate") return "medium";
    return "low";
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="app-container">
      {/* HEADER SECTION */}
      <header className="app-header">
        <div className="header-content">
          <div className="brand-section">
            <div className="logo-icon">🩺</div>
            <div>
              <h1 className="brand-name">AI <span>HealthMate</span></h1>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>
                AI-Powered Health Symptom Assistant
              </p>
            </div>
          </div>

          <div></div>
        </div>
      </header>

      {/* MAIN LAYOUT SPLIT */}
      <main className="main-layout">
        <div className="workspace-area">
          {/* Hero segment */}
          {!loading && !data && (
            <div className="hero-section fade-in">
              <h2 className="hero-title">Understand Your Symptoms with AI</h2>
              <p className="hero-subtitle">
                Get quick, AI-powered health educational summaries based on the symptoms you describe. Fast, private, and smart.
              </p>
            </div>
          )}

          {/* ERROR DISPLAY */}
          {error && (
            <div className="alert-banner fade-in">
              <span>⚠️</span>
              <div>{error}</div>
            </div>
          )}

          {/* MAIN APP WORKSPACE CONTAINER */}
          {!loading && !data && (
            <div className="card fade-in">
              <h3 className="card-title">🔍 New Symptom Assessment</h3>
              <div className="input-group">
                <label style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-muted)" }}>
                  Describe what you are feeling:
                </label>
                <div className="textarea-wrapper">
                  <textarea
                    className="textarea-symptoms"
                    placeholder="Example: I have a throbbing headache since this morning, mild fever, and a sore throat..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value.slice(0, 500))}
                  />
                  <div className="char-counter">
                    {symptoms.length}/500 chars
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  className="btn btn-outline"
                  onClick={handleClear}
                  disabled={!symptoms}
                >
                  Clear
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleCheck}
                  disabled={!symptoms.trim()}
                >
                  Analyze Symptoms 🚀
                </button>
              </div>
            </div>
          )}

          {/* LOADING STATE CARD */}
          {loading && (
            <div className="card loading-panel fade-in">
              <div className="pulse-circle">
                <div className="pulse-circle-icon">🤖</div>
              </div>
              <div>
                <h3 className="loading-text">Analyzing Symptoms...</h3>
                <p className="loading-subtext">Consulting safety medical guidelines and Gemini API</p>
              </div>
              <div style={{ marginTop: "12px" }}>
                <span className="spinner"></span>
              </div>
            </div>
          )}

          {/* RESULT CARD DASHBOARD */}
          {!loading && data && (
            <div className="card results-dashboard fade-in">
              <div className="results-header-row">
                <h3 className="card-title" style={{ marginBottom: 0 }}>🩺 Assessment Results</h3>
                
                <div className="severity-container">
                  <span className="severity-label">Symptom Severity:</span>
                  <span className={`severity-badge ${getSeverityClass(data.severity)}`}>
                    {data.severity || "Low"}
                  </span>
                </div>
              </div>

              {/* Possible Conditions */}
              <div>
                <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "8px", color: "var(--text-main)" }}>
                  Possible Conditions:
                </h4>
                <div className="conditions-grid">
                  {data.possible_conditions && data.possible_conditions.length > 0 ? (
                    data.possible_conditions.map((condition, i) => (
                      <span className="condition-tag" key={i}>{condition}</span>
                    ))
                  ) : (
                    <span className="condition-tag">Undetermined condition</span>
                  )}
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="info-box recommendation">
                <div className="info-box-icon">💡</div>
                <div className="info-box-content">
                  <h4 className="info-box-title">Recommendation & Self Care</h4>
                  <p className="info-box-text">{data.recommendation || "Rest, hydrate, and monitor your symptoms."}</p>
                </div>
              </div>

              {/* Warning Signs Alert Card */}
              <div className="info-box warning">
                <div className="info-box-icon">🚨</div>
                <div className="info-box-content">
                  <h4 className="info-box-title">Warning Signs (When to see a Doctor)</h4>
                  <p className="info-box-text">{data.warning_signs || "If symptoms worsen, persist, or you experience extreme pain, seek medical help immediately."}</p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="disclaimer-box">
                🛡️ <strong>Disclaimer:</strong> This tool provides general educational information and is not a medical diagnosis. Consult a qualified healthcare professional for medical advice.
              </div>

              <div className="form-actions" style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                <button className="btn btn-outline" onClick={handleCheckAnother}>
                  Check Another Symptom
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR RECENT ANALYSES */}
        <div className="card sidebar-history">
          <div className="history-header">
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-main)" }}>
              📅 Recent Analyses
            </h3>
            <span style={{ fontSize: "12px", background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", color: "var(--text-muted)", fontWeight: "600" }}>
              {history.length} records
            </span>
          </div>

          <div className="history-list">
            {history.length > 0 ? (
              history.map((item) => (
                <div
                  key={item._id}
                  className={`history-item ${activeHistoryId === item._id ? "active" : ""}`}
                  onClick={() => handleSelectHistoryItem(item)}
                >
                  <div className="history-item-top">
                    <span className="history-item-symptoms" title={item.symptoms}>
                      {item.symptoms}
                    </span>
                    <button
                      className="btn-delete"
                      onClick={(e) => handleDeleteHistory(e, item._id)}
                      title="Delete entry"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div className="history-item-meta">
                    <span className="history-conditions-preview">
                      {item.possible_conditions?.slice(0, 2).join(", ") || 
                       item.response?.possible_conditions?.slice(0, 2).join(", ") || 
                       "Undetermined"}
                    </span>
                    <span className={`history-mini-badge ${getSeverityClass(item.severity || item.response?.severity)}`}>
                      {item.severity || item.response?.severity || "Low"}
                    </span>
                  </div>

                  <div className="history-item-date">
                    {formatDate(item.createdAt)}
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-history-text">
                No recent analyses. Your completed assessments will appear here.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;