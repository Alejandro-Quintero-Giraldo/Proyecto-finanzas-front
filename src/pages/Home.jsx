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
        console.log(res.data);
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
              <div>
                <p>Puedes crear tu primer bolsillo dando click en el siguiente botón:</p>
                <br />
                <Link className="home__redirect-button">
                  Crear bolsillo
                </Link>
              </div>
              <br />
              <br />
              <br />
              <i class="fas fa-sync fa-10x fa-spin"></i>
              <br />
              <br />
            </div>
          )
          : null
      }
      <div className="home__bolsillos">
        {bolsillos && bolsillos?.map((bolsillo) => (
          <Bolsillo key={bolsillo.id} bolsillo={bolsillo} />
        ))}
      </div>
    </div>
  );
}