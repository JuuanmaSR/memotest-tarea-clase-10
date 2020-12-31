
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

function ocultarCuadro($cuadro) {
    setTimeout(function () {
        $cuadro.style.opacity = `0`;
    }, 500);

};

function eliminarCuadro($cuadro) {
    setTimeout(function () {
        $cuadro.parentElement.classList.add(`completo`);
        $cuadro.remove();
        evaluarFinDelJuego();
    }, 500);

};

function cuadrosSonIguales($cuadro1, $cuadro2) {
    return $cuadro1.className === $cuadro2.className;
};

function evaluarFinDelJuego() {
    if (document.querySelectorAll(`.cuadro`).length === 0) {
        ocultarTablero();
        setTimeout(function () {
            mostrarMensajeFinDeJuego();
        }, 900);

    };
};

function mostrarTablero() {
    $tablero.className = `visible`;
    document.querySelector(`#bienvenida`).remove();
};

function ocultarTablero() {
    setTimeout(function () {
        $tablero.classList.add(`invisible`)
    }, 600);
};

function mostrarMensajeFinDeJuego() {
    let $turnos = document.querySelector(`#turnos`).value;
    let turnos = document.querySelector(`#mensaje-turnos`);
    turnos.textContent = $turnos;
    document.querySelector(`#final-juego`).className = `visible`;
};









document.querySelector(`#comenzar`).onclick = function () {

    configurarJuego();
    mostrarTablero();


};




