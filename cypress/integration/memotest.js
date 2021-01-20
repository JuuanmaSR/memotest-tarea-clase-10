const URLMEMOTEST = `http://192.168.1.4:8081`;

context(`memotest`, () => {
    before(() => {
        cy.visit(URLMEMOTEST);
    });

    describe(`juega al memotest`, () => {
        const NUMEROS_CUADROS = 16;
        it(`Asegurar que el tablero no sea visible antes de apretar el boton comenzar`, () => {
            cy.get(`#tablero`).should('not.visible');
        });
        it(`Asegurar la existencia de cuadros en el tablero`, () => {
            cy.get(`#tablero`).find(`.cuadro`).should(`have.length`, NUMEROS_CUADROS);
        });
    });


});
