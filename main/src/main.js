
let $primerCuadro = null;
const $tablero = document.querySelector(`#tablero`);
const $cuadros = $tablero.querySelectorAll(`.cuadro`);

function configurarJuego() {
    const coloresBase = ["verdeclaro", "rojo", "salmon", "azul", "amarillo", "naranja", "violeta", "verde"];
    const coloresRepetidos = coloresBase.concat(coloresBase);
    configurarCuadros($cuadros, coloresRepetidos);
    manejarEventos($tablero);
    
};

function configurarCuadros($cuadros, colores) {
    const coloresRandom = colores.sort(function () {
        return 0.5 - Math.random();
    });

    coloresRandom.forEach(function (color, i) {
        $cuadros[i].classList.add(color);
    });
};


function manejarEventos() {

    $tablero.onclick = function (e) {
        const $elemento = e.target;
        if ($elemento.classList.contains(`cuadro`)) {
            manejarClickCuadro($elemento)
        };
    };

};

function manejarClickCuadro($cuadroActual) {

    mostrarCuadro($cuadroActual)

    if ($primerCuadro === null) {

        $primerCuadro = $cuadroActual;

    } else {

        if ($primerCuadro === $cuadroActual) {
            return;
        };

        document.querySelector(`#turnos`).value++;

        if (cuadrosSonIguales($primerCuadro, $cuadroActual)) {
            eliminarCuadro($primerCuadro);
            eliminarCuadro($cuadroActual);
        } else {
            ocultarCuadro($primerCuadro);
            ocultarCuadro($cuadroActual);
        };

        $primerCuadro = null;
    };
};
function mostrarCuadro($cuadro) {
    $cuadro.style.opacity = `1`;
};
function eliminarCuadro($cuadro) {
    setTimeout(function () {
        $cuadro.parentElement.classList.add(`completo`);
        $cuadro.remove();
        evaluarFinDelJuego();
    }, 500);

};
};
