import React, { useContext } from 'react'
import style from './Header.module.css'
import { Link } from "react-router-dom";
import languageflag from "../../assets/images/EN.png"
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import LowerHeader from './LowerHeader';
import { dataContext } from '../DataProvider/DataProvider';
import {auth} from '../../utility/Firebase'

const Header = () => {
  const [{basket, user},dispatch]=useContext(dataContext)
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  
  
  return (
    <section className={style["fixed"]}>
     <section className={style["header_container"]}>
       

    
          <div className={style["logo_container"]}>
            {/* logo */}
            <Link to="/"><img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo" /></Link>
              {/* delivery */}
            <span>
                {/* icon */}
              <FaMapMarkerAlt size={20} />

            </span>
            <div className={style["delivery"]} >
                <p>Delivered to</p>
                <span>Ethiopia</span>
                
            </div>
          

          </div>
          
          <div className={style["search"]}>
              <select name="" id="">
                <option value="">All</option>
              </select>
            <input type="text" id='' name='' placeholder='Search Product' />
              {/* icon */}
          <FaSearch size={38} /> 

          </div>
          <div>
            <div className={style["language"]} >
                <img src={languageflag} alt="" />
                <select name="" id="">
                  <option value="">EN</option>
                </select>
            </div>
          </div>

          <div className={style["order_container"]}> 
            {/* resistration */}
            <Link to={!user && "/auth"}>
            <div>
             {

                user ? (
                <>
                  <p>hello {user?.email?.split('@')[0]} </p>
                  <span onClick={()=>{auth.signOut()}}> Sign Out </span>
                  </>
              ) :( 
              <>
              <p>Hello ,Sign In</p>
              <span>Accounts & Listes</span>
              </>
            
            )
              } 
            </div>
              
              
            </Link>
            {/* orders */}

            <Link to="/orders" >
              <p>Returns</p>
              <span>& Orders</span>

            </Link>
            <div className={style["cart"]}>
            <Link to="/cart">
                {/* icon */}
              <FaShoppingCart size={35} />
                <span>{totalItem}</span>
            </Link>
            </div>
          </div>
         
    
        </section>
         <LowerHeader/>
    
    
    </section>
  )
}

export default Header