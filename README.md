# 🩺 AI HealthMate – AI-Powered Health Symptom Assistant

AI HealthMate is a full-stack MERN web application that uses Generative AI to provide educational health information based on user-described symptoms.

The application accepts symptoms from the user, sends them to a Node.js/Express backend, processes them using the Google Gemini API, and displays possible conditions, severity, recommendations, and warning signs. Symptom analysis history is stored in MongoDB.

> ⚠️ **Disclaimer:** AI HealthMate provides general educational information only. It is not a medical diagnosis and does not replace advice from a qualified healthcare professional.

---

## 📌 Problem Statement

When people experience common health symptoms, they often search online and receive large amounts of unstructured or alarming information.

AI HealthMate provides a simple interface where users can describe their symptoms and receive a structured educational summary containing:

* Possible conditions
* Severity level
* General recommendations
* Warning signs
* Previous analysis history

---

## 🎯 Objectives

* Provide a simple symptom-analysis interface.
* Use Generative AI to organize symptom information.
* Display results in a structured and easy-to-understand format.
* Store previous symptom analyses using MongoDB.
* Detect selected emergency-related symptoms before sending them to the AI service.
* Handle API and database errors gracefully.

---

## ✨ Key Features

### 🤖 AI Symptom Analysis

Users can enter symptoms such as:

> I have a headache and mild fever since morning.

The application sends the symptom information to the backend, which processes it using the Gemini API and returns a structured educational response.

### 📊 Structured Results

The application displays:

* Possible conditions
* Severity level
* General recommendations
* Warning signs

### 🚨 Emergency Detection

The backend checks for selected emergency-related keywords such as:

* Chest pain
* Difficulty breathing
* Unconsciousness
* Heavy bleeding
* Other potentially urgent symptoms

If an emergency-related symptom is detected, the application can provide an urgent-care warning before proceeding with normal AI analysis.

> ⚠️ This feature is a basic safety check and does not diagnose medical emergencies.

### 🗃️ Symptom History

Previous symptom analyses are stored in MongoDB and displayed in the Recent Analyses section.

### 🛡️ Error Handling

The application handles:

* Invalid symptom input
* Gemini API errors
* API rate limits
* Invalid AI responses
* MongoDB connection problems

---

## 🛠️ Technology Stack

### Frontend

* React
* JavaScript
* CSS
* Axios

### Backend

* Node.js
* Express.js
* REST APIs
* Axios

### Database

* MongoDB
* Mongoose

### Artificial Intelligence

* Google Gemini API

### Development Tools

* VS Code
* Git
* GitHub
* npm

---

## 🏗️ Application Workflow

```text
User
  ↓
React Frontend
  ↓
Axios
  ↓
Node.js + Express Backend
  ↓
Emergency Symptom Check
  ↓
Gemini API
  ↓
AI Analysis
  ↓
MongoDB
  ↓
Results Displayed in React
```

---

## 📁 Project Structure

```text
ai-health-symptom-checker/
│
├── client/
│   ├── public/
│   └── src/
│       ├── services/
│       │   └── api.js
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
│
├── models/
│   └── History.js
│
├── routes/
│   ├── history.js
│   └── symptom.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

> **Note:** Keep `User.js` and `auth.js` in this section only if authentication is actually implemented in your current project.

---

## 🔌 API Endpoints

### 1. Health Check

```text
GET /
```

Checks whether the backend server is running.

### 2. Analyze Symptoms

```text
POST /api/symptom
```

Analyzes the symptoms provided by the user.

#### Example Request

```json
{
  "symptoms": "I have a headache and mild fever"
}
```

### 3. Get Symptom History

```text
GET /api/symptom/history
```

Retrieves previously stored symptom analyses.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/barivivek12/ai-health-symptom-checker
cd ai-health-symptom-checker
```

### 2. Install Backend Dependencies

From the project root:

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

> 🔒 Never upload your `.env` file or API keys to GitHub.

---

## ▶️ Run the Application

### Start Backend

From the project root:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd client
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

---

## 💡 Why MERN?

### MongoDB

Used to store symptom analysis history.

### Express.js

Used to create and handle REST APIs.

### React

Used to build the interactive frontend user interface.

### Node.js

Used to run the backend server and handle server-side operations.

The MERN stack allows the frontend, backend, and database to work together using JavaScript-based technologies.

---

## 🔄 How the Application Works

1. The user enters their symptoms in the React interface.
2. React sends the symptoms to the Express backend using Axios.
3. The backend validates the input.
4. Selected emergency-related symptoms are checked.
5. The backend sends the symptoms to the Gemini API.
6. Gemini generates an educational analysis.
7. The backend processes the AI response.
8. The analysis is stored in MongoDB.
9. The results are returned to the React frontend.
10. The user can view the analysis and previous history.

---

## 🚀 Future Enhancements

* User authentication
* Personalized health history
* Doctor consultation integration
* Appointment booking
* Multilingual support
* Voice-based symptom input
* Cloud deployment
* Improved AI response validation

---

## 📚 What I Learned

Through this project, I gained practical experience with:

* React
* JavaScript
* Node.js
* Express.js
* MongoDB
* Mongoose
* REST APIs
* Axios
* Gemini API integration
* Git and GitHub
* Full-stack application architecture
* API error handling
* Environment variable management

---

## 👨‍💻 Project Type

**Full-Stack MERN + Generative AI Project**

```text
React
   +
Node.js
   +
Express.js
   +
MongoDB
   +
Google Gemini API
```

---

## ⚠️ Disclaimer

AI HealthMate provides general educational information only.

It is **not a medical diagnosis** and does not replace advice, diagnosis, or treatment from a qualified healthcare professional.

For serious or emergency symptoms, users should seek appropriate professional medical care immediately.
