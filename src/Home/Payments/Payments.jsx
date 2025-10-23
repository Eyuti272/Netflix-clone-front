import React,{useContext,useState} from 'react'
import style from './Payments.module.css'
import {dataContext} from '../../components/DataProvider/DataProvider'
import ProductCards from '../../components/Product/ProductCards'
import { useStripe, useElements , CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import {axiosInstance} from '../../Api/Axious'
import ClipLoader from "react-spinners/ClipLoader";
import {db} from '../../utility/Firebase'
import { useNavigate } from 'react-router-dom';
import { type } from '../../utility/Action.type';


const Payments = () => {
  const[errorCard,setErrorCard]=useState(null)
  const[processesing,setProcessing]=useState(false)

  const [{basket,user},disptach]=useContext(dataContext)
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)

   const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount
  }, 0)

//     const total = Math.round(
//   basket.reduce((amount, item) => item.price * item.amount + amount, 0) * 100
// ); // convert to cents and round


 const stripe = useStripe();
  const elements = useElements();
  const Navigate= useNavigate()

  const errorHandler=(e)=>{
    // console.log(e);
    e?.error?.message ? setErrorCard(e?.error?.message) :setErrorCard('')
  }

  const handlerPayments=async(e)=>{
    e.preventDefault()

    try {
      setProcessing(true)

      
      const response=await axiosInstance({
        method:"POST",
        url:`/payment/create?total=${total * 100}`
      })
      // const response = await axiosInstance.post('/payment/create', { total })
     
    //  console.log(response.data);


         // backend function | create payment intent | client secrat

    const clientSecret=response.data?.client_secret

    // console.log(clientSecret);




    // client side (react side confirmation)
    const{paymentIntent}=await stripe.confirmCardPayment(clientSecret,
      {
        payment_method:{
          card:elements.getElement(CardElement)
        }
      }
    )
// console.log(paymentIntent);

    // after finshed condirmation ----> order firestore database save, clear basket, redirect order page

    await db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
      basket:basket,
      amount:paymentIntent.amount,
      created:paymentIntent.created
    })

// empty the basket
    disptach({
      type:type.EMPTY_BASKET
    })




setProcessing(false)
 Navigate('/orders',{msg:"you have placed new order successfully"})

   

      
    } catch (error) {

      console.log(error);
      setProcessing(false)
      
    }
  }

// console.log(user);
  return (
    <>
    {/* header */}
    <div className={style['payment_header']}>
      Checkout {totalItem} items
    </div>
    <section className={style['payment']}>


      {/* adress */}
      <div className={style['flex']}>
        <h3>Delivery Address</h3>
        <div>
          <div>{user?.email}</div>
          <div>123 React Lane</div>
          <div>chigago</div>
        </div>
      </div>
      <hr />


      {/* product */}
      <div className={style['flex']}>
        <h3>Review items and delivery</h3>
        <div className={style["cards"]}>
          {
            basket?.map((item)=>(<ProductCards product={item} flex={true} />))
          }
        </div>


      </div>
      <hr />


  {/* card form  */}
  <div className={style['flex']}>
    <h3>payment methods</h3>
    <div className={style['payment_card_container']} >
      
        <div className={style['payment_details']}>
          <form  onSubmit={handlerPayments} action="">
            {/* error */}

            {errorCard && <small style={{color:"red" }}>{errorCard}</small>}
            {/* card element */}
            <CardElement onChange={errorHandler} />

            {/* price */}
            <div className={style['payment_price']}>
              <div >
                <span style={{display:"flex",gap:"10px"}} >
                  <p>Total order amount : </p><CurrencyFormat amount={total}  />
                </span>
              </div>
              <button type='submit'> 

                {
                  processesing ? (
                    <div className={style['loading']}>
                     <ClipLoader color='gray' size={12} />
                     <p>please wait ...</p>
                    </div>

                  ):("Pay Now")
                }
                
               
                
                </button>
            </div>

          </form>
      </div>

    </div>


  </div>
      
    </section>


    </>
  )
}

export default Payments


