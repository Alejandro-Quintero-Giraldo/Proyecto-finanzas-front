import React from 'react';

export const Usuario = ({ usuario }) => {
  return (
    <div className="usuario">
      <div>
        <i className="fas fa-4x fa-user"></i>
      </div>
      <strong>{usuario.nombre}</strong>
      <span>{usuario.email}</span>
    </div>
  );
}