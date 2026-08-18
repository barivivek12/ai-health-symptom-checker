import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Analyze user symptoms
export const analyzeSymptoms = async (symptoms) => {
  try {
    const res = await api.post("/symptom", { symptoms });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Fetch recent symptom analysis history
export const getHistory = async () => {
  try {
    const res = await api.get("/history");
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete a history entry
export const deleteHistoryItem = async (id) => {
  try {
    const res = await api.delete(`/history/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

const apiService = {
  analyzeSymptoms,
  getHistory,
  deleteHistoryItem,
};

export default apiService;
