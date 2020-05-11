import React from 'react';
import logo from '../assets/leboncoin.png';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ token, setToken }) => {

  const history = useHistory();

  const logout = () => {
    setToken(null);
    Cookies.remove("token");
    history.push("/");
  }

  return (
    <nav>
      <ul>
      <div className="header-left">
        <li>
          <Link to="/">
            <img src={logo} alt="Logo Leboncoin" />
          </Link>
        </li>

        <li>
          <Link to="/publish" className="publish-link">
            <div className="publish-button">
            <FontAwesomeIcon className="header-plus-square" icon="plus-square" />
              Déposer une annonce
            </div>
          </Link>
        </li>

        <li>
        <Link to="/offers" className="search-link">
            <FontAwesomeIcon className="header-search-icon" icon="search" />
            Rechercher
        </Link>
        </li>
        </div>

        <li className="header-right">
          {token === null ? (
            <Link to="/login" className="login-button">
              <div className="user-button">
                  <FontAwesomeIcon className="header-user-icon" icon="user" />
                  Se connecter
              </div>
            </Link>

          ) : (
      
            <>
            <div onClick={() => logout()} className="logout">
              Se déconnecter
            </div>
            </>

          )}
        </li>
      </ul>  
    </nav>
  );
}

export default Header;