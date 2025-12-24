/// <reference types="cypress" />
import payloads from "../fixtures/payloads.json";

describe("Atualiza dispositivos", () => {
  it("Atualiza dispositivo", () => {
    cy.createDevice(payloads.deviceSuccess).as("postResult");

    cy.get("@postResult").then((response_post) => {
      expect(response_post.status).to.equal(200);

      cy.updateDevice(response_post.body.id, payloads.deviceUpdate).as(
        "putResult"
      );

      cy.get("@putResult").then((response_put) => {
        expect(response_put.status).equal(200);
        expect(response_put.body.name).to.equal(payloads.deviceUpdate.name);
        expect(response_put.body.data).to.deep.equal(
          payloads.deviceUpdate.data
        );
      });
    });
  });

  it("Atualiza dispositivo com year em formato string", () => {
    cy.createDevice(payloads.deviceSuccess).as("postResult");

    cy.get("@postResult").then((response_post) => {
      expect(response_post.status).to.equal(200);

      cy.updateDevice(response_post.body.id, payloads.deviceYearString).as(
        "putResult"
      );

      cy.get("@putResult").then((response_put) => {
        expect(response_put.body.error).to.exist;
      });
    });
  });

  it("Atualiza dispositivo com price em formato string", () => {
    cy.createDevice(payloads.deviceSuccess).as("postResult");

    cy.get("@postResult").then((response_post) => {
      expect(response_post.status).to.equal(200);

      cy.updateDevice(response_post.body.id, payloads.devicePriceString).as(
        "putResult"
      );

      cy.get("@putResult").then((response_put) => {
        expect(response_put.body.error).to.exist;
      });
    });
  });

  it("Atualiza dispositivo removendo o name do body", () => {
    cy.createDevice(payloads.deviceSuccess).as("postResult");

    cy.get("@postResult").then((response_post) => {
      expect(response_post.status).to.equal(200);

      cy.updateDevice(response_post.body.id, payloads.deviceWithoutName).as(
        "putResult"
      );

      cy.get("@putResult").then((response_put) => {
        expect(response_put.body.error).to.equal(
          "400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all."
        );
      });
    });
  });
});
