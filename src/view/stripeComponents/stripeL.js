import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutFormStripe";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.pk_test_51OMckYHWPcdv1N1nR8kkZPrMFlveOoIpeIzIPDMGIQfGaIekcYelCuAJmDAVP9ORlvhLYBqde0L0aum4hBsMVYYz00SRBCEskk
// This is your test publishable API key.
const stripePromise = loadStripe("pk_live_51OMckYHWPcdv1N1np0lKPXf8uoM9pGst9NP2xLSpVHTOMyi2SliWSV4tvbnqOC85bXmJxhRTFAhaqtBCsUeAKxzH00Gg5YmSCi");

export default function StripeEl(props) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
      debugger
      const query = new URLSearchParams({
        email:props.user.getJson().email,  // Customer's email
        priceId: "price_1OSp8OHWPcdv1N1nmldQLrVn"  // Subscription price ID
      }).toString();
      
      try {
        
        let str = `https://createsubscriptionforgms2-x5obmgu23q-uc.a.run.app?${query}`
        fetch(str, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type if needed
          }}).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setClientSecret(data.clientSecret)
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
      } catch (error) {
        console.error('Network error:', error);
      }
      
    
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App" >
      {/* {props.app.state.payment!=="success"?
      (<div style={{cursor:"pointer", fontSize:"1.1rem", padding:"2px", border:"1px solid red", borderRadius:"8px", 
        background:"#ffdea3333"}}onClick={()=>{props.app.dispatch({payment:"success"})}}>click me</div>):(
          <div> */}
          <div style={{ fontSize:  window.innerWidth > 800 ? ".9rem" : "1rem", color: "#04d46cd8", marginTop:"0px", }}>Secure, 1-click checkout with Link</div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm app={props.app} user={props.user} />
        </Elements>
      )}
      {/* </div> )} */}
    </div>
  );
}