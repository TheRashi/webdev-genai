import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "../Style/interview.scss"
import { FiDownload } from "react-icons/fi"


const Interview = () => {
  const { interviewId } = useParams()

  const [interviewData, setInterviewData] = useState(null)
  const [activeSection, setActiveSection] = useState("technical")
  const [loading, setLoading] = useState(true)
  const [downloadingResume, setDownloadingResume] = useState(false)

  useEffect(() => {
  const fetchInterviewReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/interview/report/${interviewId}`,
        { withCredentials: true }
      )

      const reportDoc = response.data.interviewReport

      const aiData =
        reportDoc.aiReport ||
        reportDoc.interviewReport ||
        reportDoc.report ||
        {}

      const finalData = {
        ...reportDoc,
        ...aiData,

        technicalQuestions:
          aiData.technicalQuestions ||
          aiData.technicalInterviewQuestions ||
          aiData.questions?.technical ||
          [],

        behavioralQuestions:
          aiData.behavioralQuestions ||
          aiData.behavioralInterviewQuestions ||
          aiData.questions?.behavioral ||
          [],

        preparationPlan:
          aiData.preparationPlan ||
          aiData.roadmap ||
          aiData.preparationRoadmap ||
          [],

        skillGaps:
          aiData.skillGaps ||
          aiData.skillsGap ||
          [],

        matchScore:
          reportDoc.matchScore ||
          aiData.matchScore ||
          0,
      }

      setInterviewData(finalData)
      console.log("FINAL DATA:", finalData)
    } catch (error) {
      console.log("FETCH INTERVIEW ERROR:", error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  fetchInterviewReport()
}, [interviewId])
const handleDownloadResume = async () => {
  console.log("Download clicked")
  setDownloadingResume(true)

  try {
    const response = await fetch(
      `http://localhost:3000/api/interview/resume/pdf/${interviewId}`,
      {
        method: "POST",
        credentials: "include",
      }
    )

    if (!response.ok) {
      alert("Resume download failed")
      return
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "resume.pdf"
    document.body.appendChild(a)
    a.click()
    a.remove()

    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.log(error)
    alert("Resume download failed")
  } finally {
    setDownloadingResume(false)
  }
}

  const renderSkillGapTags = () => {
  const skillGaps = interviewData?.skillGaps || []

  if (!skillGaps.length) return null

  return skillGaps.map((skill, idx) => {
    const severity = (skill.severity || "High").toLowerCase().trim()

    return (
      <span key={idx} className={`skill-tag skill-${severity}`}>
        {skill.skill || skill.title || skill.name || skill}
      </span>
    )
  })
}
  const renderMainContent = () => {
    if (activeSection === "technical") {
      return (
        <div className="content-section">
          <h2 className="content-title">Technical Questions</h2>

          <div className="questions-list">
            {(interviewData?.technicalQuestions || []).map((q, idx) => (
  <div key={idx} className="question-card">
    <h3>{q.question || q}</h3>
    <p><strong>Intent:</strong> {q.intention || q.intent || "Practice this question"}</p>
    <p className="answer-text">{q.answer || q.sampleAnswer || ""}</p>
  </div>
))}
          </div>
        </div>
      )
    }

    if (activeSection === "behavioral") {
      return (
        <div className="content-section">
          <h2 className="content-title">Behavioral Questions</h2>

          <div className="questions-list">
            {(interviewData?.behavioralQuestions || []).map((q, idx) => (
  <div key={idx} className="question-card">
    <h3>{q.question || q}</h3>
    <p><strong>Intent:</strong> {q.intention || q.intent || "Practice this question"}</p>
    <p className="answer-text">{q.answer || q.sampleAnswer || ""}</p>
  </div>
))}
          </div>
        </div>
      )
    }

    if (activeSection === "roadmap") {
      return (
        <div className="content-section">
          <h2 className="content-title">7-Day Preparation Plan</h2>

          <div className="roadmap-list">
            {(interviewData?.preparationPlan || interviewData?.roadmap || []).map((day, idx) => (
  <div key={idx} className="roadmap-day">
    <h3>{day.day ? `Day ${day.day}` : day.title || `Day ${idx + 1}`}</h3>
    <p>{day.focus || day.description || ""}</p>

    <ul>
      {(day.tasks || day.steps || []).map((task, taskIdx) => (
        <li key={taskIdx}>{task}</li>
      ))}
    </ul>
  </div>
))}
          </div>
        </div>
      )
    }

    return null
  }

  if (loading) {
    return <h1 style={{ color: "white" }}>Loading...</h1>
  }

  if (!interviewData) {
    return <h1 style={{ color: "white" }}>No interview report found</h1>
  }
  const score = interviewData.matchScore || 0

const scoreClass =
  score >= 80 ? "score-high" : score >= 50 ? "score-medium" : "score-low"

  return (
    <div className="interview-container">
      <aside className="sidebar sidebar-left">
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeSection === "technical" ? "active" : ""}`}
            onClick={() => setActiveSection("technical")}
          >
            Technical questions
          </button>

          <button
            className={`nav-item ${activeSection === "behavioral" ? "active" : ""}`}
            onClick={() => setActiveSection("behavioral")}
          >
            Behavioral questions
          </button>

          <button
            className={`nav-item ${activeSection === "roadmap" ? "active" : ""}`}
            onClick={() => setActiveSection("roadmap")}
          >
            Road Map
          </button>
          <div className="download-btn-wrapper">
  <button
  type="button"
  className="button primary-button"
  onClick={handleDownloadResume}
  disabled={downloadingResume}
>
  <FiDownload style={{ marginRight: "8px", flexShrink: 0 }} />
  <span>{downloadingResume ? "Generating..." : "Download Resume"}</span>
</button>
</div>
        </nav>
      </aside>

      <main className="content-area">{renderMainContent()}</main>

      <aside className="sidebar sidebar-right">
        <div className="skill-gaps-section">
          <h3 className="skill-gaps-title">Skill Gaps</h3>

          <div className={`match-score ${scoreClass}`}>
           <h2>{score}%</h2>
             <p>Match Score</p>
          </div>

          <div className="skill-tags">{renderSkillGapTags()}</div>
        </div>
      </aside>
    </div>
  )
}

export default Interview