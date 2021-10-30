describe('testing all product api', () => {
  context('GET /product', () => {

    it('should return a list with all products', () => {
      cy.request({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/product'
      })
      .should((response) => {
        expect(response.status).to.eq(200)
      });
    });
      
    it('should return existing products', () => {
      cy.request({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/product/6156ed92d170e00abff3dd98'
      })
      .should((response) => {
        expect(response.status).to.eq(200)
      });
    });

    it('should return error product does not exist', () => {
      cy.request({
        method: 'GET',
        failOnStatusCode: false,
        url: 'http://127.0.0.1:8000/api/product/IDDOESNOTEXIST'
      })
      .should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq("Product does not exist.")
      });
    });

    it('should create new product', () => {
      cy.login();
      cy.request({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/product',
        body: {
          title: "Joe's guitar",
          description: "This is a very nice guitar",
          type: "INSTRUMENT",
          price: "150"
        }
      })
        .should((response) => {
          expect(response.status).eq(200)
          expect(response.body.message).eq("Product has been added.")
        });
    });

    it('should not create new product because missing params', () => {
      cy.login();
      cy.request({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/product',
        body: {
          title: "Joe's guitar",
          type: "INSTRUMENT",
          price: "150"
        }
      })
        .should((response) => {
          expect(response.status).eq(200)
          expect(response.body.message).eq("Product has been added.")
        });
    });


    it('should not create new product because no authorization', () => {
      cy.request({
        method: 'POST',
        failOnStatusCode: false,
        url: 'http://127.0.0.1:8000/api/product',
        body: {
          title: "Joe's guitar",
          description: "This is a very nice guitar",
          type: "INSTRUMENT",
          price: "150"
        }
      })
        .should((response) => {
          expect(response.status).eq(400)
          expect(response.body.message).eq("Unauthorized.")
        });
    });

  });
});