import { useEffect, useState } from 'react';
import axios from 'axios';

export const RandomUser = () => {
  const [character, setCharacter] = useState(null);

  const fetchCharacter = async () => {
    try {
      
      const randomId = Math.floor(Math.random() * 826) + 1; 
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${randomId}`);
      const data = response.data;

      
      const characterData = {
        name: data.name,
        status: data.status,
        species: data.species,
        gender: data.gender,
        image: data.image,
      };


      setCharacter(characterData);
    } catch (error) {
      console.error("Error al consultar los datos de la API: ", error);
    }
  };

  useEffect(() => {
    fetchCharacter(); // Obtener un personaje al cargar el componente

    const intervalId = setInterval(fetchCharacter, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='col-lg-4'>
        {character ? (
          <div className="card text-center">
            <img src={character.image} alt={character.name} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <p className="card-text">Status: {character.status}</p>
              <p className="card-text">Species: {character.species}</p>
              <p className="card-text">Gender: {character.gender}</p>
            </div>
          </div>
        ) : (
          <p>Cargando personaje...</p>
        )}
      </div>
    </div>
  );
};

export default RandomUser;
