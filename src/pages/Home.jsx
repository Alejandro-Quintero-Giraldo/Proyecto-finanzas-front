import React, { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { Bolsillo } from '../components/Bolsillo';
import { getFromLocal } from '../functions/localStorage';
import { url } from '../environment/urls';
import { Link } from 'react-router-dom';
import axios from '../environment/axios';

export const Home = () => {
  const usuarioId = getFromLocal('USER_UID');
  const [bolsillos, setBolsillos] = useState([]);

  const buscarBolsillos = () => {
    axios.get(url.buscarBolsillos(usuarioId))
      .then((res) => {
        setBolsillos(res.data);
      });
  }

  useEffect(() => {
    buscarBolsillos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <NavBar />
      <div className="home__container-title">
        <h1 className="home__title">Estos son tus bolsillos</h1>
      </div>
      {
        bolsillos.length === 0
          ? (
            <div className="home__loading">
              <p>Estamos buscando tus bolsillos... Si la búsqueda se alarga mucho, es probable que no tengas bolsillos creados...</p>
              <div className="home__loading-container-text">
                <p className="home__loading-text">Puedes crear tu primer bolsillo dando click en el siguiente botón:</p>
                <Link to="/crear/bolsillo" className="home__redirect-button">
                  Crear bolsillo
                </Link>
              </div>
              <i className="fas fa-sync fa-10x fa-spin home__loading-icon"></i>
            </div>
          )
          : null
      }
      <div className="home__bolsillos">
        {bolsillos?.map((bolsillo) => (
          <Bolsillo key={bolsillo.id} bolsillo={bolsillo} />
        ))}
      </div>
    </div>
  );
}