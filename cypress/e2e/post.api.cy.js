/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("Cadastra dispositivo", () => {
  const dataAtual = new Date().toISOString().slice(0, 10);

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

  // Bodies para testes negativos
  const bodyYearFuturo = {
    name: faker.commerce.productName(),
    data: {
      year: 2027,
      price: 1849.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
    },
  };

  const bodyYearString = {
    name: faker.commerce.productName(),
    data: {
      year: "2019",
      price: 1849.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
    },
  };

  const bodyPriceString = {
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

  it.only("Realiza POST válido", () => {
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
      body: body,
    }).as("postResult");

    // Valida POST
    cy.get("@postResult").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.exist;
      expect(response.body.name).to.equal(body.name);
      expect(response.body.createdAt.slice(0, 10)).to.equal(dataAtual);
      expect(response.body.data).to.deep.equal(body.data);
    });
  });

  it("Realiza POST com year maior que o ano atual", () => {
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
      body: bodyYearFuturo,
    }).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.exist;
    });
  });

  it("Realiza POST com year em formato string", () => {
    // Realiza POST para cadastrar dispositivo
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
      body: bodyYearString,
    }).as("postResult");

    // Valida POST
    cy.get("@postResult").then((response) => {
      expect(response.body.error);
    });
  });

  it("Realiza POST com price em formato string", () => {
    // Realiza POST para cadastrar dispositivo
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
      body: bodyPriceString,
    }).as("postResult");

    // Valida POST
    cy.get("@postResult").then((response) => {
      expect(response.body.error);
    });
  });

  it("Realiza POST sem body", () => {
    // Realiza POST sem body
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
    }).as("postResult");

    // Valida POST
    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.equal(
        "400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all."
      );
    });
  });

  it("Realiza POST com body vazio", () => {
    // Realiza POST com body vazio
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
      body: {},
    }).as("postResult");

    // Valida POST
    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.exist;
    });
  });

  it("Realiza POST sem o campo name", () => {
    // Realiza POST sem o campo name
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
      body: bodyWithoutName,
    }).as("postResult");

    // Valida POST
    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.exist;
    });
  });
});
