import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { validateEmail } from '../../utilis/helper'
import { useContext } from 'react'
import { UserContext } from '../../context/userContent'
import axiosInstance from '../../utilis/axiosInstance'
import { API_PATHS } from '../../utilis/apiPaths'
import uploadImage from '../../utilis/uploadImage'

const Signup = ({setCurrentPage}) => {
  const [profilePic,setProfilePic]=useState(null);
  const [fullName,setFullName]=useState('');
  const [email,setEmail]=useState('');
  const [passward,setPassward]=useState('');
  const [error,setError]=useState(null);

  const {updateUser}=useContext(UserContext);
  const navigate=useNavigate();
 
  // handle SignUp Form Submit
  const handleSignup=async(e)=>{
    e.preventDefault();

    let profileImageURL="";
    if(!fullName){
      setError("Please enter full name.");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }
    if(!passward){
      setError("please enter a password");
      return;
    }
    setError("");
    // Signup API call
    try{
      if(profilePic){
        const imgUploadRes=await uploadImage(profilePic);
        profileImageURL=imgUploadRes.imageUrl || "";
      }
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name:fullName,
        email,
        password: passward,
        profileImageURL,
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
    <div className='w-[90vw] md:w-[33w] p-7 flex flex-col justify-center '>
      <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below.
      </p>

      <form action="" onSubmit={handleSignup}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
          <Input
            value={fullName}
            onChange={({target})=>setFullName(target.value)}
            label="Full Name"
            placeholder="Jhon Doe"
            type="text"
          />
          <Input
            value={email}
            onChange={({target})=>setEmail(target.value)}
            label="Email Address"
            placeholder="jhon@example.com"
            type="text"
          />
          <Input
            value={passward}
            label="Passward"
            onChange={({target})=>setPassward(target.value)}  
            placeholder="Min. 8 characters"
            type="password"
          />
        </div>
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='w-full bg-black text-white font-medium py-2.5 rounded-md hover:bg-amber-500 hover:text-black transition-colors duration-300'>
          SIGN UP
        </button>
        <p className='text-sm text-slate-700 mt-4 text-center'>
          Already have an account?{' '}
          <button 
           className='text-amber-600 font-medium cursor-pointer hover:underline'
           onClick={()=>{
            setCurrentPage('login');
           }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  )
}

export default Signup