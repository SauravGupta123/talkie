import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const login = async({username,password})=>
  {
    const success = HandleInputErrors({username,password});
    if(!success)return ;
    try {
        const res = await fetch("/api/auth/login",
        {
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({  username, password }),
        })
        //always use await here or it will show promise pending
        const data = await res.json();

        if(data.error)
        {
            throw new Error(data.error);
        }
        console.log(data);
        setAuthUser(data);
        localStorage.setItem("talkie-user",JSON.stringify(data));

        
    } catch (error) {
        toast.error(error.message);
    }
    finally
    {
        setLoading(false);
    }

  }
  return {loading,login};
}
function HandleInputErrors({username,password}){
    if(!username || !password)
    {
        toast.error("enter all fields");
        return false;
    }
    return true;

}

export default useLogin