# AI HealthMate – AI-Powered Health Symptom Assistant

AI HealthMate is a polished, interview-ready full-stack MERN (MongoDB, Express, React, Node.js) web application that helps users analyze symptoms and understand potential health conditions using the Gemini AI API. It features a modern, clean, responsive healthcare SaaS UI, symptom history logs, and graceful error fallbacks.

---

## 📋 Problem Statement

When experiencing mild health symptoms, individuals often turn to search engines, encountering cluttered, alarmist, and unorganized search results. This leads to unnecessary anxiety or delay in consulting doctors. 

**AI HealthMate** bridges this gap by providing:
1. Structured, non-alarmist health summaries based on user-described symptoms.
2. Color-coded severity indicators to gauge urgency.
3. Actionable recommendation lists and clear, prominent warning signs.
4. Persistent local search history, enabling tracking of symptoms over time.

---

## ⚙️ Technology Stack

### **Frontend**
*   **React (v19)**: Core UI framework with functional components and hooks.
*   **Axios**: Promise-based HTTP client for calling backend REST APIs.
*   **CSS3**: Custom variables, fluid Flexbox/Grid layouts, and modern transition animations.
*   **Google Fonts**: *Plus Jakarta Sans* for premium typography.

### **Backend**
*   **Node.js & Express.js**: REST API hosting and route controllers.
*   **Axios**: Server-side request handling for the Gemini API.
*   **Dotenv**: Environment variable isolation for API keys and connection strings.

### **Database**
*   **MongoDB & Mongoose**: Document storage for persisting symptom histories.

---

## 📐 System Architecture

The following diagram illustrates the data flow of the application:

```
+-----------------------------------------------------------+
|                        React UI                           |
|  - Described Symptoms  - Severity Badge  - Recommendations|
+-----------------------------+-----------------------------+
                              | (POST /api/symptom)
                              v
+-----------------------------------------------------------+
|                     Express REST API                      |
|  - Validations  - 429 Error Handling  - Emergency Check   |
+--------------+-----------------------------+--------------+
               |                             |
               | (Save History)              | (Generate Content Request)
               v                             v
+--------------------------+   +----------------------------+
|         MongoDB          |   |      Google Gemini API     |
|   (Mongoose Schema)      |   |   (gemini-2.5-flash model) |
+--------------------------+   +----------------------------+
```

---

## 📡 API Endpoints

### **1. Symptom Analysis**
*   **Endpoint**: `POST /api/symptom`
*   **Request Body**:
    ```json
    {
      "symptoms": "headache and mild fever since morning"
    }
    ```
*   **Response**:
    ```json
    {
      "response": {
        "possible_conditions": ["Viral Fever", "Common Cold", "Tension Headache"],
        "severity": "Medium",
        "recommendation": "Hydrate, rest, and monitor body temperature.",
        "warning_signs": "Seek immediate care if temperature exceeds 103°F or stiff neck occurs."
      },
      "dbSaved": true
    }
    ```

### **2. History Logs**
*   **Endpoint**: `GET /api/history`
*   **Response**: Array of historical assessments sorted by `createdAt` descending.

### **3. Delete History Record**
*   **Endpoint**: `DELETE /api/history/:id`
*   **Response**:
    ```json
    {
      "message": "History record deleted successfully"
    }
    ```

---

## 🛠️ Installation & Setup

Follow these steps to set up the project locally:

### **1. Clone & Configure the Backend**
In the root directory of the project, create a `.env` file containing:

```env
MONGO_URI=mongodb://localhost:27017/ai-health
GEMINI_API_KEY=your_google_gemini_api_key
```

Install the backend dependencies:
```bash
npm install
```

### **2. Install Frontend Dependencies**
Navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

---

## 🚀 How to Run

You need to run the backend server and frontend client in separate terminals:

### **Terminal 1: Start Backend**
Run this command in the project root directory:
```bash
npm start
```
*Expected console output:*
```
Server running on port 5000
MongoDB Connected ✅
```

### **Terminal 2: Start Frontend**
Navigate to the `client` directory and start the React development server:
```bash
cd client
npm start
```
This opens the application in your browser at `http://localhost:3000`.

---

## 🗣️ Interview Discussion Guide & Q&A

Use this section to prepare for placement interview questions about this project:

### **1. How does the backend communicate with the Gemini API?**
> "We call the Gemini API using Axios POST requests pointing to the `gemini-2.5-flash` model endpoint. We send a system instruction prompt asking the model to parse the user's symptoms and output a strictly formatted JSON string. We then clean and parse this JSON on the backend, making it robust against malformed LLM outputs, before sending it to the client."

### **2. How did you handle errors and API rate limits (HTTP 429)?**
> "We wrapped the Axios call in a try/catch block. If the Gemini API returns an HTTP 429 status code, we catch it specifically and send a user-friendly error message: *'AI service is temporarily busy. Please wait a moment and try again.'* This prevents frontend crashes and keeps the user informed without looping retry requests."

### **3. Why did you decide to implement a MongoDB history feature?**
> "Adding history turns this from a stateless utility into a MERN-style web application. It demonstrates database persistence, Mongoose schemas, and routes orchestration (POST, GET, DELETE). It's also a practical feature for users to track their symptom assessments over time."

### **4. What happens if the MongoDB database goes offline? Will the app crash?**
> "No, the application degrades gracefully. In our POST route, the database save operation is wrapped in a secondary try/catch block that verifies if `mongoose.connection.readyState === 1`. If MongoDB is offline, it skips saving to history but still returns the Gemini AI analysis back to the React UI. A status dot in the React header also dynamically alerts the user when history logging is offline."

---

## 🔮 Future Improvements
*   **User Authentication**: Implement JWT signup/login so users only see their own search histories.
*   **Telehealth Integration**: Add a button to book virtual consultations with real doctors.
*   **PDF Report Generation**: Allow downloading symptom assessment summaries as print-friendly PDF files.
