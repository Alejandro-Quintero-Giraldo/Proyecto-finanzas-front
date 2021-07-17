import React, { useState, useEffect } from 'react';
import { getFromLocal } from '../functions/localStorage';
import { Link } from 'react-router-dom';
import { signOutWithGoogle } from "../functions/firebaseAuth";
import { url } from '../environment/urls';
import Logo from '../images/favicon.svg';
import axios from '../environment/axios';

export const NavBar = () => {
  const usuarioForo = getFromLocal('USER_PHOTO');
  const usuarioId = getFromLocal('USER_UID');
  const [usuario, setUsuario] = useState({});

  const buscarUsuario = () => {
    axios.get(url.buscarUsuario(usuarioId))
      .then(res => {
        if (res.status === 200) {
          setUsuario(res.data);
        };
      });
  }

  useEffect(() => {
    buscarUsuario();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar__logo">
        <img src={Logo} alt="logo" />
        <h3>Top Finances</h3>
      </Link>
      <div className="navbar__actions">
        <ul>
          <li className="navbar__items"><Link to="/crear/bolsillo">Crear bolsillo</Link></li>
          <li className="navbar__items"><Link to="/">Usuarios</Link></li>
        </ul>
        <div className="navbar__profile">
          <img src={usuarioForo} alt="userPhoto" onClick={() => {
            document.getElementById('info-profile').classList.toggle('navbar__info-user--active');
          }} />
          <div className="navbar__info-user" id="info-profile">
            {usuario.nombre}
            <hr />
            {usuario.email}
          </div>
        </div>
        <button onClick={signOutWithGoogle}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>

    </nav>
  );
}