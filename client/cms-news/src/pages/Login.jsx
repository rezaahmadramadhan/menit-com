import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "https://gc01.dhronz.space/login",
        data: {
          email,
          password,
        },
      })
      

      localStorage.setItem("access_token", response.data.access_token)      
      navigate('/')
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  };
  
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
            Welcome
          </h1>
          <p className="mt-4 text-lg text-base-content/70">
            Log in to access your admin dashboard
          </p>
        </div>
        
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Email</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-base-content/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="input input-bordered w-full pl-10 input-primary" 
                      value={email}
                      onChange={(event) => {
                        const newEmail = event.target.value
                        setEmail(newEmail)
                      }}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-base-content/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input 
                      type="password" 
                      placeholder="Enter your password" 
                      className="input input-bordered w-full pl-10 input-primary"
                      value={password}
                      onChange={(event) => {
                        const newPassword = event.target.value
                        setPassword(newPassword)
                      }}
                    />
                  </div>
                </div>
                      
                <button type="submit" className="btn btn-primary w-full">
                  Sign in
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}