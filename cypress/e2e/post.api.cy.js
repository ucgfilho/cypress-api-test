/// <reference types="cypress" />
import payloads from "../fixtures/payloads.json";

describe("Cadastra dispositivo", () => {
  const dataAtual = new Date().toISOString().slice(0, 10);

  it("Realiza POST válido", () => {
    cy.createDevice(payloads.deviceSuccess).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.exist;
      expect(response.body.name).to.equal(payloads.deviceSuccess.name);
      expect(response.body.createdAt.slice(0, 10)).to.equal(dataAtual);
      expect(response.body.data).to.deep.equal(payloads.deviceSuccess.data);
    });
  });

  it("Realiza POST com year maior que o ano atual", () => {
    cy.createDevice(payloads.deviceYearFuture).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.exist;
    });
  });

  it("Realiza POST com year em formato string", () => {
    cy.createDevice(payloads.deviceYearString).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.exist;
    });
  });

  it("Realiza POST com price em formato string", () => {
    cy.createDevice(payloads.devicePriceString).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.exist;
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
    cy.createDevice(payloads.deviceWithoutName).as("postResult");

    cy.get("@postResult").then((response) => {
      expect(response.body.error).to.exist;
    });
  });
});
