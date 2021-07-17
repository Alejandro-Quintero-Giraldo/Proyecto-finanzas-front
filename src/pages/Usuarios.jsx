import React, { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { Usuario } from '../components/Usuario';
import { url } from '../environment/urls';
import axios from '../environment/axios';

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  const buscarUsuarios = () => {
    axios.get(url.buscarUsuarios)
      .then(res => {
        if (res.status === 200) {
          setUsuarios(res.data);
        }
      });
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="usuarios__container">
        {usuarios?.map(usuario => (
          <Usuario key={usuario.uid} usuario={usuario} />
        ))
        }
      </div>
    </div>
  );
}