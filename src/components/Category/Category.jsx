import React from 'react'
import {categoryFullous} from './CategoryFullous.js'
import CategoryCards from './CategoryCards'
import style from './Category.module.css'


function Category() {
  return (
    <>
     <section className={style['category_Container']}>
      {
        
        categoryFullous.map((CategoryItem)=>(
            // console.log(CategoryItem);

            <CategoryCards data={CategoryItem} />
       ))}
      
      
       </section>
    </>
    
  )
}

export default Category