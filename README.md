# 🤖 MyInterviewer

> An AI-powered interview practice platform that simulates real interview sessions and provides personalized performance feedback.

**MyInterviewer** is a full-stack web application designed to help students and job seekers practice interviews in a structured, realistic environment.

Users can configure an interview based on their **role, experience level, difficulty, and interview type**, answer AI-generated questions, and receive an AI-powered evaluation of their performance at the end of the session.

---

## ✨ Features

### 🎯 Customizable Interviews

Users can configure their interview based on:

* **Role** — the position they want to practice for
* **Experience Level** — Fresher, Junior, Mid, or Senior
* **Difficulty** — Easy, Medium, or Hard
* **Interview Type** — Technical, HR, or Behavioral

### 🤖 AI-Powered Question Generation

Interview questions are generated using the **Google Gemini API**, allowing the interview to be tailored to the selected role and interview configuration.

### 🧠 AI Answer Evaluation

Submitted answers are analyzed by the AI to evaluate the candidate's response and provide meaningful feedback.

### 📊 Final Performance Report

At the end of an interview, the platform generates an overall evaluation containing:

* Overall Score
* Technical Score
* Communication Score
* Grammar Score
* Strengths
* Areas for Improvement
* Overall Summary
* Suggested Preparation Topics

### 📝 Interview History

Completed interviews are stored so users can review their previous interview sessions and feedback.

### 📈 User Dashboard

The application includes a dedicated user area for accessing:

* Dashboard
* Interview History
* Performance-related information
* User settings

### 🔐 User-Based Data

Interview sessions are associated with individual users so that interview history and performance data can be separated between users.

---

## 🔄 How It Works

```text
                 ┌──────────────────────┐
                 │ Configure Interview  │
                 │                      │
                 │ Role                 │
                 │ Experience           │
                 │ Difficulty           │
                 │ Interview Type       │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Start Interview    │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │  AI Generates        │
                 │  Interview Question  │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   User Submits       │
                 │      Answer          │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Continue Interview │
                 │   Until Completion   │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   AI Evaluates       │
                 │   Overall Performance│
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Final Feedback     │
                 │                      │
                 │ Scores               │
                 │ Strengths            │
                 │ Improvements         │
                 │ Summary              │
                 │ Preparation          │
                 └──────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* HTML
* CSS
* React Router

### Backend

* Node.js
* Express.js
* REST API
* Mongoose

### Database

* MongoDB
* MongoDB Atlas

### AI

* Google Gemini API

### Development Tools

* Git
* GitHub
* Visual Studio Code
* npm

---

## 🏗️ Project Architecture

The application follows a client-server architecture.

```text
MyInterviewer/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── interview/
│   │   │   └── user/
│   │   │       ├── User.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       └── InterviewHistory.jsx
│   │   └── ...
│   └── ...
│
└── backend/
    ├── controllers/
    │   └── interviewController.js
    │
    ├── models/
    │   ├── interviewSession.js
    │   ├── response.js
    │   └── ...
    │
    ├── routes/
    │   └── interviewRoutes.js
    │
    ├── ...
    └── server.js
```

> The structure may evolve as authentication, user management, and additional dashboard functionality are implemented.

---

# 🧩 Core Functionality

## 1. Interview Configuration

When starting an interview, the client sends the interview configuration to the backend.

Example:

```json
{
  "userId": "user-id",
  "role": "Software Engineer",
  "experience": "fresher",
  "difficulty": "medium",
  "interviewType": "Technical"
}
```

The backend creates a new interview session based on these parameters.

---

## 2. Interview Session

Each interview session maintains information such as:

* User
* Role
* Experience level
* Difficulty
* Interview type
* Current question
* User responses
* Session status
* Final feedback

The session progresses question by question until the interview is completed.

---

## 3. Answer Submission

After receiving a question, the user submits their answer.

The answer is associated with the current interview session and processed by the backend.

The interview then continues with the next question.

---

## 4. AI Evaluation

The application uses the Gemini API to analyze the interview and generate meaningful feedback.

The final evaluation is structured into multiple categories:

```text
Overall Score
├── Technical Score
├── Communication Score
└── Grammar Score

Additional Feedback
├── Strengths
├── Improvements
├── Summary
└── Suggested Preparation
```

This makes the feedback more useful than simply providing a single score.

---

# 📊 Dashboard & Interview History

The user dashboard is designed to provide a centralized view of interview activity.

The application retrieves completed interviews associated with the user and displays information such as:

* Interview role
* Experience level
* Difficulty
* Interview type
* Number of questions
* Overall score
* Interview date
* Final feedback

The **Interview History** section allows users to revisit their previous interview performances.

---

# 🔌 API Endpoints

The backend exposes REST API endpoints for managing interview sessions.

### Start Interview

```http
POST /api/interview/start
```

Creates a new interview session.

### Submit Answer

```http
POST /api/interview/:sessionId/answer
```

Submits an answer for the current interview question.

### Get Interview

```http
GET /api/interview/:sessionId
```

Retrieves the interview session and its current state.

### Get Interview Feedback

```http
GET /api/interview/:sessionId/feedback
```

Retrieves the final feedback generated for a completed interview.

### Get All User Feedback

```http
GET /api/interview/:userId/allfeedback
```

Retrieves completed interview feedback associated with a user for the interview history/dashboard.

---

# 🗄️ Database

MongoDB is used to store interview-related data.

The application uses **Mongoose** for schema definition and database interaction.

### Interview Session

An interview session stores information including:

```text
userId
role
experience
difficulty
interviewType
questions / responses
currentQuestionNumber
status
finalFeedback
createdAt
```

### Response

Individual interview responses are stored with their associated question and answer information.

### Final Feedback

The final AI-generated evaluation contains:

```text
overallScore
technicalScore
communicationScore
grammarScore
strengths[]
improvements[]
summary
suggestedPreparation[]
```

---

# 🤖 Gemini Integration

Google Gemini is used as the AI layer of the application.

The AI is responsible for tasks such as:

* Generating interview questions
* Processing candidate responses
* Evaluating interview performance
* Producing structured final feedback

The backend communicates with the Gemini API rather than exposing AI credentials directly to the frontend.

---

# 🔐 Authentication & Security

> 🚧 **Authentication is currently under development.**

The project is being structured to support proper user authentication and protected user-specific resources.

Planned authentication functionality includes:

* User registration
* Email and password authentication
* Password hashing with bcrypt
* JWT-based authentication
* Protected routes
* Email verification
* Password reset
* Rate limiting
* Secure cookie-based authentication

Authentication will replace the current development-stage `userId` based approach with a proper user account system.

---

# ⚙️ Installation

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB / MongoDB Atlas account
* Gemini API key
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/MyInterviewer.git
cd MyInterviewer
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

> Never commit your `.env` file or expose your API keys publicly.

---

## 4. Start the Backend

```bash
npm start
```

The backend will run on:

```text
http://localhost:8080
```

---

## 5. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

## 6. Start the Frontend

```bash
npm run dev
```

The frontend will then be available through the local development server.

---

# 🚀 Usage

1. Open the application.
2. Configure an interview.
3. Select the desired:

   * Role
   * Experience level
   * Difficulty
   * Interview type
4. Start the interview.
5. Read the AI-generated question.
6. Submit your answer.
7. Continue through the interview.
8. Complete the interview session.
9. Review the AI-generated performance report.
10. Revisit previous interviews through the dashboard/history section.

---

# 📌 Current Development Status

### ✅ Implemented

* [x] Interview configuration
* [x] Interview session creation
* [x] Role-based interview setup
* [x] Experience-level selection
* [x] Difficulty selection
* [x] Interview-type selection
* [x] AI-generated interview questions
* [x] Answer submission
* [x] Interview session management
* [x] Interview completion flow
* [x] AI-generated final feedback
* [x] Overall performance scoring
* [x] Technical scoring
* [x] Communication scoring
* [x] Grammar scoring
* [x] Strengths and improvement suggestions
* [x] Suggested preparation topics
* [x] Interview history foundation
* [x] User dashboard foundation

### 🚧 In Progress

* [ ] User schema
* [ ] User registration/login
* [ ] JWT authentication
* [ ] Protected routes
* [ ] Email verification
* [ ] Password reset
* [ ] Complete user dashboard
* [ ] Performance analytics
* [ ] User settings

### 🔮 Planned

* [ ] Speech-to-text interview answers
* [ ] Voice-based interview interaction
* [ ] More advanced performance analytics
* [ ] Interview performance trends
* [ ] Improved AI personalization
* [ ] More interview categories
* [ ] Personalized preparation recommendations

---

# 🎯 Future Vision

The goal of AI Interviewer is to evolve from a simple interview-practice application into a **personalized AI interview preparation platform**.

Future versions could help users identify recurring weaknesses across multiple interviews and generate targeted preparation plans based on their performance.

For example:

```text
Interview History
       │
       ▼
Performance Analysis
       │
       ▼
Identify Weak Areas
       │
       ▼
Personalized Preparation
       │
       ▼
Better Future Interviews
```

---

# 🧠 What I Learned

This project is helping me gain practical experience with:

* Full-stack application architecture
* React-based frontend development
* REST API design
* Express.js backend development
* MongoDB data modeling
* Mongoose
* AI API integration
* Managing multi-step application workflows
* Structured AI responses
* User-specific data handling
* Dashboard and history design
* Error handling and middleware
* Building a real-world application rather than isolated features

---

# 📸 Screenshots

> Screenshots will be added as the application UI reaches a more finalized state.

Suggested screenshots:

* Landing page
* Interview configuration
* Interview screen
* Final feedback
* User dashboard
* Interview history

---

# 🗺️ Development Roadmap

```text
Interview Engine
      │
      ├── AI Questions              ✅
      ├── Answer Submission         ✅
      ├── Interview Completion      ✅
      └── AI Feedback               ✅
                │
                ▼
        User Management
                │
                ├── User Schema     🚧
                ├── Authentication   🚧
                └── Protected APIs  🚧
                │
                ▼
          User Dashboard
                │
                ├── History         🚧
                ├── Analytics       🔮
                └── Performance     🔮
                │
                ▼
          AI Improvements
                │
                ├── Speech-to-Text  🔮
                ├── Voice Interview 🔮
                └── Personalization 🔮
```

---

# 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

If you'd like to contribute:

```bash
# Fork the repository

# Create a new branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "Add your feature"

# Push the branch
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📄 License

This project is currently developed as a personal learning and portfolio project.

A formal open-source license may be added in a future release.

---

# 👨‍💻 Author

**Asmita Chowdhury**

B.Tech Computer Science & Engineering

Interested in full-stack development, AI-integrated applications, and software engineering.

---

⭐ If you find this project interesting, consider giving the repository a star!
