import React from 'react';
import { signInWithGoogle, auth } from "../functions/firebaseAuth";
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { url } from '../environment/urls';
import { saveToLocal } from '../functions/localStorage';
import axios from '../environment/axios';

export const Login = () => {
  const history = useHistory();
  const [user] = useAuthState(auth);

  const buscarUsuario = () => {
    axios.get(url.buscarUsuario(user?.uid))
      .then(res => {
        if (res.status === 200) {
          saveToLocal('USER_PHOTO', user?.photoURL);
          saveToLocal('USER_UID', user?.uid);
          history.push('/home');
        };
      }).catch((error) => {
        crearUsuario();
      });
  }

  const crearUsuario = () => {
    axios.post(url.crearUsuario(user?.uid, user?.displayName, user?.email))
      .then(res => {
        if (res.status === 200) {
          saveToLocal('USER_PHOTO', user?.photoURL);
          saveToLocal('USER_UID', user?.uid);
          history.push('/home');
        };
      })
  }

  if (user) {
    buscarUsuario();
  }

  return (
    <div className="login">
      <div className="login__container">
        <p className="login__text">
          ¡Bienvenido a Top Finances!
          Una aplicación web que te ayuda a realizar una práctica de distribución de finanzas,  y ahorro.
          Para acceder a nuestras funcionalidades, inicia sesión con tu cuenta de Google.
        </p>
        <button className="login__button" onClick={signInWithGoogle}>
          <i className="fab fa-google"></i>
          Sign In
        </button>
      </div>
    </div>
  );
};
