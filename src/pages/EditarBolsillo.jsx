import React from 'react';
import { FormBolsillo } from '../components/FormBolsillo';
import { NavBar } from '../components/NavBar';
import { url } from '../environment/urls';
import { useHistory, useParams } from 'react-router';
import Swal from 'sweetalert2';
import axios from '../environment/axios';

export const EditarBolsillo = () => {
  const history = useHistory();
  const { bolsilloId } = useParams();

  const editarBolsillo = (bolsilloId, nombre, usuarioId, porcentajeAhorro) => {
    axios.put(url.editarBolsillo(bolsilloId, nombre, usuarioId, porcentajeAhorro))
      .then(res => {
        if (res.status === 200) {
          Swal.fire({
            title: "¡Bolsillo editado con éxito!",
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
            title: "El bolsillo no pudo ser editado",
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
      <FormBolsillo editarBolsillo={editarBolsillo} crear={false} bolsilloId={bolsilloId}/>
    </div>
  );
}