
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ProductUrl } from '../../Api/EndPoint'
import style from './Results.module.css'
import ProductCards from '../../components/Product/ProductCards'
import Loder from '../../components/Loder/Loder'

const Results = () => {
   const { categoryName } = useParams()
   const navigate = useNavigate()
   const [results, setResults] = useState([])

   
   const normalized = categoryName ? categoryName.toLowerCase() : ""

   const categoryMap = {
     electronics: "electronics",
     jewelery: "jewelery",
     jewelry: "jewelery",
     jewerlly: "jewelery",  
     "mens-clothing": "men's clothing",
     men: "men's clothing",
     mens: "men's clothing",
     "womens-clothing": "women's clothing",
     women: "women's clothing",
     womens: "women's clothing",
     dress: "women's clothing",
     dresses: "women's clothing",
     gown: "women's clothing",
     gowns: "women's clothing",
     game: "electronics",
     games: "electronics"
   }

   useEffect(() => {
     const fetchResults = async () => {
       try {
         const apiCategory = categoryMap[normalized]

         if (!apiCategory) {
           setResults([])
           return
         }

         const res = await axios.get(
           `${ProductUrl}/products/category/${apiCategory}`
         )
         setResults(res.data)
       } catch (err) {
         console.error(err)
       }
     }
     fetchResults()
   }, [normalized])

  return (
    <section>
       <h1 style={{padding:"30px"}}>Results</h1>
       <p style={{padding:"30px"}}>
         Category / {categoryMap[normalized] || categoryName}
       </p>
       <hr/>
       <div className={style['product_container']}> 
        {results.length > 0 ? (
          results.map((product) => (
            <ProductCards key={product.id} product={product} renderDesc={false}  renderAdd={true}/>
          ))
        ) : (
          <p style={{padding:"20px"}}>
            <Loder />{categoryName}".
          </p>
        )}
       </div>
    </section>
  )
}

export default Results
