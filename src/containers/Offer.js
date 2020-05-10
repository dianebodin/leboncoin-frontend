import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Offer = () => {

  const [data, setData] = useState({}); //une annonce
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/offer/${params.id}`);
        setData(response.data);
        
        setIsLoading(false);
      } catch (error) { console.log(error.message); }
    };
    fetchData(); 
  }, [params.id]);

  return (
    <>
      {isLoading ? (<span></span>) : (

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
                <p>{moment(data.created).format("L")} à {moment(data.created).format("hh:mm")}</p>
              </div>
            </div>

            <div className="right-box">
              <p>{data.creator.account.username}</p>
              <button>
                <FontAwesomeIcon icon="shopping-cart" className="shopping-icon" /> Acheter
              </button>
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