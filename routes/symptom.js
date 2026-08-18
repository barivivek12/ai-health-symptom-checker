const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const History = require("../models/History");

router.post("/", async (req, res) => {
  const symptoms = req.body?.symptoms;

  // ✅ Prevent crashes
  if (!symptoms || !symptoms.trim()) {
    return res.status(400).json({
      error: "Symptoms are required"
    });
  }

  // ✅ Emergency detection
  const lowerSymptoms = symptoms.toLowerCase();
  if (
    lowerSymptoms.includes("chest pain") ||
    lowerSymptoms.includes("breathing problem") ||
    lowerSymptoms.includes("unconscious") ||
    lowerSymptoms.includes("heavy bleeding") ||
    lowerSymptoms.includes("difficulty breathing") ||
    lowerSymptoms.includes("heart attack")
  ) {
    const emergencyResponse = {
      possible_conditions: ["Cardiovascular Emergency / Respiratory Distress"],
      severity: "High",
      recommendation: "🚨 Seek immediate emergency medical attention! Call 911 or visit the nearest emergency room.",
      warning_signs: "Critical emergency indicators detected (e.g., chest pain, breathing difficulty, or loss of consciousness)."
    };

    // Save emergency to history if DB is active
    let savedToDb = false;
    try {
      if (mongoose.connection.readyState === 1) {
        await History.create({
          symptoms,
          possible_conditions: emergencyResponse.possible_conditions,
          severity: emergencyResponse.severity,
          recommendation: emergencyResponse.recommendation,
          warning_signs: emergencyResponse.warning_signs
        });
        savedToDb = true;
      }
    } catch (dbErr) {
      console.error("Failed to save emergency symptom history:", dbErr.message);
    }

    return res.json({
      response: emergencyResponse,
      dbSaved: savedToDb
    });
  }

  try {
    const response = await axios.post(
     `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are a safe AI health assistant.
Analyze the user's symptoms and return possible conditions, severity (Low, Medium, High), a general recommendation, and warning signs.
You must respond ONLY with a valid JSON block containing these exact keys, without any additional text or preambles:
{
  "possible_conditions": ["Condition 1", "Condition 2"],
  "severity": "Low" | "Medium" | "High",
  "recommendation": "Your recommendations...",
  "warning_signs": "Warning signs or when to see a doctor..."
}

Symptoms: ${symptoms}
`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const rawText = response.data.candidates[0].content.parts[0].text;

    // ✅ Robustly extract JSON block
    let cleanedText = rawText.trim();
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedText = jsonMatch[0];
    } else {
      cleanedText = cleanedText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (parseErr) {
      console.warn("JSON parsing failed, attempting fallback:", parseErr.message);
      parsed = {
        possible_conditions: ["General Illness"],
        severity: "Medium",
        recommendation: "Please consult a healthcare professional for accurate diagnosis.",
        warning_signs: rawText.substring(0, 500)
      };
    }

    // Normalize fields
    const possible_conditions = Array.isArray(parsed.possible_conditions) ? parsed.possible_conditions : [parsed.possible_conditions || "General Illness"];
    const severity = ["Low", "Medium", "High"].includes(parsed.severity) ? parsed.severity : "Medium";
    const recommendation = parsed.recommendation || "Drink fluids and rest.";
    const warning_signs = parsed.warning_signs || parsed.warning || "Seek professional medical diagnosis if symptoms worsen.";

    // ✅ Save history (Graceful MongoDB handling)
    let savedToDb = false;
    try {
      if (mongoose.connection.readyState === 1) {
        await History.create({
          symptoms,
          possible_conditions,
          severity,
          recommendation,
          warning_signs
        });
        savedToDb = true;
      } else {
        console.warn("MongoDB is not connected. Skipping history save.");
      }
    } catch (dbErr) {
      console.error("Failed to save symptom history to MongoDB:", dbErr.message);
    }

    // ✅ Send response
    res.json({
      response: {
        possible_conditions,
        severity,
        recommendation,
        warning_signs
      },
      dbSaved: savedToDb
    });

  } catch (err) {
    console.error("BACKEND ERROR:");
    if (err.response) {
      console.error(err.response.data || err.response.statusText);
      if (err.response.status === 429) {
        return res.status(429).json({
          error: "AI service is temporarily busy. Please wait a moment and try again."
        });
      }
    } else {
      console.error(err.message);
    }

    res.status(500).json({
      error: "AI HealthMate backend is unable to process your request at this moment."
    });
  }
});


// ✅ History Route
router.get("/history", async (req, res) => {

  try {

    const history = await History.find().sort({
      createdAt: -1
    });

    res.json(history);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;