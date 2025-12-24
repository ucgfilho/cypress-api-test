/// <reference types="cypress" />
import payloads from "../fixtures/payloads.json";

describe("Deleta dispositivos", () => {
  it("Deleta dispositivo por ID", () => {
    cy.createDevice(payloads.deviceSuccess).as("postResult");

    cy.get("@postResult").then((response_post) => {
      expect(response_post.status).to.equal(200);

      cy.deleteDevice(response_post.body.id).as("deleteResult");

      cy.get("@deleteResult").then((response_del) => {
        expect(response_del.status).to.equal(200);
        expect(response_del.body.message).to.equal(
          `Object with id = ${response_post.body.id} has been deleted.`
        );
      });
    });
  });
});
