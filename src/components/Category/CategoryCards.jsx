import React from 'react'
import style from './Category.module.css'
import { Link } from 'react-router-dom'
function CategoryCards({data}) {
    
  return (
    <>

    <div className={style['category']}>
    
      <Link to={`/category/${data.name}`}>
        <span>
           
            <h1>{data.title}</h1>
        </span>
        <img src={data.img} alt="" />
        
         <p>Shop Now</p>
      </Link>

      </div>
    
    </>
  )
}

export default CategoryCards