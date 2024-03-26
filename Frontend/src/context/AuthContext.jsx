import React, { useState } from 'react'
import { createContext,useContext } from 'react'

//create context for authentication 
//trying to get the value of user response to check if the user is logged in or not
 export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>
{
    const [authUser , setAuthUser]= useState(JSON.parse(localStorage.getItem("talkie-user")) || null);
    
    return (<AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
    </AuthContext.Provider>)

}

export const useAuthContext=()=>
{
    return useContext(AuthContext);
}