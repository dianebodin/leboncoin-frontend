import React from 'react';

const Publish = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState();
  const [data, setData] = useState({});

  const handleTitleChange = e => { setTitle(e.target.value); };
  const handleDescriptionChange = e => { setDescription(e.target.value); };
  const handlePriceChange = e => { setPrice(e.target.value); };
  const handlePictureChange = e => { setPicture(e.target.files); }; //fichier

  //renvoyer un objet au backend, 
  //utilisant une classe de part l'utilisation d'un fichier
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("picture", picture);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("https://leboncoin-backend-db.herokuapp.com/offer/publish", formData, { headers: { Authorization: "Bearer " + userToken, "Content-Type": "multipart/form-data" } });
    console.log(response.data);
    setData(response.data);
  };


  return (
    <>
    
      <div className="">Déposer une annonce</div>
      
      <form onSubmit={handleSubmit}>
        <p>Titre de l'annonce *</p>
        <input type="text" onChange={handleTitleChange} />
        <p>Texte de l'annonce *</p>
        <textarea onChange={handleDescriptionChange}></textarea>
        <p>Prix *</p>
        <input type="text" onChange={handlePriceChange} /> €
        <p>Photo *</p>
        <input type="file" onChange={handlePictureChange} /> 
        <input type="submit" value="Valider" />
      </form>
    
    </>
  );
}

export default Publish;