import React,{useState} from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const Login = () => {
    const {loading, handleLogin }= useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async (e) => {
  e.preventDefault()

  try {
  await handleLogin({ email, password })
  navigate("/")
} catch (err) {
  alert(err.response?.data?.message || "Login failed")
}
}
    if (loading){
        return (<main><h1>Loading.....</h1></main>) 
    }  
    
    return (

  <main className="auth-page">
    <div className="auth-left">
      <div className="brand">
       <div className="logo">
  <div className="logo-icon">✦</div>
  <h2>InterviewX</h2>
</div>


    <h1>
  From Job Description
  <br />
  to <span>Job Offer</span>
</h1>

    <p>
      AI-powered interview plans, resume analysis, skill-gap detection,
      personalized questions, and actionable roadmaps to help candidates
      land their dream roles.
    </p>

    <div className="features">
      <div className="feature">
        <h3>🎯 Personalized Interview Plans</h3>
        <p>Tailored strategies based on your profile and target role</p>
      </div>
      <div className="feature">
        <h3>📄 Resume Analysis</h3>
        <p>Deep insights into strengths and areas for improvement</p>
      </div>
      <div className="feature">
        <h3>📈 Skill Gap Detection</h3>
        <p>Identify and bridge the gap between you and your dream role</p>
      </div>
      <div className="feature">
        <h3>💻 Technical & Behavioral Questions</h3>
        <p>Practice with AI-generated questions matching real interviews</p>
      </div>
      <div className="feature">
        <h3>📊 Downloadable Reports</h3>
        <p>Export your preparation plan and track your progress</p>
      </div>
    </div>
  </div>
</div>

<div className="auth-right">
  <div className="form-container">
    <h1>Login</h1>

    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
        />
      </div>

      <button className="button primary-button">
        Login
      </button>
    </form>

    <p>
      Don't have an account?
      <Link to="/register"> Register</Link>
    </p>
  </div>
</div>


  </main>
)

}

export default Login
