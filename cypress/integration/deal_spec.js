describe('testing all deal api', () => {
    context('GET /deal', () => {

        it('should return a list with all deals', () => {
            cy.request({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/deal'
            })
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        });

        it('should return existing deal', () => {
            cy.request({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/deal/61641fd791f1be141f3dfd62'
            })
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        });

        it('should not return existing deal because deal does not exist', () => {
            cy.request({
                method: 'GET',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/deal/DEALDOESNOTEXIST'
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.eq("Deal does not exist.")
            });
        });

        it('should create new product', () => {
            cy.login();
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/api/deal',
                body: {
                    name: "Super Saver Pack",
                    description: "This pack includes a producer and a guitar."
                }
            })
            .should((response) => {
                expect(response.status).eq(200)
                expect(response.body.message).eq("Deal has been added.")
            });
        });

        it('should not create new product because unauthorized', () => {
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/deal',
                body: {
                    name: "Super Saver Pack",
                    description: "This pack includes a producer and a guitar."
                }
            })
            .should((response) => {
                expect(response.status).eq(400)
                expect(response.body.message).eq("Unauthorized.")
            });
        });

        it('should not create new product because missing params', () => {
            cy.login();
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/deal',
                body: {
                    name: "Super Saver Pack",
                }
            })
            .should((response) => {
                expect(response.status).eq(400)
                expect(response.body.message).eq("Missing params.")
            });
        });

        it('should add product to existing deal', () => {
            cy.login();
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/api/deal/61641fd791f1be141f3dfd62',
                body: {
                    product_id: "6156ed92d170e00abff3dd98",
                    price: "500"
                }
            })
            .should((response) => {
                expect(response.status).eq(200)
                expect(response.body.message).eq("Product has been added to deal.")
            });
        });
        
        it('should not add product because deal does not exist', () => {
            cy.login();
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/deal/DEALDOESNOTEXIST',
                body: {
                    product_id: "6156ed92d170e00abff3dd98",
                    price: "500"
                }
            })
            .should((response) => {
                expect(response.status).eq(400)
                expect(response.body.message).eq("Product could not be added.")
            });
        });
        
        it('should not add product because unauthorized', () => {
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/deal/61641fd791f1be141f3dfd62',
                body: {
                    product_id: "6156ed92d170e00abff3dd98",
                    price: "500"
                }
            })
            .should((response) => {
                expect(response.status).eq(400)
                expect(response.body.message).eq("Unauthorized.")
            });
        });

    });
});