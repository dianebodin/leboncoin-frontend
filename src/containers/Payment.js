import React from 'react';
import Cookies from "js-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../components/CheckoutForm';
import '../App.css';


const Payment = () => {

  const token = Cookies.get("token");

  const stripePromise = loadStripe("pk_test_PgXKRmXMfSyY8nc5an5PllY500zN8itMQt"); //clé publique
  const history = useHistory();

  const location = useLocation(); //récupérer les paramètres de history.push
  const { username, title, price, picture } = location.state;

  return (
    <>
      {token ? (
        <div className="payment-container">
          <div className="payment">
            <p>Acheter en ligne</p>

            <div className="payment-infos">
              <div><img src={picture} alt={title} /></div>
              <div>{title}</div>
              <div>{price} €</div>
            </div>

            <div className="bank">
              <p>Vos coordonnées bancaires</p>

              <Elements stripe={stripePromise}>
                <CheckoutForm username={username} title={title} price={price} />
              </Elements>
            </div>
          </div>
        </div>
      ) : history.push("/login") }
    </>
  );
}

export default Payment;