import React from 'react'
import style from './Carousel.module.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {img} from './img/data'


function CarouselEffect() {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
          interval={5000}
        //   stopOnHover={true} 
      
      >
      {
        img.map((imageItemUrl)=>{
            return<img src={imageItemUrl} />

        })
      }



      </Carousel>
       <div className={style['Hero_img']}>

       </div>
       
    
    </>
  )
}

export default CarouselEffect