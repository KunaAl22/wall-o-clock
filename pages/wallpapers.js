import React, { useEffect, useState } from 'react';
import styles from '../styles/wallpaper.module.css';

function DataPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/wallpapers') // Update the endpoint path if necessary
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const convertBase64ToImage = (base64Data) => {
    return `data:image/jpeg;base64,${base64Data}`;
  };

  return (

    <div class={styles.container}>
      
      {data.map((item) => (
        <div class = {styles.card}>

            <div class = {styles.card__header}>
            
            <img src={convertBase64ToImage(item.image)} alt="Wallpaper"/>
            
            
            </div>
            <div class="card__body">
            <p>Dscription: {item.description}</p>
            <h4>Tags : {item.tags}</h4>

            </div>
            <div class="card__footer" >
              <div class="user">

                <div class="user__info">
                  <h5>Uploaded By: {item.owner}</h5>
                </div>
              </div>
            </div>
        </div>

      ))}
    </div>


  );
}

export default DataPage;
