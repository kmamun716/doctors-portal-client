import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({appointment}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState("");

  useEffect(()=>{
    fetch('https://pure-savannah-52177.herokuapp.com/doctorsRoute/create-payment-intent',{
        method: 'POST',
        headers:{
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({price: appointment?.price})
    })
    .then(res=>res.json())
    .then(data=>{
        if(data?.clientSecret){
            setClientSecret(data.clientSecret)
        }
    })
  },[appointment?.price])
  
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
    });
    if(error){
        setCardError(error.message);
    }else{
        setCardError('')
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form>
      {
        cardError && <p className="text-red-500 font-bold">{cardError}</p>
      }
    </div>
  );
};

export default CheckoutForm;
