let turnos = 0;
let tiempo = 0;
const $tablero = document.querySelector(`#tablero`);
const $cuadros = $tablero.querySelectorAll(`.cuadro`);

function configurarJuego() {
    const coloresBase = ["verdeClaro", "rojo", "salmon", "azul", "amarillo", "naranja", "violeta", "verde"];
    const coloresRepetidos = coloresBase.concat(coloresBase);
    configurarCuadros($cuadros, coloresRepetidos);

};
