export const url = {
  crearBolsillo: (bolsilloId, nombre, usuarioId, porcentajeAhorro) => `crearbolsillo/${bolsilloId}/${nombre}/${usuarioId}/${porcentajeAhorro}`,
  crearUsuario: (usuarioId, nombre, correo) => `crearUsuario/${usuarioId}/${nombre}/${correo}`,
  buscarUsuario: (usuarioId) => `mostrarUsuario/${usuarioId}`,
  buscarBolsillos: (usuarioId) => `mostrarBolsilloUid/${usuarioId}`,
}