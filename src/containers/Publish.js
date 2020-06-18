import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from "js-cookie";
//import { useDropzone } from "react-dropzone";
import '../App.css';


const Publish = () => {

  const token = Cookies.get("token"); //plutôt que faire passer le token en props

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState();
  const [error, setError] = useState(0);

  const handleTitleChange = e => { setTitle(e.target.value); };
  const handleDescriptionChange = e => { setDescription(e.target.value); };
  const handlePriceChange = e => { setPrice(e.target.value); };
  const handlePictureChange = e => { setPicture(e.target.files[0]); }; //fichier

  const history = useHistory();

  //renvoyer un objet au backend, 
  //utilisant une classe -> utilisation d'un fichier
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("picture", picture);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!title || !description || !price || !picture) setError(1);
      else if (title.length > 30) setError(2);
      else if (description.length > 200) setError(3);
      else if (isNaN(price) || Math.sign(price) !== 1 || price > 100000) setError(4);
      else {
        const response = await axios.post(`${process.env.REACT_APP_PATH_BACKEND}/offer/publish`, formData, { headers: { Authorization: "Bearer " + token, "Content-Type": "multipart/form-data" } });
        setError(0);
        history.push(`/offer/${response.data._id}`);
      }
    } catch (error) { console.log(error.message); }
  };


  return (
    <>
    {token ? (
      <div className="publish-container">
        <div className="title">Déposer une annonce</div>
        
        <form onSubmit={handleSubmit}>
          <p>Titre de l'annonce *</p>
          <input type="text" className="publish-title" onChange={handleTitleChange} />
          <p>Texte de l'annonce *</p>
          <textarea rows="12" onChange={handleDescriptionChange}></textarea>
          <p>Prix *</p>
          <span>
            <input type="text" className="price-publish" onChange={handlePriceChange} /> <span className="euro">€</span>
          </span>
          <p>Photo *</p>
          <input type="file" onChange={handlePictureChange} /> 

          <div className="container-err-msg">
            {error === 1 ? <div className="err-msg">Champs à remplir</div> : null}
            {error === 2 ? <div className="err-msg">Le titre doit contenir moins de 30 caractères</div> : null}
            {error === 3 ? <div className="err-msg">La description doit contenir moins de 200 caractères</div> : null}
            {error === 4 ? <div className="err-msg">Le prix est incorrect</div> : null}
          </div>
          <input type="submit" value="Valider" />
        </form>

      </div>
      ) : history.push("/login") }
    </>
  );
}

export default Publish;