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

  it("Realiza POST válido", () => {
    cy.createDevice(body).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.exist;
      expect(response.body.name).to.equal(body.name);
      expect(response.body.createdAt.slice(0, 10)).to.equal(dataAtual);
      expect(response.body.data).to.deep.equal(body.data);
    });
  });

  it("Realiza POST com year maior que o ano atual", () => {
    cy.createDevice(bodyYearFuturo).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.exist;
    });
  });

  it("Realiza POST com year em formato string", () => {
    cy.createDevice(bodyYearString).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.body.error);
    });
  });

  it("Realiza POST com price em formato string", () => {
    cy.createDevice(bodyPriceString).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.body.error);
    });
  });

  it("Realiza POST sem body", () => {
    cy.request({
      method: "POST",
      url: "/objects",
      failOnStatusCode: false,
    }).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.equal(
        "400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all."
      );
    });
  });

  it("Realiza POST com body vazio", () => {
    cy.createDevice({}).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.exist;
    });
  });

  it("Realiza POST sem o campo name", () => {
    cy.createDevice(bodyWithoutName).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.exist;
    });
  });
});
