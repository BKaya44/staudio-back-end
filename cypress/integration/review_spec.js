describe('testing all review api', () => {
    context('GET /product/review', () => {

        it('should return list of review of a existing product', () => {
            cy.request({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/product/review/6156ed92d170e00abff3dd98'
            })
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        });

        it('should not return list of review because product does not exist', () => {
            cy.request({
                method: 'GET',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/product/review/6156ed92d170e00abff3dd98'
            })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.eq("Review for this product does not exist.")
            });
        });

        it('should create a new review for a existing product', () => {
            cy.login();
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/api/product/review/6156ed92d170e00abff3dd98',
                body: {
                    user_id: "617142e069b79b137d2ccf33",
                    description: "This product sucks.",
                    star: "2"
                }
            })
            .should((response) => {
                expect(response.status).eq(200)
                expect(response.body.message).eq("Review has been added.")
            });
        });
        
        it('should not create a new review because product does not exist', () => {
            cy.login();
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/product/review/PRODUCTDOESNOTEXIST',
                body: {
                    user_id: "617142e069b79b137d2ccf33",
                    description: "This product sucks.",
                    star: "2"
                }
            })
            .should((response) => {
                expect(response.status).eq(400)
                expect(response.body.message).eq("Review could not be added.")
            });
        });
        
        it('should not create a new review because missing params', () => {
            cy.login();
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/product/review/6156ed92d170e00abff3dd98',
                body: {
                    user_id: "617142e069b79b137d2ccf33",
                    star: "2"
                }
            })
            .should((response) => {
                expect(response.status).eq(400)
                expect(response.body.message).eq("Missing params.")
            });
        });

        it('should not create a new review because unauthorized', () => {
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: 'http://127.0.0.1:8000/api/product/review/6156ed92d170e00abff3dd98',
                body: {
                    user_id: "617142e069b79b137d2ccf33",
                    description: "This product sucks.",
                    star: "2"
                }
            })
            .should((response) => {
                expect(response.status).eq(400)
                expect(response.body.message).eq("Unauthorized.")
            });
        });
  
    });
});