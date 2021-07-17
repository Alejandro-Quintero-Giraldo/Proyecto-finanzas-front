import React, { useEffect, useState } from "react";
import { getFromLocal } from "../functions/localStorage";
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import { url } from '../environment/urls';
import axios from '../environment/axios';

export const FormBolsillo = ({ crearBolsillo, editarBolsillo, crear, bolsilloId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const usuarioId = getFromLocal('USER_UID');
  const [bolsillo, setBolsillo] = useState({});

  const onSubmit = data => {
    if (crear) {
      crearBolsillo(v4(), data.nombre, usuarioId, data.ahorro);
    } else {
      editarBolsillo(bolsillo.id, data.nombre, bolsillo.uid, data.ahorro);
    }
  }

  const buscarBolsillo = () => {
    axios.get(url.buscarBolsillo(bolsilloId))
      .then(res => {
        if (res.status === 200) {
          setBolsillo(res.data);
        }
      });
  }

  useEffect(() => {
    if (bolsilloId) {
      buscarBolsillo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="form-bolsillo">

      {
        errors.ahorro || errors.nombre ?
          (
            <div className="form-bolsillo__errores">
              Los datos ingresados son erróneos.
            </div>
          ) : null
      }

      <form className="form-bolsillo__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-bolsillo__input">
          <i className="fas fa-3x fa-signature"></i>
          <input {...register('nombre', { required: true, max: 20 })} defaultValue={bolsillo?.nombre} type="text" placeholder="Nombre del bolsillo" />
        </div>
        <div className="form-bolsillo__input">
          <i className="fas fa-3x fa-donate"></i>
          <input {...register('ahorro', { required: true, max: 99 })} defaultValue={bolsillo?.porcentajeAhorro} type="number" placeholder="Porcentaje de ahorro" />
        </div>
        {
          crear ? <button type="submit" className="form-bolsillo__button">Crear</button> : <button type="submit" className="form-bolsillo__button">Editar</button> 
        }
      </form>

      <div className="form-bolsillo__information">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint iste a
        dolorem obcaecati, error quod, esse amet officia eveniet possimus sequi
        totam, dolorum deserunt tenetur harum porro doloremque animi deleniti.
        Quidem temporibus expedita, voluptatibus maiores maxime eveniet in qui
        saepe id accusantium illo quia tenetur adipisci fuga ipsum quae
        dignissimos vero deleniti? Corrupti tempore ipsam quod adipisci commodi
        neque dignissimos.
      </div>
    </div>
  );
};
