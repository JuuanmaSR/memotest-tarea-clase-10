const URLMEMOTEST = `http://192.168.1.5:8080`;

context(`memotest`, () => {
    before(() => {
        cy.visit(URLMEMOTEST);
    });

    describe(`iniciar memotest`, () => {
        const NUMEROS_CUADROS = 16;
        it(`Asegurar que el tablero no sea visible antes de apretar el boton comenzar`, () => {
            cy.get(`#tablero`).should('not.be.visible');
        });

        it(`Asegurar la existencia de cuadros en el tablero`, () => {
            cy.get(`#tablero`).find(`.cuadro`).should(`have.length`, NUMEROS_CUADROS);
        });

        it('Asegurar que cuando se haga click en el boton comenzar se muestre el tablero', () => {
            cy.get(`#comenzar`).click();
            cy.get(`#tablero`).should('be.visible');
        });

        it(`Asegurar que los cuadros sean aleatorios`, () => {
            cy.get(`.cuadro`).then((cuadros) => {
                let primerasClases = [];
                cuadros.each(function (i, cuadro) {
                    primerasClases.push(cuadro.className);
                });

                cy.visit(URLMEMOTEST);

                let segudasClases = [];
                cy.get(`.cuadro`).then((nuevosCuadros) => {
                    nuevosCuadros.each(function (i, cuadro) {
                        segudasClases.push(cuadro.className);
                    });
                    cy.wrap(primerasClases).should(`not.deep.equal`, segudasClases);
                });
            });
        });
        describe(`jugar al memotest`, () => {
            let mapaDePares, listaDePares;
            it('elige una combinacion incorrecta', () => {
                cy.get(`#comenzar`).click();

                cy.get(`.cuadro`).then((cuadros) => {
                    mapaDePares = obtenerParesDeCuadros(cuadros);
                    listaDePares = Object.values(mapaDePares);

                    console.log(listaDePares);
                    cy.get(listaDePares[0][0]).click();
                    cy.get(listaDePares[1][0]).click();

                    cy.get(`.cuadro`).should(`have.length`, NUMEROS_CUADROS);
                });
            });
            it('elige combinacion correcta', () => {
               

                cy.get(`.cuadro`).should(`have.length`, NUMEROS_CUADROS);

                listaDePares.forEach((par) => {
                    cy.get(par[0]).click();
                    cy.get(par[1]).click();
                });

                cy.get(`.cuadro`).should(`have.length`, 0);

                cy.get(`#tablero`).should(`not.be.visible`);
                
                cy.get(`#final-juego`).should(`be.visible`);
            });
        });
    });


});

function obtenerParesDeCuadros(cuadros) {
    const pares = [];

    cuadros.each((i, cuadro) => {
        const claseColor = cuadro.className.replace(`cuadro`, ``);
        if (pares[claseColor]) {
            pares[claseColor].push(cuadro);
        } else {
            pares[claseColor] = [cuadro];
        };
    });

    console.log(pares)
    return pares;
};
