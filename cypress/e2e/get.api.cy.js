/// <reference types="cypress" />

import devices from '../fixtures/devices.json'

describe ('Busca dispositivos', () => {
    
    devices.forEach((device) => {
        it(`Busca dispositivo por ID`, () => {
            cy.request({
                method: 'GET',
                url: `https://api.restful-api.dev/objects/${device.id}`,
                failOnStatusCode: false
            }).as('getResult');
            
            // Validações
            cy.get("@getResult").then((response) => {
                console.log(response);
                expect(response.status)
                    .to.equal(200);

                expect(response.body.id)
                    .to.equal(device.id);

                expect(response.body.name)
                    .to.equal(device.name);

                if (device.data) {
                    expect(response.body.data)
                        .to.deep.equal(device.data);
                }
            })
        })
    })
});