import { useContext, useEffect, useState } from 'react'

import './App.css'

import Rout from './Rout'
import { BrowserRouter as Router } from 'react-router-dom';
import { dataContext } from './components/DataProvider/DataProvider';
import { type } from './utility/Action.type';
import { auth } from './utility/Firebase';









function App() {
      const [{user},dispatch]=useContext(dataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
       if(authUser){
        dispatch({
            type:type.SET_USER,
            user:authUser

        })
        
       }else{
         dispatch({
            type:type.SET_USER,
            user:null

        })
        
       }
    })
  

  },[])

return <Rout />;
  
  
}

export default App
