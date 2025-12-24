/// <reference types="cypress" />

import devices from "../fixtures/devices.json";

describe("Busca dispositivos", () => {
  devices.forEach((device) => {
    it(`Busca dispositivo por ID`, () => {
      // Realiza GET por ID
      cy.request({
        method: "GET",
        url: `https://api.restful-api.dev/objects/${device.id}`,
        failOnStatusCode: false,
      }).as("getResult");

      // Valida GET
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
    // Realiza GET por ID inexistente
    cy.request({
      method: "GET",
      url: "https://api.restful-api.dev/objects/16",
      failOnStatusCode: false,
    }).as("getResult");

    // Valida GET
    cy.get("@getResult").then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("Oject with id=16 was not found.");
    });
  });
});
