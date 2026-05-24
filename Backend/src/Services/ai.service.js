const { GoogleGenAI } = require("@google/genai")
const {z} = require ("zod")
const {zodToJsonSchema} = require ("zod-to-json-schema")
const puppeteer = require ("puppeteer") 

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
  matchScore: z.number().describe("Score between 0 and 100 indicating how well a candidate's profile matches with job description"),

  technicalQuestions: z.array(z.object({
    question: z.string().describe("Technical interview question"),
    intention: z.string().describe("Why the interviewer is asking this question"),
    answer: z.string().describe("Ideal answer approach with key points to cover")
  })).min(8).describe("At least 8 technical questions that can be asked in the interview along with its intention and ideal answer approach"),

  behavioralQuestions: z.array(z.object({
    question: z.string().describe("Behavioral interview question"),
    intention: z.string().describe("Why the interviewer is asking this question"),
    answer: z.string().describe("Ideal STAR-based answer approach")
  })).min(6).describe("At least 6 behavioral questions that can be asked in the interview along with its intention and ideal STAR-based answer approach"),

  skillGaps: z.array(z.object({
    skill: z.string().describe("The skill which the candidate is lacking or weak in"),
    severity: z.enum(["Low", "Medium", "High"]).describe("Skill gap severity")
  })).describe("List of skill gaps in the candidate's profile along with severity"),

  preparationPlan: z.array(z.object({
    day: z.number().describe("Day number starting from 1"),
    focus: z.string().describe("Main topic for the day"),
    tasks: z.array(z.string()).describe("3 to 5 practical tasks for the day")
  })).length(7).describe("A day wise minimum 7 days preperation for candidate to follow in order to prepare for the interview."),
  title: z.string().describe("The title of the job for which the interview report is generated")
})


async function generateInterviewReport ({ resume, selfDescription, jobDescription }) {

    const prompt = `
Return ONLY valid JSON.

Use this exact structure:

{
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "Explain Node.js event loop.",
      "intention": "To assess async programming knowledge.",
      "answer": "The candidate should explain timers, poll, check phases, microtasks and macrotasks."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a time you handled conflict.",
      "intention": "To assess communication and teamwork.",
      "answer": "Use STAR method: situation, task, action, result."
    }
  ],
  "skillGaps": [
    {
      "skill": "Vector databases",
      "severity": "Medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Node.js and backend fundamentals",
      "tasks": [
        "Revise event loop.",
        "Practice Express middleware.",
        "Review REST API design."
      ]
    }
  ]
}

Rules:
- technicalQuestions must contain 8 objects.
- behavioralQuestions must contain 6 objects.
- skillGaps must contain 3 objects.
- preparationPlan must contain 7 objects.
- Do not return null.
- Do not return strings inside arrays.
- Every array item must be an object.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`


    
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    })

    const rawText = response.text

console.log("RAW AI RESPONSE:", rawText)

const cleanedText = rawText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim()

const report = JSON.parse(cleanedText)
return report

  } catch (err) {
    console.log("AI ERROR:", err.message)
    throw err
  }
}


async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0"})

  const pdfBuffer = await page.pdf({ format: "A4", margin:{
    top: "20mm",
    bottom: "20mm",
    left:"15mm",
    right:"15mm"
  }
  

  })

  await browser.close()

  return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  try {
    const resumePdfSchema = z.object({
      html: z.string(),
    })

    const prompt = `Generate a resume for a candidate with the following details:
                          Resume: ${resume}
                          Self Description: ${selfDescription}
                          Job Description: ${jobDescription}

                       Return JSON with one field: html.
                       The html should contain a clean ATS-friendly resume.
                       the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                          The resume should be tailored for the given job description, and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                          The content of the resume should not sound like it's generated by AI and should be as close as possible to real human-written resume.
                          You can highlight the content using some colors or different font stylesbut the overall design should be simple and professional.
                          The content should be ATS friendly , i.e. it should be easily parsable by ATS systems without losing important information.
                          The resume should not be so lengthy, it should ideally be 1-2 pageslong when converted to PDF.Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                          `

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(resumePdfSchema),
      },
    })

    const jsonContent = JSON.parse(response.text)
    return await generatePdfFromHtml(jsonContent.html)
  } catch (error) {
    console.log("RESUME PDF ERROR:", error.message)

    const fallbackHtml = `
      <html>
        <body>
          <h1>Resume</h1>
          <h2>Profile</h2>
          <p>${selfDescription || ""}</p>
          <h2>Job Description</h2>
          <p>${jobDescription || ""}</p>
          <h2>Resume Content</h2>
          <pre>${resume || ""}</pre>
        </body>
      </html>
    `

    return await generatePdfFromHtml(fallbackHtml)
  }
}


module.exports = { generateInterviewReport, generateResumePdf }