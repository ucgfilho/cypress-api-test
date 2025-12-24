/// <reference types="cypress" />

import devices from "../fixtures/devices.json";

describe("Busca dispositivos", () => {
  devices.forEach((device) => {
    it(`Busca dispositivo por ID`, () => {
      cy.getDevice(device.id).as("getResult");

      cy.get("@getResult").then((response) => {
        console.log(response);
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(device.id);
        expect(response.body.name).to.equal(device.name);
        if (device.data) {
          expect(response.body.data).to.deep.equal(device.data);
        }
      });
    });
  });

  it("Retorna erro ao buscar dispositivo com ID inexistente", () => {
    cy.getDevice("16").as("getResult");

    cy.get("@getResult").then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("Oject with id=16 was not found.");
    });
  });
});
