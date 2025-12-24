/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("Deleta dispositivos", () => {
  // Gera dados dinâmicos para o body
  const body = {
    name: faker.commerce.productName(),
    data: {
      year: faker.date.past({ years: 10 }).getFullYear(),
      price: Number(faker.commerce.price({ min: 100, max: 5000 })),
      "CPU model": "Intel Core i9",
      "Hard disk size": `${faker.number.int({ min: 256, max: 2048 })} GB`,
    },
  };

  it("Deleta dispositivo por ID", () => {
    // Realiza POST para garantir que há um dispositivo para deletar
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
      body: body,
    }).as("postResult");

    // Valida POST
    cy.get("@postResult").then((response_post) => {
      expect(response_post.status).to.equal(200);

      // Deleta o dispositivo criado
      cy.request({
        method: "DELETE",
        url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
        failOnStatusCode: false,
      }).as("deleteResult");

      // Valida DELETE
      cy.get("@deleteResult").then((response_del) => {
        expect(response_del.status).to.equal(200);
        expect(response_del.body.message).to.equal(
          `Object with id = ${response_post.body.id} has been deleted.`
        );
      });
    });
  });
});
