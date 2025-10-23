import React, { useState,useContext } from 'react'
import {Link, useNavigate,useLocation} from 'react-router-dom'
import style from './Auth.module.css'
import {auth} from '../../utility/Firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import ClipLoader from "react-spinners/ClipLoader";

import {dataContext} from "../../components/DataProvider/DataProvider"
import { type } from '../../utility/Action.type'


const Auth = () => {
    const[email,setEmail]=useState("")
     const[password,setPassword]=useState("")
     const[error,setError]=useState("")
     const[loading,setloading]=useState({
        signIn:false,
        signUp:false
     })
     const Navigate=useNavigate()
    //  console.log(email,password)
    const[{user},dispatch]=useContext(dataContext)
    const useStateLocation=useLocation()
    console.log(useStateLocation);
//   console.log(user);
    const authHundler=async(e)=>{
        e.preventDefault()
        console.log(e.target.name)
        

        if(e.target.name =="signin"){
        setloading({...loading,signIn:true})
            signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
             
                // console.log(userInfo)
                dispatch({
                    type:type.SET_USER,
                    user:userInfo.user
                })

            setloading({...loading,signIn:false})
            Navigate(useStateLocation?.state?.redirect || '/')
            


            }).catch((err)=>{
             setloading({...loading,signIn:false})
              console.log(err)
            setError(err.message)
            
                
            })

        }else{
         setloading({...loading,signUp:true})
            createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
             console.log(userInfo)
         setloading({...loading,signUp:false})
          Navigate('/auth')
            
            }).catch((err)=>{
             setloading({...loading,signUp:false})
                console.log(err)
                 setError(err.message)
                
                
            })

        }

    }

  return <section className={style['login']}>
      {/* logo */}
      <Link to={'/'}>
         <img src="https://www.pngplay.com/wp-content/uploads/3/Amazon-Prime-Logo-Download-Free-PNG.png" alt="amazon-logo"  />
      
      </Link>
      
      <div className={style['login_container']}>
        <h1>Sign-in</h1>
        {
            useStateLocation?.state?.msg && <small 
            style={{
                padding:"5px",
                textAlign:"center",
                color:"red",
                fontWeight:"bold"
            }}
            
            >
                {useStateLocation?.state?.msg}
            
            </small>
        }

        <form action="">
            <div>
       
        <label htmlFor="email">E-mail</label>
        <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div>
         <label htmlFor="password">Password</label>
        <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>

        <button type='submit' name='signin' onClick={authHundler} className={style['signin_btn']} >
            
             {
                loading.signIn ? (<ClipLoader color='black' size={20} />):("sign in")
                
             }
    </button>
        </form>
        {/* Agreemnt */}
        <p>
            This project is a student-built demo for learning purposes only. It is not affiliated with Amazon.com, Inc., and no real purchases or transactions take place. Do not enter real personal or financial information on this site.
        </p>
        {/* button */}
        <button onClick={authHundler} name='signup'  className={style['signin_resisterBtn']}>
            {
                loading.signUp ?(<ClipLoader color='black' size={20} />):(" Create Amazon Account")
            }
            
           </button>
        {
            error && <small style={{paddingTop:"10px",color:"red"}}>
                {error}
            </small>
        }


      </div>
   
    
    </section>
  
}

export default Auth