/// <reference types="cypress" />

describe('Ajout de lieu', () => {
  it('remplit le formulaire et envoie en bdd un nouveau lieu', () => {
    
    cy.visit('/dashboard/location/new-location');

    // remplit les champs
    cy.get('input[name="locationName"]').type('Mon super lieu');
    cy.get('input[name="address"]').type('123 rue de test');
    cy.get('input[name="zipcode"]').type('68000');
    cy.get('input[name="city"]').type('Colmar');
    cy.get('input[name="phoneNumber"]').type('0123456789');
    cy.get('input[name="website"]').type('www.siteTest.com');
    cy.get('textarea[name="description"]').type('Un lieu super sympa à à Colmar');
    cy.get('input[name="latitude"]').type('48.8566');
    cy.get('input[name="longitude"]').type('2.3522');

    // intercepte la requête POST
    cy.intercept('POST', '/api/location').as('postLocation');

    // submit le formulaire
    cy.get('form[data-testid="location-form"]').submit();

    // attend la requête API et vérifie qu'elle répond bien 201
    cy.wait('@postLocation').its('response.statusCode').should('eq', 201);

    // vérifie qu'on est redirigé vers la bonne page
    // [a-f0-9]{24}  24 caractères héxadécimaux (car c'est ce que MongoDB génère : évite une erreur d'ID ).
    cy.url().should('match', /\/dashboard\/location\/[a-f0-9]{24}$/); 
    
  });
});
