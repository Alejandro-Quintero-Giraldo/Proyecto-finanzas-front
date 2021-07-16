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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae,
          quidem! Vero officiis dolores aspernatur asperiores nobis, quod beatae
          excepturi, blanditiis soluta facilis at. Minima quibusdam porro
          corporis commodi at vitae!
        </p>
        <button className="login__button" onClick={signInWithGoogle}>
          <i className="fab fa-google"></i>
          Sign In
        </button>
      </div>
    </div>
  );
};
