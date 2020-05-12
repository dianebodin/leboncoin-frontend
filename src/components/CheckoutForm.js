import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import '../App.css';


const CheckoutForm = ({ username, title, price }) => {

  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(0);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(0);
      const cardElement = elements.getElement(CardElement); //récupère les données bancaires que l'utilisateur rentre
      const stripeResponse = await stripe.createToken(cardElement, { name: username }); //création d'un token généré par l'api stripe
      
      //prix suivant le modèle stripe (deux derniers chiffres correspondent aux centimes)
      let price_str = price.toString();
      if (price_str.indexOf(".") !== -1){ 
        const tab = price_str.split("").splice(price_str.indexOf(".") + 1); //tab contenant les chiffres après le point
        price_str = price_str.replace(".", "");
        if (tab.length === 1) price_str += "0";
      } else price_str += "00";
      const amount = Number(price_str);
      
      //envoie du token de l'api dans la partie back
      const response = await axios.post("https://leboncoin-backend-db.herokuapp.com/payment", 
      { 
        amount: amount,
        title: title,
        stripeToken: stripeResponse.token.id,
      }); 
            
      if (response.status === 200) {
        setCompleted(true); //transaction réussie
        setError(0);
      } else setError(1);

    } catch (error) {
      setError(1);
    }
  }


  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <div>
            <CardElement />
          </div>
          {error === 1 ? <div className="err-payment">Erreur lors de la transaction</div> : null}
          <button type="submit">Valider</button>
        </form>
      ) : (
        <span className="succeeded">Transaction réussie</span>
      )}
    </>
  );
}

export default CheckoutForm;