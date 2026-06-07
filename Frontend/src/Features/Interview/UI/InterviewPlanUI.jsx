import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Auth/Hooks/useAuth";
import "../Style/home.scss"

const InterviewPlanUI = () => {
  const navigate = useNavigate()
  const { handleLogout } = useAuth()
  const resumeInputRef = useRef(null)

  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [resumeFile, setResumeFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [reports, setReports] = useState([])

  const charCount = jobDescription.length

  const logoutUser = async () => {
  try {
    await handleLogout()
    navigate("/login")
  } catch (error) {
    console.log("LOGOUT ERROR:", error)
  }
}

  // FETCH REPORTS
  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/interview/",
        {
          withCredentials: true,
        }
      )

      setReports(response.data.interviewReports || [])
    } catch (error) {
      console.log(
        "FETCH REPORTS ERROR:",
        error.response?.data || error.message
      )
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  // HANDLE RESUME UPLOAD
  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0])
  }

  // HANDLE GENERATE
  const handleGenerate = async () => {
    if (!jobDescription || (!resumeFile && !selfDescription)) {
      alert(
        "Job description and either resume or self description are required"
      )
      return
    }

    try {
      setIsLoading(true)

      const formData = new FormData()

      formData.append("jobDescription", jobDescription)
      formData.append("selfDescription", selfDescription)

      if (resumeFile) {
        formData.append("resume", resumeFile)
      }

      const response = await axios.post(
        "http://localhost:3000/api/interview/",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      navigate(`/interview/${response.data.interviewReport._id}`)
    } catch (error) {
      console.log(
        "GENERATE ERROR:",
        error.response?.data || error.message
      )

      alert(
        error.response?.data?.message ||
          "Failed to generate interview report"
      )
    } finally {
      setIsLoading(false)
    }
  }

  // LOADING SCREEN
  if (isLoading) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    )
  }
  const handleDeleteReport = async (reportId) => {
  const confirmDelete = window.confirm("Delete this interview report?")
  if (!confirmDelete) return

  try {
    await axios.delete(
      `http://localhost:3000/api/interview/report/${reportId}`,
      { withCredentials: true }
    )

    setReports((prevReports) =>
      prevReports.filter((report) => report._id !== reportId)
    )
  } catch (error) {
    console.log("DELETE REPORT ERROR:", error.response?.data || error.message)
    alert("Report delete failed")
  }
}

  return (
    <main className="home">
      {/* HEADER */}
     <div className="page-header">

  <div className="header-top">
    <h1>
      Create Your Custom{" "}
      <span className="accent">Interview Plan</span>
    </h1>

    <button
      className="logout-btn"
      onClick={logoutUser}
    >
      Logout
    </button>
  </div>

  <p className="subtitle">
    Let our AI analyze the job requirements and your profile to build a
    winning strategy.
  </p>

</div>

      {/* MAIN CARD */}
      <div className="main-card">
        <div className="panels-row">
          {/* LEFT PANEL */}
          <div className="panel panel-left">
            <div className="panel-header">
              <div className="panel-title">
                <span>Target Job Description</span>
              </div>

              <span className="badge badge-required">REQUIRED</span>
            </div>

            <textarea
              name="jobDescription"
              id="jobDescription"
              className="textarea-main"
              placeholder="Paste the full job description here..."
              maxLength={5000}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <p className="char-count">
              {charCount} / 5000 chars
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <span>Your Profile</span>
              </div>
            </div>

            <div>
              <div className="section-label-row">
                <p className="section-label">Upload Resume</p>

                <span className="badge badge-best">
                  BEST RESULTS
                </span>
              </div>

              <label className="dropzone" htmlFor="resume">
                <span className="dropzone-title">
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload or drag & drop"}
                </span>

                <span className="dropzone-sub">
                  PDF or DOCX
                </span>
              </label>

              <input
                ref={resumeInputRef}
                hidden
                type="file"
                name="resume"
                id="resume"
                accept=".pdf,.docx"
                onChange={handleResumeChange}
              />
            </div>

            <div className="or-divider">
              <span>OR</span>
            </div>

            <div>
              <label
                className="section-label"
                htmlFor="selfDescription"
              >
                Quick Self-Description
              </label>

              <textarea
                name="selfDescription"
                id="selfDescription"
                className="textarea-self"
                placeholder="Briefly describe your experience, key skills, and years of experience..."
                value={selfDescription}
                onChange={(e) =>
                  setSelfDescription(e.target.value)
                }
              />
            </div>

            <div className="info-banner">
              <p>
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required.
              </p>
            </div>
          </div>
        </div>

        {/* REPORTS SECTION */}
        <div className="reports-section">
  <h2>Your Previous Reports</h2>

  {reports.length === 0 ? (
    <p>No reports generated yet.</p>
  ) : (
    reports.map((report) => (
  <div
    key={report._id}
    className="report-card"
    onClick={() => navigate(`/interview/${report._id}`)}
  >
    <h3>
  {report.title ||
    report.jobTitle ||
    report.interviewReport?.title ||
    report.interviewReport?.jobTitle ||
    "Interview Report"}
</h3>

<p>
  Generated on{" "}
  {report.createdAt
    ? new Date(report.createdAt).toLocaleDateString()
    : report.updatedAt
    ? new Date(report.updatedAt).toLocaleDateString()
    : "No date"}
</p>

<p>
  Match Score:{" "}
  <span className="score-pink">{report.matchScore || 0}%</span>
</p>
<button
  className="delete-report-btn"
  onClick={(e) => {
    e.stopPropagation()
    handleDeleteReport(report._id)
  }}
>
  Delete
</button>
  </div>
))
  )}
</div>

        {/* FOOTER CARD */}
        <div className="card-footer">
          <span className="footer-meta">
            AI-Powered Strategy Generation · Approx 30s
          </span>

          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading
              ? "Generating..."
              : "Generate My Interview Strategy"}
          </button>
        </div>
      </div>

      {/* PAGE FOOTER */}
      <footer className="page-footer">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
      </footer>
    </main>
  )
}

export default InterviewPlanUI