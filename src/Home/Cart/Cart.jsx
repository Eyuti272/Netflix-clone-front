import React, { useContext } from 'react'
import { dataContext } from '../../components/DataProvider/DataProvider'
import ProductCard from '../../components/Product/ProductCards'
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import style from './Cart.module.css'
import {type} from '../../utility/Action.type'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(dataContext)

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount
  }, 0)
  const increament=(item)=>{
    dispatch({
      type:type.ADD_TO_BASKET,
      item
    })
  }
    const decreament=(id)=>{
    dispatch({
      type:type.REMOVE_FROM_BASKET,
      id
    })


  }

  return (
    <>
      <section className={style['container']}>
        <div className={style['cart_container']}>
          <h2>Hello </h2>
          <h3>Your shopping basket</h3>
          <hr />

          {basket?.length === 0 ? (
            <p>Opps! no item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return <section className={style['cart_product']}><ProductCard
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={style['btn_container']}>
                    <button className={style['btn']} onClick={()=>increament(item)}>
                      <IoIosArrowUp size={24} />
                    </button>
                    <span>{item.amount}</span>
                    <button className={style['btn']} onClick={()=>decreament(item.id)}>
                      <IoIosArrowDown size={24} />
                    </button>
                  </div>
                   </section> 
            })
           


          )
         }
          </div>


          {basket?.length !== 0 && (
            <div className={style['subtotal']}>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
              <div/>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to="/payments">Continue to checkout</Link>
            </div>
          )}
       
      </section>
      
    </>

  )
}


export default Cart


