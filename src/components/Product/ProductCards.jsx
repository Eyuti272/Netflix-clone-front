import React, { useContext } from 'react'
import Rating from "@mui/material/Rating";
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import style from './Product.module.css'
import {Link} from 'react-router-dom'
import { dataContext } from '../DataProvider/DataProvider';
import {type} from '../../utility/Action.type'

const ProductCards = ({product,flex,renderDesc,renderAdd}) => {
  const {title, price, image,rating,id,description}=product;

  const[state,dispatch]=useContext(dataContext)
  console.log(state);

  const addToCart=()=>{
    dispatch({
      type:type.ADD_TO_BASKET,
      item:{
        title, price, image,rating,id,description
      }
    })
  }
  return (
    <>
      <div className={`${style['cards_container']} ${flex ? style['product__flexed'] : ''}`}>



           <Link to={`/products/${id}`} >
               <img src={image} alt="productImage" />
              <div>
                <h3>{title}</h3>
                      {renderDesc && <div style={{maxWidth:"500px"}}>{description}</div>}               
                   <div className={style['rating']}>
                       {/* rating */}
                       <Rating value={rating} precision={0.1} />
                       
                       {/* count rating */}
                       <small>{rating.count}</small>
                   </div>
                   <div className={style['price']}>
                       {/* price */}
                      <CurrencyFormat amount={price}/>

                      
                   </div>
                    {
                      renderAdd &&  <button onClick={addToCart}>Add to cart</button>
                    }
                   
              </div>

              </Link>
            
           
      </div>
    
    </>
  )
}

export default ProductCards
