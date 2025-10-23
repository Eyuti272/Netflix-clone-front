import React from 'react'


// import Product from './components/Product/Product'
// import LayOut from '../../components/LayOut/LayOut'
import Carousel from '../../components/carousel/Carousel'
import Category from '../../components/Category/Category'
import Product from '../../components/Product/Product'





const Landing = () => {
  return (
    <>
         {/* <LayOut> */}
            <Carousel />
            <Category /> 
            <Product />
       
          
        
       
    {/* </LayOut> */}
  </>
    
    
  )
}

export default Landing