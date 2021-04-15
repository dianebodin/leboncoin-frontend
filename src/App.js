import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faSearch, faUser, faShoppingCart, faClock, faBell, faEye } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header';
import Offers from './containers/Offers';
import Offer from './containers/Offer';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Publish from './containers/Publish';
import Payment from './containers/Payment';

library.add(faPlusSquare, faSearch, faUser, faShoppingCart, faClock, faBell, faEye); 

const App = () => {

  const [token, setToken] = useState(Cookies.get("token") || null); //récupération du cookie
  const [userCookie, setUserCookie] = useState(Cookies.get("userCookie") || null);

  const fetchCookies = (res_token, res_username) => {
    setToken(res_token);
    setUserCookie(res_username);
    Cookies.set("token", res_token);
    Cookies.set("userCookie", res_username);
  };

  return (
    <Router>
      <Header token={token} setToken={setToken} userCookie={userCookie} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <Signup fetchCookies={fetchCookies} />
        </Route>
        <Route path="/login">
          <Login fetchCookies={fetchCookies} />
        </Route>
        <Route path="/publish">
          <Publish />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/">
          <Offers />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;