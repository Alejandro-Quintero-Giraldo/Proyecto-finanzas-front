import React from 'react';
import { signOutWithGoogle } from "../functions/firebaseAuth";

export const Home = () => {
  return (
    <div>
      <button onClick={signOutWithGoogle}>Salir</button>
    </div>
  );
}