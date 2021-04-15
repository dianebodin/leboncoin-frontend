import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Instruction from "../components/Instruction";

const Signup = ({ fetchCookies }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState(0);

  const handleUsernameChange = e => { setUsername(e.target.value); };
  const handleEmailChange = e => { setEmail(e.target.value); };
  const handlePasswordChange = e => { setPassword(e.target.value); };
  const handlePassword2Change = e => { setPassword2(e.target.value); };
  const handleCheckboxChange = () => { setCheckbox(!checkbox); }

  const history = useHistory();

  const handleSubmitSignup = async (e) => {
    try {
      e.preventDefault();
      if (!username || !email || !password || !password2) setError(1);
      else if (password !== password2) setError(2);
      else if (password.length < 5) setError(3);
      else if (!checkbox) setError(4);
      else {
        const response = await axios.post(`${process.env.REACT_APP_PATH_BACKEND}/user/sign_up`,
          {
            email, username, password //var = val
          }
        );

        setError(0);
        fetchCookies(response.data.token, response.data.account.username);
        history.push("/"); 
      }

    } catch (error) { 
      if (error.response) {
        if (error.response.data.error === "Username already used") setError(5);
        else if (error.response.data.error === "Email already used") setError(6);
      } 
    }
  };

  return (
    <div className="signup-container">
      <div className="part-left">
        <div className="title">Pourquoi créer un compte ?</div>
        <Instruction icon_ins="clock" title_ins="Gagnez du temps" description_ins="Publiez vos annonces rapidement, avec vos informations pré-remplies chaque fois que vous souhaitez déposer une nouvelle annonce." />
        <Instruction icon_ins="bell" title_ins="Soyez les premiers informés" description_ins="Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce qui vous intéresse." />
        <Instruction icon_ins="eye" title_ins="Visibilité" description_ins="Suivez les statistiques de vos annonces (nombre de fois où votre annonce a été vue, nombre de contacts reçus)." />
      </div>

      <div className="part-right">
        <div className="title">Créez un compte</div>
        <form onSubmit={handleSubmitSignup}>

          <p>Pseudo *</p>
          <input type="text" value={username} onChange={handleUsernameChange} />
          <p>Adresse email *</p>
          <input type="email" value={email} onChange={handleEmailChange} />

          <div className="password-confirm">
            <div> 
              <p>Mot de passe *</p>
              <input type="password" value={password} onChange={handlePasswordChange} autoComplete="off" /> 
            </div>
            <div>
              <p>Confirmer le mot de passe *</p>
              <input type="password" value={password2} onChange={handlePassword2Change} autoComplete="off" /> 
            </div>
          </div> 

          <div className="conditions">
            <input type="checkbox" onChange={handleCheckboxChange} />
            <label>« J'accepte les <span>Conditions Générales de Vente</span> et les <span>Conditions Générales d'Utilisation</span> »</label>
          </div>

          <div className="container-err-msg">
            {error === 1 ? <div className="err-msg">Champs à remplir</div> : null}
            {error === 2 ? <div className="err-msg">Les mots de passe ne sont pas identiques</div> : null}
            {error === 3 ? <div className="err-msg">Le mot de passe contient au moins 5 caractères</div> : null}
            {error === 4 ? <div className="err-msg">Veuillez accepter les Conditions Générales en cochant la case ci-dessus</div> : null}
            {error === 5 ? <div className="err-msg">Le pseudo est déjà utilisé</div> : null}
            {error === 6 ? <div className="err-msg">L'email est déjà utilisé</div> : null}
          </div>

          <input type="submit" value="Créer mon Compte Personnel" />
        </form>
      </div>
    </div>
  );
};

export default Signup;