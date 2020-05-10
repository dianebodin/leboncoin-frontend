import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './components/Header';
import Offers from './containers/Offers';
import Offer from './containers/Offer';
import Signup from './containers/Signup';
import Login from './containers/Login';
//import Footer from './components/Footer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faSearch, faUser, faShoppingCart, faClock, faBell, faEye } from '@fortawesome/free-solid-svg-icons';
library.add(faPlusSquare, faSearch, faUser, faShoppingCart, faClock, faBell, faEye); 

const App = () => {

  const [token, setToken] = useState(Cookies.get("token") || null); //récupération du cookie

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} />
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>

          <Route path="/signup">
            <Signup setToken={setToken} />
          </Route>

          <Route path="/login">
            <Login setToken={setToken} />
          </Route>

          <Route path="/">
            <Offers />
          </Route>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
