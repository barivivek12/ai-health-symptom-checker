# 🩺 AI HealthMate – AI-Powered Health Symptom Assistant

AI HealthMate is a full-stack MERN web application that uses Generative AI to provide educational health information based on user-described symptoms.

The application accepts symptoms from the user, sends them to a Node.js/Express backend, processes them using the Gemini API, and displays possible conditions, severity, recommendations, and warning signs. Symptom analysis history is stored in MongoDB.

> ⚠️ **Disclaimer:** This application provides general educational information and is not a medical diagnosis. Users should consult a qualified healthcare professional for medical advice.

---

## 📌 Problem Statement

When people experience common health symptoms, they often search online and receive large amounts of unstructured or alarming information.

AI HealthMate provides a simple interface where users can describe their symptoms and receive a structured educational summary containing:

- Possible conditions
- Severity level
- General recommendations
- Warning signs
- Previous analysis history

---

## 🎯 Objectives

- Provide a simple symptom-analysis interface.
- Use Generative AI to organize symptom information.
- Display results in a structured and easy-to-understand format.
- Store previous symptom analyses using MongoDB.
- Detect selected emergency-related symptoms before sending them to the AI service.
- Handle API and database errors gracefully.

---

## ✨ Key Features

### 🤖 AI Symptom Analysis

Users can enter symptoms such as:

```text
I have a headache and mild fever since morning.

### 📊 Structured Results

The application displays:

- Possible conditions
- Severity
- Recommendations
- Warning signs

### 🚨 Emergency Detection

The backend checks selected emergency-related symptoms such as:

- Chest pain
- Difficulty breathing
- Unconsciousness
- Heavy bleeding
- Heart attack

### 🗃️ Symptom History

Previous symptom analyses are stored in MongoDB and displayed in the Recent Analyses section.

### 🛡️ Error Handling

The application handles:

- Invalid symptom input
- Gemini API errors
- API rate limits
- Invalid AI responses
- MongoDB connection problems

---

## 🛠️ Technology Stack

### Frontend

- React
- JavaScript
- CSS
- Axios

### Backend

- Node.js
- Express.js
- REST APIs
- Axios

### Database

- MongoDB
- Mongoose

### AI

- Google Gemini API

### Tools

- VS Code
- Git
- GitHub
- npm

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
Gemini API
  ↓
AI Analysis
  ↓
MongoDB
  ↓
Results displayed in React

---

## 📁 Project Structure

```text
ai-health-symtom-checker/
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
│   ├── History.js
│   └── User.js
│
├── routes/
│   ├── auth.js
│   ├── history.js
│   └── symptom.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md




```markdown
---

## 🔌 API Endpoints

### Health Check

```text
GET /

Checks whether the backend server is running.

### Analyze Symptoms

```text
POST /api/symptom

Example request:

```json
{
  "symptoms": "I have a headache and mild fever"
}

### Get Symptom History

```text
GET /api/symptom/history

Retrieves previously stored symptom analyses.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/barivivek12/ai-health-symptom-checker
cd ai-health-symtom-checker

### 2. Install Backend Dependencies

```bash
npm install

### 3. Install Frontend Dependencies

```bash
cd client
npm install
cd ..

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key

---

## ▶️ Run the Application

### Start Backend

From the project root:

```bash
npm start

Backend runs on:

```text
http://localhost:5000

### Start Frontend

Open another terminal:

```bash
cd client
npm start

Frontend runs on:

```text
http://localhost:3000

---

## 💡 Why MERN?

- **MongoDB** – stores symptom analysis history.
- **Express.js** – handles REST APIs.
- **React** – provides the interactive user interface.
- **Node.js** – runs the backend server.

---

## 🚀 Future Enhancements

- User authentication
- Personalized health history
- Doctor consultation integration
- Appointment booking
- Multilingual support
- Voice-based symptom input
- Cloud deployment
- Improved AI response validation

---

## 📚 What I Learned

Through this project, I worked with:

- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- Axios
- Gemini API integration
- Git and GitHub
- Full-stack application architecture

---

## 👨‍💻 Project Type

**Full-Stack MERN + Generative AI Project**

React + Node.js + Express.js + MongoDB + Gemini API

---

## ⚠️ Disclaimer

AI HealthMate provides general educational information only.

It is not a medical diagnosis and does not replace advice from a qualified healthcare professional.