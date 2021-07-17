import React from 'react';
import { formatDate } from '../functions/formatDate';

export const Movimiento = ({ movimiento }) => {
  return (
    <div className="movimiento">
      <p>{movimiento.tipo === 'Ingreso' ? (<><i className="fas fa-2x fa-cart-plus"></i> Ingreso</>) : (<><i className="fas fa-2x fa-cart-arrow-down"></i>Egreso</>)}</p>
      <p>
        <strong>Fecha: </strong>
        {formatDate(movimiento.fecha)}
      </p>
      <p>
        <strong>Saldo: </strong>
        ${movimiento.saldo}
      </p>
    </div>
  );
}