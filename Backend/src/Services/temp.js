const resume = `
Rashi Gupta
Jaipur, India
rashi.gupta@email.com
+91 9123456780
LinkedIn: linkedin.com/in/rashigupta
GitHub: github.com/rashigupta
 
PROFESSIONAL SUMMARY
Full Stack Developer with 4+ years of experience building high-performance web applications and REST APIs. Passionate about clean architecture, developer tooling, and leveraging AI/ML integrations to deliver intelligent user experiences.
 
TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python
Frontend: React.js, Next.js, Tailwind CSS, Zustand
Backend: Node.js, Express.js, FastAPI
Database: PostgreSQL, MongoDB, Redis
DevOps & Tools: Docker, GitHub Actions, AWS (EC2, S3), Postman, Linux
Concepts: REST APIs, GraphQL, JWT Authentication, Microservices, CI/CD
 
WORK EXPERIENCE
 
Senior Full Stack Developer
Innovatech Labs | Feb 2022 - Present
-Architected and shipped a multi-tenant SaaS platform serving 30,000+ active users.
- Designed GraphQL APIs reducing over-fetching by 40% compared to prior REST endpoints.
- Built an AI-powered document parser using OpenAI API, cutting manual data entry by 70%.
-Led a team of 4 engineers; introduced code-review standards that reduced bug escape rate by 35%.
- Migrated legacy monolith to microservices on AWS, improving deployment frequency from monthly to weekly.
 
Full Stack Developer
ByteForge Solutions | Aug 2020 - Jan 2022
- Developed responsive dashboard UI with React and Recharts for real-time analytics.
- Integrated Stripe and Razorpay payment gateways handling ₹2Cr+ monthly transactions.
- Reduced page load time by 45% through code splitting, lazy loading, and CDN optimization.
- Wrote comprehensive Jest & Cypress test suites achieving 85% code coverage.
 
PROJECTS
 
AI Interview Coach
- Built a real-time interview simulation tool powered by Claude API (Anthropic).
- Implemented speech-to-text using Web Speech API for voice-based answer submission.
- Generated per-question feedback and overall performance score with structured prompts.
- Tech Stack: Next.js, Node.js, MongoDB, Tailwind CSS, Anthropic SDK.
 
Smart Resume Analyzer
- Developed an AI system that parses resumes and matches them against job descriptions.
- Extracted skills, experience, and keywords using custom NLP pipeline + GPT-4.
- Provided ATS score, gap analysis, and rewrite suggestions in a clean dashboard.
- Tech Stack: React.js, FastAPI, PostgreSQL, Python, OpenAI API.
 
DevLink — Developer Portfolio Generator
- SaaS tool that auto-generates portfolio websites from a GitHub profile and resume.
- Deployed on Vercel with edge functions for sub-100ms response times globally.
- Gained 1,200+ users within 3 months of launch with zero paid marketing.
- Tech Stack: Next.js, Prisma, Supabase, Tailwind CSS.
 
EDUCATION
B.Tech in Computer Science
Manipal University, Jaipur | 2023 - 2027 | CGPA: 8.2 / 10
 
CERTIFICATIONS
- AWS Certified Developer - Associate (2023)
- MongoDB Associate Developer (2022)
- Meta Front-End Developer Professional Certificate (2021)
`

const selfDescription = `
I'm Rashi Gupta, a Full Stack Developer based in Jaipur with 4+ years of experience building
production-grade web applications and AI-integrated products. I specialize in the JavaScript
ecosystem — React and Next.js on the frontend, Node.js and Express on the backend — and I'm
increasingly focused on the intersection of software engineering and AI.

Over the years I've worked across early-stage startups and mid-sized product companies, which
means I'm comfortable owning features end-to-end: from whiteboarding the architecture to
deploying and monitoring in production. I've built everything from multi-tenant SaaS platforms
and real-time dashboards to LLM-powered tools using the OpenAI and Anthropic APIs.

Outside of my day job, I spend a lot of time on side projects. My most recent ones — an AI
Interview Coach and a Smart Resume Analyzer — came out of a personal frustration with how
generic and impersonal most interview prep tools feel. I wanted to build something that actually
understands your background and gives you feedback that's specific to you, not just a generic
list of tips.

I care a lot about code quality, developer experience, and shipping things that actually solve
real problems. I'm looking for a role where I can work on AI-native products, collaborate with
a sharp team, and keep pushing the boundary of what's possible at the frontend-backend-AI.
intersection.
`

const jobDescription = `
Company: Nexora AI
Role: Full Stack Engineer (AI Products)
Location: Bengaluru, India (Hybrid)
Experience: 3-6 years
 
About the Role:
We are building the next generation of AI-native productivity tools. You will work closely with product and ML teams to design and ship features that directly touch millions of users.
 
Responsibilities:
- Design and implement scalable backend services using Node.js / Python.
- Build intuitive, high-performance frontends with React or Next.js.
- Integrate large language model APIs (OpenAI, Anthropic, Gemini) into product features.
- Collaborate with ML engineers to productionize model outputs.
- Own features end-to-end: from design review to deployment and monitoring.

Requirements:
- Strong proficiency in JavaScript / TypeScript (Node.js + React).
- Experience with REST or GraphQL API design.
- Familiarity with cloud platforms (AWS / GCP / Azure).
- Exposure to LLM APIs or AI/ML integrations is a strong plus.
- Experience with PostgreSQL or MongoDB.
- Good understanding of CI/CD pipelines and containerization (Docker).
 
Nice to Have:
- Prior experience at a startup or fast-paced product environment.
- Contributions to open-source projects.
- Experience with vector databases (Pinecone, Weaviate) or RAG pipelines.
`

module.exports = {
  resume,
  selfDescription,
  jobDescription
}