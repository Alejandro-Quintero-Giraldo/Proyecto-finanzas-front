import React, { useEffect, useState } from "react";
import { getFromLocal } from "../functions/localStorage";
import { Movimiento } from "../components/Movimiento";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { url } from "../environment/urls";
import { v4 } from "uuid";
import axios from "../environment/axios";
import Swal from "sweetalert2";

export const Bolsillo = () => {
  const { bolsilloId } = useParams();
  const usuarioId = getFromLocal("USER_UID");
  const [bolsillo, setBolsillo] = useState({});
  const [movimientos, setMovimientos] = useState([]);
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);

  const buscarBolsillo = () => {
    axios.get(url.buscarBolsillo(bolsilloId)).then((res) => {
      if (res.status === 200) {
        setBolsillo(res.data);
      }
    });
  };

  const buscarMovimientos = () => {
    axios.get(url.buscarMovimientos(bolsilloId)).then((res) => {
      if (res.status === 200) {
        setMovimientos(res.data);
      }
    });
  };

  useEffect(() => {
    buscarBolsillo();
    buscarMovimientos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <NavBar />
      <div className="detail-bolsillo__info">
        En este apartado podrás ver una información ampliada sobre tu bolsillo.
        Puedes ver los movimientos que has realizado dentro de él. Los ingresos
        mensuales es la cantidad de ingresos obtenidos en un mes específico.
        Debes ingresarle el número de un mes para que te arroje el resultado,
        como por ejemplo: para Enero escribes 1, Febrero escribes 2, Marzo
        escribes 3, etc. De la misma forma funcionan los egresos mensuales. Por
        último, para ingresar y sacar dinero, no pueden poner valores negativos
        o iguales a 0.
      </div>
      <div className="detail-bolsillo__bolsillo">
        <div className="details-bolsillo__container-bolsillo">
          {bolsillo.esAhorro ? (
            <i class="fas fa-5x fa-piggy-bank"></i>
          ) : (
            <i className="fas fa-5x fa-money-bill-wave"></i>
          )}
          <h1 className="detail-bolsillo__title">{bolsillo.nombre}</h1>
          <p>
            <strong>Porcentaje de ahorro: </strong>
            {bolsillo.porcentajeAhorro}%
          </p>
          <p>
            <strong>Saldo disponible: </strong>${bolsillo.saldoDisponible}
          </p>
          <p>
            <strong>Ingresos mensuales: </strong>${ingresos}
          </p>
          <p>
            <strong>Egresos mensuales: </strong>${egresos}
          </p>
        </div>
        <div className="detail-bolsillo__container-buttons">
          {/* INGRESAR DINERO */}
          <button
            className="detail-bolsillo__button"
            onClick={() => {
              Swal.fire({
                title: `Ingresar saldo`,
                text: "Ingresa la cantidad de saldo que deseas añadir al bolsillo",
                input: "number",
                inputAttributes: {
                  autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonColor: "#f6d268",
                confirmButtonText: "Añadir",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#f66868",
                showLoaderOnConfirm: true,
                backdrop: true,
                preConfirm: (number) => {
                  if (parseInt(number) < 1) {
                    Swal.fire({
                      title: "No puedes ingresar un saldo inferior a uno",
                      confirmButtonText: "¡Entendido!",
                      confirmButtonColor: "#f6d268",
                      icon: "error",
                    });
                  } else {
                    axios
                      .post(
                        url.ingresarSaldo(v4(), number, bolsillo.id, usuarioId)
                      )
                      .then((res) => {
                        if (res.status === 200) {
                          Swal.fire({
                            title: "¡Saldo agregado con éxito!",
                            confirmButtonText: "¡Entendido!",
                            confirmButtonColor: "#f6d268",
                            icon: "success",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              window.location.reload();
                            }
                          });
                        }
                      });
                  }
                },
                allowOutsideClick: () => !Swal.isLoading(),
              });
            }}
          >
            Ingresar dinero
          </button>
          {/* INGRESAR DINERO */}

          {/* SACAR DINERO */}
          <button
            className="detail-bolsillo__button"
            onClick={() => {
              Swal.fire({
                title: `Retirar saldo`,
                text: "Ingresa la cantidad de saldo que deseas retirar del bolsillo",
                input: "number",
                inputAttributes: {
                  autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonColor: "#f6d268",
                confirmButtonText: "Retirar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#f66868",
                showLoaderOnConfirm: true,
                backdrop: true,
                preConfirm: (number) => {
                  if (
                    parseInt(number) < 1 ||
                    parseInt(number) > bolsillo.saldoDisponible
                  ) {
                    Swal.fire({
                      title:
                        "No puedes retirar un saldo inferior a uno o mayor al saldo disponible",
                      confirmButtonText: "¡Entendido!",
                      confirmButtonColor: "#f6d268",
                      icon: "error",
                    });
                  } else {
                    axios
                      .post(
                        url.sacarDinero(v4(), number, bolsillo.id, usuarioId)
                      )
                      .then((res) => {
                        if (res.status === 200) {
                          Swal.fire({
                            title: "¡Saldo retirado con éxito!",
                            confirmButtonText: "¡Entendido!",
                            confirmButtonColor: "#f6d268",
                            icon: "success",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              window.location.reload();
                            }
                          });
                        }
                      });
                  }
                },
                allowOutsideClick: () => !Swal.isLoading(),
              });
            }}
          >
            Sacar dinero
          </button>
          {/* SACAR DINERO */}

          {/* INGRESOS MENSUALES */}
          <button
            className="detail-bolsillo__button"
            onClick={() => {
              Swal.fire({
                title: `Ver ingresos mensuales`,
                text: "Ingresa el número del mes del que quieres ver los ingresos",
                input: "number",
                inputAttributes: {
                  autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonColor: "#f6d268",
                confirmButtonText: "Ver",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#f66868",
                showLoaderOnConfirm: true,
                backdrop: true,
                preConfirm: (number) => {
                  if (parseInt(number) < 1 || parseInt(number) > 12) {
                    Swal.fire({
                      title:
                        "El número del mes debe estar dentro de los 12 meses del año",
                      confirmButtonText: "¡Entendido!",
                      confirmButtonColor: "#f6d268",
                      icon: "error",
                    });
                  } else {
                    axios
                      .get(url.ingresosMensuales(bolsillo.id, number, "2021"))
                      .then((res) => {
                        if (res.status === 200) {
                          setIngresos(res.data);
                        }
                      });
                  }
                },
                allowOutsideClick: () => !Swal.isLoading(),
              });
            }}
          >
            Ingresos mensuales
          </button>
          {/* INGRESOS MENSUALES */}

          {/* EGRESOS MENSUALES */}
          <button
            className="detail-bolsillo__button"
            onClick={() => {
              Swal.fire({
                title: `Ver egresos mensuales`,
                text: "Ingresa el número del mes del que quieres ver los egresos",
                input: "number",
                inputAttributes: {
                  autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonColor: "#f6d268",
                confirmButtonText: "Ver",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#f66868",
                showLoaderOnConfirm: true,
                backdrop: true,
                preConfirm: (number) => {
                  if (parseInt(number) < 1 || parseInt(number) > 12) {
                    Swal.fire({
                      title:
                        "El número del mes debe estar dentro de los 12 meses del año",
                      confirmButtonText: "¡Entendido!",
                      confirmButtonColor: "#f6d268",
                      icon: "error",
                    });
                  } else {
                    axios
                      .get(url.egresosMensuales(bolsillo.id, number, "2021"))
                      .then((res) => {
                        if (res.status === 200) {
                          setEgresos(res.data);
                        }
                      });
                  }
                },
                allowOutsideClick: () => !Swal.isLoading(),
              });
            }}
          >
            Egresos mensuales
          </button>
          {/* EGRESOS MENSUALES */}
        </div>
      </div>
      <div className="detail-bolsillos__movimientos">
        <h1 className="detail-bolsillo__title">Movimientos</h1>
        <br />
        <div className="detail-bolsillo__container-movimientos">
          {movimientos?.map((movimiento) => (
            <Movimiento key={movimiento.id} movimiento={movimiento} />
          ))}
        </div>
      </div>
    </div>
  );
};
