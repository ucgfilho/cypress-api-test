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

    it("Cadastra novo dispositivo", () => {
        cy.request({
            method: "POST",
            url: "https://api.restful-api.dev/objects",
            failOnStatusCode: false,
            body: body,
        }).as("postResult");

    // Validações
        cy.get("@postResult").then((response) => {
            console.log(response);
            expect(response.status).to.equal(200);
            expect(response.body.id).to.exist;
            expect(response.body.name).to.equal(body.name);
            expect(response.body.createdAt.slice(0, 10)).to.equal(dataAtual);
            expect(response.body.data).to.deep.equal(body.data);
        });
  });
});