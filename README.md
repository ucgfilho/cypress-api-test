# Cypress API Testing - Restful API Dev

Suite de testes automatizados de API para o serviço [Restful API Dev](https://restful-api.dev/), focada na validação de endpoints REST utilizando Cypress e geração de massa de dados dinâmica.

---

## 🚀 Tecnologias

| Tecnologia | Versão | Finalidade                 |
| ---------- | ------ | -------------------------- |
| Cypress    | 15.8.1 | Framework de testes        |
| Faker.js   | 10.1.0 | Geração de dados dinâmicos |
| Node.js    | 18+    | Runtime JavaScript         |

---

## Estrutura do Projeto

```
cypress-api-test/
├── cypress/
│   ├── e2e/
│   │   ├── delete.api.cy.js     # Testes de exclusão (DELETE)
│   │   ├── get.api.cy.js        # Testes de consulta (GET)
│   │   ├── post.api.cy.js       # Testes de cadastro (POST)
│   │   └── put.api.cy.js        # Testes de atualização (PUT)
│   ├── fixtures/
│   │   └── devices.json         # Massa de dados para testes
│   └── support/
│       ├── commands.js          # Comandos customizados
│       └── e2e.js               # Configuração global
├── cypress.config.js            # Configurações do Cypress
├── package.json                 # Dependências do projeto
└── README.md                    # Documentação do projeto
```

---

## Padrões de Projeto

- **Data Driven Testing**: Uso de fixtures (`devices.json`) para validar múltiplos cenários de consulta.
- **Dynamic Data Generation**: Utilização da biblioteca `Faker.js` para criar massas de dados aleatórias e robustas para os testes de cadastro.
- **API Testing**: Validações diretas de status code, corpo da resposta e contratos de API.
- **Custom Commands**: CRUD centralizado em `cypress/support/commands.js` (`createDevice`, `getDevice`, `updateDevice`, `deleteDevice`) reutilizando `cy.request` e a `baseUrl` configurada no `cypress.config.js`.

---

## Comandos customizados

| Comando           | Descrição                         |
| ----------------- | --------------------------------- |
| `cy.createDevice` | POST `/objects` com body dinâmico |
| `cy.getDevice`    | GET `/objects/{id}`               |
| `cy.updateDevice` | PUT `/objects/{id}`               |
| `cy.deleteDevice` | DELETE `/objects/{id}`            |

---

## Funcionalidades Testadas

### GET

| Cenário                  | Validações                                                        |
| ------------------------ | ----------------------------------------------------------------- |
| Busca por ID válido      | Status 200, Contrato do objeto, Dados retornados iguais à fixture |
| Busca por ID inexistente | Status 404, Mensagem de erro                                      |

### POST

| Cenário                    | Validações                                                 |
| -------------------------- | ---------------------------------------------------------- |
| Cadastro com sucesso       | Status 200, Geração de ID, Persistência dos dados enviados |
| Year maior que o ano atual | Status diferente de 200, Mensagem de erro                  |
| Year em formato string     | Status diferente de 200, Mensagem de erro                  |
| Price em formato string    | Status diferente de 200, Mensagem de erro                  |
| POST sem body              | Status 400, Mensagem de erro de bad request                |
| POST com body vazio        | Status diferente de 200, Mensagem de erro                  |
| POST sem o campo name      | Status diferente de 200, Mensagem de erro                  |

### PUT

| Cenário                 | Validações                                  |
| ----------------------- | ------------------------------------------- |
| Atualização com sucesso | Status 200, Dados atualizados corretamente  |
| Year em formato string  | Status diferente de 200, Mensagem de erro   |
| Price em formato string | Status diferente de 200, Mensagem de erro   |
| PUT sem o campo name    | Status 400, Mensagem de erro de bad request |

---

## Instalação

```bash
git clone https://github.com/ucgfilho/cypress-api-test.git
cd cypress-api-test
npm install
```

---

## Execução

```bash
# Modo interativo (Cypress App)
npx cypress open

# Modo Headless (Terminal)
npx cypress run

# Executar apenas testes de GET
npx cypress run --spec "cypress/e2e/get.api.cy.js"

# Executar apenas testes de POST
npx cypress run --spec "cypress/e2e/post.api.cy.js"

# Executar apenas testes de PUT
npx cypress run --spec "cypress/e2e/put.api.cy.js"

# Executar apenas testes de DELETE
npx cypress run --spec "cypress/e2e/delete.api.cy.js"
```

> Observação: a API pública `restful-api.dev` limita o número de requisições por dia (~100). Se atingir o limite, novas chamadas podem retornar 405/429/403 até o reset diário do provedor.

---

## Autor

**Ubirajara Filho**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ucgfilho/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ucgfilho)

---

## Licença

Este projeto está sob a licença MIT.
