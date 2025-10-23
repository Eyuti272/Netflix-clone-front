import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCards from './ProductCards'
import style from './Product.module.css'
import Loder from '../Loder/Loder'




function Product() {
    const[Products, setProducts]= useState([])
     const [isLoading, setIsLoading] = useState(false)

     useEffect(()=>{
          
            axios.get('https://fakestoreapi.com/products')

            .then((res)=>{
                setIsLoading(true)
                // console.log(res.data);
                setProducts(res.data)
                setIsLoading(false)

            }).catch((err)=>{
                console.log(err);
                setIsLoading(false)
            })
             },[])
  return (
    <>
     
     {
    isLoading? (<Loder />):( <section className={style['product_container']}>
     {
        Products.map((proitem)=>(
           <ProductCards product={proitem} renderAdd={true} key={proitem.id} />
               ))

            }


          </section>)

        }
        
</>
  )
}

export default Product

