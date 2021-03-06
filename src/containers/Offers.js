import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import 'moment/locale/fr';
import ReactLoading from "react-loading";
import Search from '../components/Search';
import Pagination from '../components/Pagination';

const Offers = () => {

  const [data, setData] = useState({}); //toutes les annonces {counters: number, offers: array d'obj}
  const [isLoading, setIsLoading] = useState(true);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);

  //search
  const [inputTitle, setInputTitle] = useState("");
  const [inputPriceMin, setInputPriceMin] = useState(0);
  const [inputPriceMax, setInputPriceMax] = useState(9999);
  const [inputSort, setInputSort] = useState("date-desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PATH_BACKEND}/offer/with-count?title=${inputTitle}&priceMin=${inputPriceMin}&priceMax=${inputPriceMax}&sort=${inputSort}&page=${currentPage}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) { console.log(error.message); }
    };
    fetchData(); 
  }, [inputTitle, inputPriceMin, inputPriceMax, inputSort, currentPage]); //paramètres query

  const clickPage = (nb) => setCurrentPage(nb);

  return (
    <>
      <Search setInputTitle={setInputTitle} setInputPriceMin={setInputPriceMin} setInputPriceMax={setInputPriceMax} setInputSort={setInputSort} />
      {isLoading ? 
        <div className="loading">
          <ReactLoading type="spokes" color="#f56b2a" />
        </div>
        : (
          <>
            {data.offers.length > 0 ?
              (<div className="offers-container">
                  {data.offers.map((item, i) => {
                    return (
                      <div key={i}>
                        <Link to={`/offer/${item._id}`} className="offers-link">
                          <div className="offers-picture">
                            <img src={item.picture.secure_url} alt={item.title} />
                          </div>
                          <div className="offers-infos">
                            <div className="title-price">
                              <p>{item.title}</p>
                              <p>{item.price} €</p>
                            </div>
                            {moment(item.created).locale('fr').format('L')} à {moment(item.created).locale('fr').format('LT')}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : <div className="no-offers">Aucune offre ne correspond à votre recherche</div>
            }
          </>
        )
      }
      <Pagination count={data.count} clickPage={clickPage}/>
    </>
  );
};

export default Offers;