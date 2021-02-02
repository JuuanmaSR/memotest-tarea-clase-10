const URLMEMOTEST = `http://192.168.1.5:8080`;

context(`memotest`, () => {
    before(() => {
        cy.visit(URLMEMOTEST);
    });

    describe(`juega al memotest`, () => {
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
    });


});
