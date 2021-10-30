describe('testing all user api', () => {

    it('should return all existing users', () => {
        cy.login();
        cy.request({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/user'
        })
        .should((response) => {
            expect(response.status).to.eq(200)
        });
    });

    it('should not return all existing users because not authorized', () => {
        cy.request({
            method: 'GET',
            failOnStatusCode: false,
            url: 'http://127.0.0.1:8000/api/user'
        })
        .should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).eq("Unauthorized.")
        });
    });

    it('should create new user', () => {
        cy.request({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/user',
            body: {
                username: "gebruiker",
                password: "test",
                passwordconf: "test",
                email: "test@test.com"
              }
        })
        .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).eq("User has been registered.")
        });
    });
    
    it('should not create new user because password verification is incorrect', () => {
        cy.request({
            method: 'POST',
            failOnStatusCode: false,
            url: 'http://127.0.0.1:8000/api/user',
            body: {
                username: "gebruiker2",
                password: "test",
                passwordconf: "testt",
                email: "test@test.com"
              }
        })
        .should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).eq("Password verification is incorrect.")
        });
    });
    
    it('should not create new user because missing params', () => {
        cy.request({
            method: 'POST',
            failOnStatusCode: false,
            url: 'http://127.0.0.1:8000/api/user',
            body: {
                username: "gebruiker3",
                password: "test",
                email: "test@test.com"
              }
        })
        .should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).eq("Missing params.")
        });
    });

    it('should update existing user', () => {
        cy.login();
        cy.request({
            method: 'PATCH',
            url: 'http://127.0.0.1:8000/api/user/617142e069b79b137d2ccf33',
            body: {
                oldpassword: "test",
                oldpasswordconf: "test",
                newpassword: "supersecure"
              }
        })
        .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).eq("Password has been updated.")
        });
    });

    it('should not update existing user because missing params', () => {
        cy.login();
        cy.request({
            method: 'PATCH',
            failOnStatusCode: false,
            url: 'http://127.0.0.1:8000/api/user/617142e069b79b137d2ccf33',
            body: {
                oldpassword: "test",
                newpassword: "supersecure"
              }
        })
        .should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).eq("Missing params.")
        });
    });

    it('should not update existing user because current password is wrong', () => {
        cy.login();
        cy.request({
            method: 'PATCH',
            failOnStatusCode: false,
            url: 'http://127.0.0.1:8000/api/user/617142e069b79b137d2ccf33',
            body: {
                oldpassword: "adaaaa",
                oldpasswordconf: "adaaaa",
                newpassword: "supersecure"
              }
        })
        .should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).eq("Current password is wrong.")
        });
    });
  });