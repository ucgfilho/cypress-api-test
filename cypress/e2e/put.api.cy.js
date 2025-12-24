/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("Atualiza dispositivos", () => {
  // Gera dados dinâmicos para o body
  const bodyPost = {
    name: faker.commerce.productName(),
    data: {
      year: faker.date.past({ years: 10 }).getFullYear(),
      price: Number(faker.commerce.price({ min: 100, max: 5000 })),
      "CPU model": "Intel Core i9",
      "Hard disk size": `${faker.number.int({ min: 256, max: 2048 })} GB`,
    },
  };

  const bodyPut = {
    name: faker.commerce.productName(),
    data: {
      year: faker.date.past({ years: 10 }).getFullYear(),
      price: Number(faker.commerce.price({ min: 100, max: 5000 })),
      "CPU model": "Intel Core i9",
      "Hard disk size": `${faker.number.int({ min: 256, max: 2048 })} GB`,
    },
  };

  // Bodies para testes negativos
  const bodyPutYearString = {
    name: faker.commerce.productName(),
    data: {
      year: "2019",
      price: 1849.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
    },
  };

  const bodyPutPriceString = {
    name: faker.commerce.productName(),
    data: {
      year: 2019,
      price: "1849.99",
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
    },
  };

  const bodyWithoutName = {
    data: {
      year: 2019,
      price: 1849.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
    },
  };

  it.only("Atualiza dispositivo", () => {
    // Cria dispositivo
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
      body: bodyPost,
    }).as("postResult");

    cy.get("@postResult").then((response_post) => {
      // Valida POST
      expect(response_post.status).to.equal(200);

      // Atualiza o dispositivo criado
      cy.request({
        method: "PUT",
        url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
        failOnStatusCode: false,
        body: bodyPut,
      }).as("putResult");

      // Valida PUT
      cy.get("@putResult").then((response_put) => {
        expect(response_put.status).equal(200);
        expect(response_put.body.name).to.equal(bodyPut.name);
        expect(response_put.body.data).to.deep.equal(bodyPut.data);
      });
    });
  });

  it("Atualiza dispositivo com year em formato string", () => {
    // Cria dispositivo
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
      body: bodyPost,
    }).as("postResult");

    cy.get("@postResult").then((response_post) => {
      // Valida POST
      expect(response_post.status).to.equal(200);

      // Atualiza o dispositivo criado
      cy.request({
        method: "PUT",
        url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
        failOnStatusCode: false,
        body: bodyPutYearString,
      }).as("putResult");

      // Valida PUT
      cy.get("@putResult").then((response_put) => {
        expect(response_put.body.error).to.exist;
      });
    });
  });

  it("Atualiza dispositivo com price em formato string", () => {
    // Cria dispositivo
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
      body: bodyPost,
    }).as("postResult");

    cy.get("@postResult").then((response_post) => {
      // Valida POST
      expect(response_post.status).to.equal(200);

      // Atualiza o dispositivo criado
      cy.request({
        method: "PUT",
        url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
        failOnStatusCode: false,
        body: bodyPutPriceString,
      }).as("putResult");

      // Valida PUT
      cy.get("@putResult").then((response_put) => {
        expect(response_put.body.error).to.exist;
      });
    });
  });

  it("Atualiza dispositivo removendo o name do body", () => {
    // Cria dispositivo
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
      body: bodyPost,
    }).as("postResult");

    cy.get("@postResult").then((response_post) => {
      // Valida POST
      expect(response_post.status).to.equal(200);

      // Atualiza o dispositivo criado
      cy.request({
        method: "PUT",
        url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
        failOnStatusCode: false,
        body: bodyWithoutName,
      }).as("putResult");

      // Valida PUT
      cy.get("@putResult").then((response_put) => {
        expect(response_put.body.error).to.equal(
          "400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all."
        );
      });
    });
  });
});
