import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import Signup from './Signup'
import {validateEmail} from "../../utilis/helper.js"
import axiosInstance from '../../utilis/axiosInstance.js'
import { API_PATHS} from '../../utilis/apiPaths.js'
import { UserContext } from '../../context/userContent.jsx'
import { useContext } from 'react'

const Login = ({setCurrentPage}) => {
  const [email,setEmail]=useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState(null);

  const {updateUser}=useContext(UserContext);

  const navigate=useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address.")
      return;
    }
    if(!password){
      setError("Please enter the Passward");
      return;
    }
    setError("");
    //Login API Call 
    try{
      const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });
      const {token}=response.data;
      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try Again");
      }
    }
  };

  return (
    <div className='w-[90vw] md:w-[400px] bg-white rounded-xl shadow-lg p-7'>
      <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
      <p className='text-sm text-slate-600 mt-1 mb-6'>
        Plese enter your details to log in.
      </p>
      <form action="" onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({target})=>setEmail(target.value)}
          label="Email Address"
           placeholder="jhon@example.com"
          type="text"
          
        />
        
        <Input
          value={password}
          label="Password"
          onChange={({target})=>setPassword(target.value)}
          placeholder="Min. 8 characters"                
          type="password"
        />
        
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type='submit' className='w-full bg-black text-white font-medium py-2.5 rounded-md hover:bg-amber-500 hover:text-black transition-colors duration-300'>
          LOGIN
        </button>

        <p className='text-sm text-slate-700 mt-4 text-center'>
          Don't have an account?{' '}
          <button 
           className='text-amber-600 font-medium cursor-pointer hover:underline'
           onClick={()=>{
            setCurrentPage('Signup'); 
           }}
          >
            SignUp
          </button>
        </p>  
      </form>
    </div>
    
    
  )
}

export default Login;