const express = require("express")
const authMiddleware = require("./middlewares/auth.middleware")
const interviewController = require("./controllers/interview.controller")
const upload = require("./middlewares/file.middleware")

const interviewRouter = express.Router()

interviewRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.generateInterviewReportController
)

interviewRouter.get(
  "/report/:interviewId",
  authMiddleware.authUser,
  interviewController.getInterviewReportController
)

interviewRouter.get(
  "/",
  authMiddleware.authUser,
  interviewController.getAllInterviewReportsController
)
interviewRouter.post(
    "/resume/pdf/:interviewReportId",
     authMiddleware.authUser,
    interviewController.generateResumePdfController
    )
interviewRouter.get("/test", (req, res) => {
  res.json({ message: "interview routes working" })
})

interviewRouter.delete(
  "/report/:interviewReportId",
  authMiddleware.authUser,
  interviewController.deleteInterviewReportController
)

module.exports = interviewRouter