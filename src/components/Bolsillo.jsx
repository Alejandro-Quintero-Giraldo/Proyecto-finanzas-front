import React from 'react';
import { Link } from 'react-router-dom';

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
              <button className="bolsillo__button-delete">
                <i className="fas fa-trash-alt"></i>
              </button>
            )
        }
      </div>
    </div>
  );
}