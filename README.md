# AI Interview Prep App

An AI-powered full-stack web application that helps users prepare for interviews by analyzing their resume, self-description, and job description to generate a personalized interview report.

## Features

- User authentication with login and registration
- Upload resume and target job description
- Generate AI-based interview preparation reports
- Technical interview questions with answer guidance
- Behavioral interview questions with answer guidance
- Skill gap analysis
- 7-day preparation plan
- Generate ATS-friendly resume PDF
- View and manage previously generated reports

## Tech Stack

### Frontend
- React
- Vite
- SCSS
- Axios
- React Router

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Puppeteer
- Google GenAI API

## Project Structure

```bash
webdev-genai/
│
├── Backend/
│   ├── config/
│   ├── models/
│   ├── src/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
└── .gitignore
