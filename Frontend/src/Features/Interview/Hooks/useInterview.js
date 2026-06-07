import { getAllInterviewReports, generateInterviewReport, getInterviewReport, generateResumePdf } from "../Services/interview.api";
import { useContext } from "react"
import { InterviewContext } from "../interview.context.jsx"


export const useInterview = () => {

    const context = useContext (InterviewContext )

    if(!context){
        if (!context) {
  throw new Error("useInterview must be used within an InterviewProvider")
}
    }

     const { loading, setLoading, report, setReport, reports, setReports} = context 

     const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
  setLoading(true)

  try {
    const data = await generateInterviewReport({
      jobDescription,
      selfDescription,
      resumeFile,
    })

    setReport(data.interviewReport)
    return data
  } catch (error) {
    console.log("GENERATE REPORT ERROR:", error)
    throw error
  } finally {
    setLoading(false)
  }
}
     const getReport = async (interviewId) => {
        setLoading(true)
        try{
            const response = await getInterviewReport(interviewId)
            setReport(response.interviewReport)
        }catch (error) {
    console.log("GENERATE REPORT ERROR:", error)
    throw error
  } finally {
    setLoading(false)
  }
     }

     const getReports = async () => {
        setLoading(true)
        try{
            const response = await getAllInterviewReports()
            setReport(response.interviewReports)
        }catch (error) {
    console.log("GENERATE REPORT ERROR:", error)
    throw error
  } finally {
    setLoading(false)
  }
     }

     const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new blob ([ response ], {type: "application/pdf"}))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error){
            console.log(error)
        } finally {
            setLoading(false)
        }
     }
     useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }else{
            getReports()
        }
        }, [ interviewId ])
     

     return { loading, report,  reports, getReport, generateReport, getReports, getResumePdf }

}