import React from 'react';
import { FormBolsillo } from '../components/FormBolsillo';
import { NavBar } from '../components/NavBar';
import { url } from '../environment/urls';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import axios from '../environment/axios';

export const CrearBolsillo = () => {
  const history = useHistory();

  const crearBolsillo = (bolsilloId, nombre, usuarioId, porcentajeAhorro) => {
    axios.post(url.crearBolsillo(bolsilloId, nombre, usuarioId, porcentajeAhorro))
      .then(res => {
        if (res.status === 200) {
          Swal.fire({
            title: "¡Bolsillo creado con éxito!",
            confirmButtonText: '¡Entendido!',
            confirmButtonColor: '#f6d268',
            icon: 'success'
          }).then(result => {
            if (result.isConfirmed) {
              history.push('/home');
            }
          });
        } else {
          Swal.fire({
            title: "El bolsillo no pudo ser creado",
            confirmButtonText: '¡Entendido!',
            confirmButtonColor: '#f66868',
            icon: 'error'
          });
        }
      });
  }

  return (
    <div>
      <NavBar />
      <FormBolsillo crearBolsillo={crearBolsillo} crear={true}/>
    </div>
  );
}