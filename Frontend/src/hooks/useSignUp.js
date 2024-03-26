import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignUp = () => {
  const [loading, setLoading ]= useState(false);
  const {setAuthUser} = useAuthContext();
  const signup = async({ fullName, username, password, confirmPassword, gender })=>{
  
    const success = HandleInputErrors({ fullName, username, password, confirmPassword, gender })
  if(!success)
  {
    return;
  }
  
  
  try {
    //Posting request to backend api. 
    const res = await fetch("/api/auth/signup",
    {
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
    })
    //jsonifying the response from backend.
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    //local storage
    localStorage.setItem("talkie-user",JSON.stringify(data));
    setAuthUser(data);
    console.log(data);

    
  } catch (error) {
    toast.error(error.message);
  }
  finally
  {
    setLoading(true);

  }
}
  //notes
  return {signup,loading};
}

export default useSignUp;
function HandleInputErrors({ fullName, username, password, confirmPassword, gender })
{
  if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}
    if(password.length<6)
    {
      toast.error("password length should be greater than 6")
      return false;
    }
    if(password!==confirmPassword)
    {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
    
}