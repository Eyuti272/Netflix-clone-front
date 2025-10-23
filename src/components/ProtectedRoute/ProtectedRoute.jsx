import React,{useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { dataContext } from '../DataProvider/DataProvider'


const ProtectedRoute = ({children,msg,redirect}) => {

    const Navigate=useNavigate ()
    const [{user},dispatch]=useContext(dataContext)

    useEffect(()=>{
        if(!user){
            Navigate("/auth",{state:{msg,redirect}})
         }

    },[user])

  return children;
}

export default ProtectedRoute