const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../../Services/ai.service")
const interviewReportModel = require("../../../models/interviewReport.model")

/**  
 * @route 
 * @description Controller to generate interview report based on user self description, resume and job description.
 * @access private 
 */
async function generateInterviewReportController(req, res) {
  try {
    console.log("FILE:", req.file)
    console.log("BODY:", req.body)

    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required"
      })
    }

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const { selfDescription, jobDescription } = req.body

    const aiReport = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription
    })

    console.log("AI REPORT:", JSON.stringify(aiReport, null, 2))

   const interviewReport = await interviewReportModel.create({
  user: req.user.id,
  jobDescription,
  resume: resumeContent.text,
  selfDescription,

  title: aiReport.title || aiReport.jobTitle || "Interview Report",
  matchScore: aiReport.matchScore,

  technicalQuestions: aiReport.technicalQuestions,
  behavioralQuestions: aiReport.behavioralQuestions,
  preparationPlan: aiReport.preparationPlan,
  skillGaps: aiReport.skillGaps,

  interviewReport: aiReport,
})

    return res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport
    })

  } catch (error) {
    console.log("CONTROLLER ERROR:", error.message)

    return res.status(500).json({
      message: "AI generation failed",
      error: error.message
    })
  }
}

/**
 * 
 * @description Controller to get interview reports of all the logged in users
 * @access 
 */
async function getInterviewReportController(req, res) {
  try {
    const interviewReport = await interviewReportModel.findOne({
      _id: req.params.interviewId,
      user: req.user.id,
    })

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found",
      })
    }

    return res.status(200).json({
      interviewReport,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get interview report",
      error: error.message,
    })
  }
}

/**
 * 
 * @description Controller to get interview reports of all the logged in users
 * @access 
 */
async function getAllInterviewReportsController(req, res) {
        const interviewReports = await interviewReportModel
  .find({ user: req.user.id })
  .sort({ createdAt: -1 })
  .select("-resume -selfDescription")
        res.status(200).json({
          message: "Interview reports fetched successfully.",
          interviewReports
        })
      }

      /**
       * @description Controller to generate resume pdf based on user self description, job Description and resume.
       */
async function generateResumePdfController(req, res) {
  const { interviewReportId } = req.params

  const interviewReport = await interviewReportModel.findById(interviewReportId)

  if(!interviewReport){
    return res.status( 404).json({
      message: "Interview report not found."
    })
  }


  const {resume, selfDescription, jobDescription } = interviewReport 

  const pdfBuffer = await generateResumePdf({ resume, selfDescription, jobDescription })

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
  })

  res.send(pdfBuffer)
}

/**
 * 
 * @description Controller to delete any previous interview report from the ui.
 */
async function deleteInterviewReportController(req, res) {
  try {
    const interviewReport = await interviewReportModel.findOneAndDelete({
      _id: req.params.interviewReportId,
      user: req.user.id,
    })

    if (!interviewReport) {
      return res.status(404).json({ message: "Interview report not found" })
    }

    res.status(200).json({ message: "Interview report deleted successfully" })
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete interview report",
      error: error.message,
    })
  }
}



module.exports = {
  generateInterviewReportController,
  getInterviewReportController,
  getAllInterviewReportsController,
  generateResumePdfController,
  deleteInterviewReportController,
}