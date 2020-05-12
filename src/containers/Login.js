import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';


const Login = ({ fetchCookies }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(0);

  const handleEmailChange = e => { setEmail(e.target.value); };
  const handlePasswordChange = e => { setPassword(e.target.value); };

  const history = useHistory();

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) setError(1);
      else {
        const response = await axios.post("https://leboncoin-backend-db.herokuapp.com/user/log_in",
          {
            email, password //var = val
          }
        );
        setError(0);
        fetchCookies(response.data.token, response.data.account.username);

        history.push("/"); 
      }
    } catch (error) { 
        if (error.response) {
          if (error.response.data.error === "Email not found") setError(2);
          else if (error.response.data.error === "Wrong password") setError(3);
        } 
      }
  }


  return (
    <div className="login-container">
      <div className="title">CONNEXION</div>

      <form onSubmit={handleSubmitLogin}>
        <p>Adresse email</p>
        <input type="email" onChange={handleEmailChange} />
        <p>Mot de passe</p>
        <input type="password" onChange={handlePasswordChange} autoComplete="off" />

        <div className="container-err-msg">
          {error === 1 ? <div className="err-msg">Champs à remplir</div> : null}
          {error === 2 ? <div className="err-msg">Adresse email inexistante</div> : null}
          {error === 3 ? <div className="err-msg">Mauvais mot de passe</div> : null}
        </div>

        <input type="submit" value="Se connecter" />

        <p className="no-account">Vous n'avez pas de compte ?</p>
        <Link to="/signup" className="create-account"><span>Créer un compte</span></Link>
      </form>
    </div>

  );
}

export default Login;