Cypress.Commands.add("getDevice", (id) => {
  cy.request({
    method: "GET",
    url: `/objects/${id}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("createDevice", (body) => {
  cy.request({
    method: "POST",
    url: "/objects",
    failOnStatusCode: false,
    body: body,
  });
});

Cypress.Commands.add("updateDevice", (id, body) => {
  cy.request({
    method: "PUT",
    url: `/objects/${id}`,
    failOnStatusCode: false,
    body: body,
  });
});

Cypress.Commands.add("deleteDevice", (id) => {
  cy.request({
    method: "DELETE",
    url: `/objects/${id}`,
    failOnStatusCode: false,
  });
});
