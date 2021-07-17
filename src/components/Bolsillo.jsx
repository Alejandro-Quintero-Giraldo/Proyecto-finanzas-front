import React from 'react';
import { Link } from 'react-router-dom';
import { url } from '../environment/urls';
import axios from '../environment/axios';
import Swal from 'sweetalert2';

export const Bolsillo = ({ bolsillo }) => {

  return (
    <div className="bolsillo">
      {bolsillo.esAhorro ? <i class="fas fa-5x fa-piggy-bank"></i> : <i className="fas fa-5x fa-money-bill-wave"></i>}
      <span> <strong>Bolsillo: </strong>{bolsillo.nombre}</span>
      <span><strong>Saldo:</strong> $ {bolsillo.saldoDisponible}</span>
      <div className="bolsillo__container-buttons">
        {
          bolsillo.esAhorro
            ? null
            : (
              <Link to={`/editar/bolsillo/${bolsillo.id}`} className="bolsillo__button-edit"><i className="fas fa-edit"></i></Link>
            )
        }

        <button className="bolsillo__button-see"><Link to={`/bolsillo/${bolsillo.id}`}><i className="fas fa-eye"></i></Link></button>

        {
          bolsillo.esAhorro
            ? null
            : (
              <button className="bolsillo__button-delete" onClick={() => {
                Swal.fire({
                  title: "¿Estás seguro de que deseas eliminar este bolsillo?",
                  confirmButtonText: '¡Sí!',
                  confirmButtonColor: '#f6d268',
                  cancelButtonText: 'No',
                  cancelButtonColor: '#f66868',
                  showCancelButton: true,
                  icon: 'info'
                }).then(result => {
                  if (result.isConfirmed) {
                    axios.delete(url.eliminarBolsillo(bolsillo.id))
                      .then(res => {
                        if (res.status === 200) {
                          Swal.fire({
                            title: "¡Bolsillo eliminado con éxito!",
                            confirmButtonText: '¡Entendido!',
                            confirmButtonColor: '#f6d268',
                            icon: 'success'
                          }).then(result => {
                            if (result.isConfirmed) {
                              window.location.reload();
                            }
                          });
                        } else {
                          Swal.fire({
                            title: "El bolsillo no se pudo eliminar",
                            text: 'No se puede eliminar un bolsillo con saldo, asegúrate de que no tenga saldo antes de eliminar',
                            confirmButtonText: '¡Entendido!',
                            confirmButtonColor: '#f6d268',
                            icon: 'error'
                          });
                        }
                      });
                  }
                });
              }}>
                <i className="fas fa-trash-alt"></i>
              </button>
            )
        }
      </div>
    </div>
  );
}
