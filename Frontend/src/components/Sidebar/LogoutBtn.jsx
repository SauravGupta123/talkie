import React from 'react'
import { BiLogOut } from "react-icons/bi";
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const LogoutBtn = () => {
  const {setAuthUser} = useAuthContext();
  const logout = async()=>
  {
    
    try {
      const res = await fetch("api/auth/logout",
      {
        method:"POST",
        headers:{ "Content-Type": "application/json" },
			});
      const data = res.json();
      if(data.error)
      {
        throw new Error(data.error);
      }
      localStorage.removeItem("talkie-user")
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
      
    }
    
  }
  return (
    <div className="mt-auto ">
		<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout}/>
		{/* <span className='loading loading-spinner'></span> */}
			
		</div>
  )
}

export default LogoutBtn