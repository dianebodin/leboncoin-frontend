import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment/moment';
import 'moment/locale/fr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactLoading from "react-loading";
import Cookies from "js-cookie";


const Offer = () => {

  const token = Cookies.get("token");
  const userCookie = Cookies.get("userCookie");

  const [data, setData] = useState({}); //une annonce
  const [isLoading, setIsLoading] = useState(true);
  const [myOffer, setMyOffer] = useState(false);

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    setMyOffer(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PATH_BACKEND}/offer/${params.id}`);
        setData(response.data);
        
        setIsLoading(false);
      } catch (error) { console.log(error.message); }
    };
    fetchData(); 
  }, [params.id]);

  const fetchInfos = (u) => {
    if (u !== userCookie) {
      history.push("/payment", {
        username: data.creator.account.username,
        title: data.title,
        price: data.price,
        picture: data.picture.secure_url
      })
    } else setMyOffer(true);
  }

  
  return (
    <>
      {isLoading ? 
        (<div className="loading">
          <ReactLoading type="spokes" color="#f56b2a" />
        </div>) 
        : (
          <div className="offer-container">
            <div className="left-box">

              <div className="offer">
                <div className="offer-picture">
                  <img src={data.picture.secure_url} alt={data.title} />
                </div>

                <div className="offer-infos">    
                  <div className="title-price">     
                    <p>{data.title}</p>
                    <p>{data.price} ‎€</p>
                  </div> 
                  <p>{moment(data.created).locale('fr').format('L')} à {moment(data.created).locale('fr').format('LT')}</p>
                </div>
              </div>

              <div className="right-box">
                <p>{data.creator.account.username}</p>

                {token ? (
                  <button onClick={() => fetchInfos(data.creator.account.username)}>
                    <FontAwesomeIcon icon="shopping-cart" className="shopping-icon" /> Acheter
                  </button>
                ) : 
                (
                  <Link to="/login" className="bis">
                    <button>
                      <FontAwesomeIcon icon="shopping-cart" className="shopping-icon" /> Acheter
                    </button> 
                  </Link>
                )}

                {myOffer ? <div className="err-offer">Vous ne pouvez pas acheter votre propre article</div> : null}
              </div>
            </div>

            <p className="description-title">Description</p>
            <p className="description">{data.description}</p>
          </div>
        )}
    </>
  );
}

export default Offer;