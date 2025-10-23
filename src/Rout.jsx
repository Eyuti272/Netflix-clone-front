import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, redirect } from "react-router-dom";



import Payments from './Home/Payments/Payments';
import Cart from './Home/Cart/Cart';
import Orders from './Home/Orders/Orders';
import LayOut from './components/LayOut/LayOut';
import Auth from './Home/Auth/Auth'
import Landing from './Home/Landing/Landing';
import Results from './Home/Results/Results';
import ProductDetail from './Home/ProductDeatail/ProductDetail';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// import stripe for rectjs 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51SJVKzRp6RGiTv2350iyl2B1VGiX1D69vKwVOLchTHuo6ece00IAwB8fWuPXS1aldcMeRfWzgh2vvSeikKh9E8CT00hRa1dEQN');



const Rout = () => {
  return (
     
   <Routes>
      <Route path='/' element={<LayOut />}>
        <Route index element={<Landing />} />
        
        <Route path='payments' element={
          <ProtectedRoute msg={"you must login to pay" } redirect={"/payments"} >
          <Elements stripe={stripePromise}>
             <Payments />
          </Elements>
          </ProtectedRoute>
          
          } />
        <Route path='cart' element={<Cart />} />
        <Route path='/category/:categoryName' element={<Results />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='orders' element={<Orders />} />
      </Route>
      <Route path='auth' element={<Auth />} />
    </Routes>
     

  )
   
}

export default Rout