describe('testing all order api', () => {
    context('GET /order', () => {

        it('should return a list with all orders', () => {
            cy.login();
            cy.request({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/order'
            })
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        });

        it('should not return a list with all orders because unauthorized', () => {
            cy.request({
                method: 'GET',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order'
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.eq("Failed to authenticate token.")
            });
        });

        it('should return existing order', () => {
            cy.login();
            cy.request({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/order/6171d3126d04e05adbf26cce'
            })
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        });
        
        it('should not return existing order because order does not exist', () => {
            cy.login();
            cy.request({
                method: 'GET',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order/ORDERDOESNOTEXIST'
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.eq("Order does not exist.")
            });
        });
        
        it('should not return existing order because order unauthorized', () => {
            cy.request({
                method: 'GET',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order/6171d3126d04e05adbf26cce'
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.eq("Failed to authenticate token.")
            });
        });

        it('should return existing order from existing user', () => {
            cy.login();
            cy.request({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/order/user/617142e069b79b137d2ccf33'
            })
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        });
        
        it('should not return order from existing user because unauthorized', () => {
            cy.request({
                method: 'GET',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order/user/617142e069b79b137d2ccf33'
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.eq("Failed to authenticate token.")
            });
        });

        it('should update existing order to paid', () => {
            cy.login();
            cy.request({
                method: 'PATCH',
                url: 'http://127.0.0.1:8000/api/order/617142e069b79b137d2ccf33',
                body: {
                    paid_status: "PAID"
                }
            })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).eq("Order has been updated.")
            });
        });
        
        it('should not update order because order does not exist', () => {
            cy.login();
            cy.request({
                method: 'PATCH',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order/ORDERDOESNOTEXIST',
                body: {
                    paid_status: "PAID"
                }
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).eq("Order does not exist.")
            });
        });
        
        it('should not update existing order because missing params', () => {
            cy.login();
            cy.request({
                method: 'PATCH',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order/617142e069b79b137d2ccf33'
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).eq("You need to give atleast one parameter to update this order.")
            });
        });
        
        it('should not update order because unauthorized', () => {
            cy.request({
                method: 'PATCH',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order/617142e069b79b137d2ccf33',
                body: {
                    paid_status: "PAID"
                }
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).eq("Failed to authenticate token.")
            });
        });

        it('should create new order', () => {
            cy.login();
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order'
            })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).eq("success")
            });
        });

        it('should not create new order because unauthorized', () => {
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order'
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).eq("Failed to authenticate token.")
            });
        });

        it('should add item to existing order', () => {
            cy.login();
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/api/order/item/6171d3126d04e05adbf26cce',
                body: {
                    product_id: "6156ed92d170e00abff3dd98",
                    amount: "1",
                    price: "200"
                }
            })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).eq("Item has been added to the order.")
            });
        });
        
        it('should not add item to order because order does not exist', () => {
            cy.login();
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order/item/ORDERDOESNOTEXIST',
                body: {
                    product_id: "6156ed92d170e00abff3dd98",
                    amount: "1",
                    price: "200"
                }
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).eq("Item could not be added to order.")
            });
        });
        
        it('should not add item to order because missing params', () => {
            cy.login();
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order/item/6171d3126d04e05adbf26cce',
                body: {
                    amount: "1",
                    price: "200"
                }
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).eq("Missing params.")
            });
        });
        
        it('should not add item to order because unauthorized', () => {
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/order/item/6171d3126d04e05adbf26cce',
                body: {
                    product_id: "6156ed92d170e00abff3dd98",
                    amount: "1",
                    price: "200"
                }
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).eq("Failed to authenticate token.")
            });
        });

    });
});