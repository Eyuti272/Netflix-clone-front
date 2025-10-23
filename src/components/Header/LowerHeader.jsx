import React from 'react'
import { FiMenu, FiX } from "react-icons/fi";
import style from "./Header.module.css"

const LowerHeader = () => {
  return (
    <>
     <div className={style['lower-container']} >
       <ul>
        <li>
            <FiMenu size={20} />
             <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Costumer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
       </ul>
     </div>
    
    
    </>
  )
}

export default LowerHeader