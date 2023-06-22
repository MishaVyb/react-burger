describe('ingredients -> constructor -> make order', function () {
  enum Alias {
    BUN = 'bun-ingredient-card',
    MAIN = 'main-ingredient-card',
    SAUCE = 'sauce-ingredient-card',

    CONSTRUCTOR_LIST = 'constructor-elements-list',
    CONSTRUCTOR_ELEMENT_TOP = 'constructor-element-top',
    CONSTRUCTOR_ELEMENT_BOTTOM = 'constructor-element-bottom',

    ORDER_BUTTON = 'make-order-button',
  }

  const tag = (selector: string) => `@${selector}`

  beforeEach(() => {
    // Mock http
    cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as('loginRequest')
    cy.intercept('POST', 'api/auth/token', { fixture: 'login.json' }).as('loginRequest')
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('ingredientsRequest')
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('orderRequest')

    // Make login
    cy.visit('/login')
    cy.get('[type="email"]').type('mail@mail.com')
    cy.get('[type="password"]').type('12345678')
    cy.get('[type="submit"]').click()

    // After login there should be auto-redirect to `/`
    cy.wait('@loginRequest').then(() => {
      // Select all element we need for test
      cy.get('[data-testid="ingredient-list-Булки"]').within(() => {
        cy.get('[data-testid="ingredient-card"]').first().as(Alias.BUN)
      })
      cy.get('[data-testid="ingredient-list-Соусы"]').within(() => {
        cy.get('[data-testid="ingredient-card"]').first().as(Alias.SAUCE)
      })
      cy.get('[data-testid="ingredient-list-Начинки"]').within(() => {
        cy.get('[data-testid="ingredient-card"]').first().as(Alias.MAIN)
      })

      cy.get('[data-testid="constructor-elements-list"]').as(Alias.CONSTRUCTOR_LIST)
      cy.get('[data-testid="constructor-element-top"]').as(Alias.CONSTRUCTOR_ELEMENT_TOP)
      cy.get('[data-testid="constructor-element-bottom"]').as(Alias.CONSTRUCTOR_ELEMENT_BOTTOM)

      cy.get('[data-testid="make-order-button"]').as(Alias.ORDER_BUTTON)
    })
  })

  it('should open model on click and close it', function () {
    ;[Alias.BUN, Alias.MAIN, Alias.SAUCE].forEach((selector) => {
      // Open modal
      cy.get(tag(selector)).click()
      // Assert
      cy.get('[data-testid="ingredient-detail-title"]').should('contain', 'Детали ингредиента')
      // Close modal
      cy.get('[data-testid="modal-close-button"]').click()
    })
  })

  it('should be drag-n-drop-able and should make order', () => {
    // Perform DnD for SAUCE
    cy.get(tag(Alias.SAUCE))
      .drag(tag(Alias.CONSTRUCTOR_LIST))
      .then((success) => {
        assert.isTrue(success)
      })

    // Check ingredient appers at contractor
    cy.get(tag(Alias.CONSTRUCTOR_LIST)).should('contain.text', 'Соус Spicy-X')

    // Perform DnD for MAIN
    cy.get(tag(Alias.MAIN))
      .drag(tag(Alias.CONSTRUCTOR_LIST))
      .then((success) => {
        assert.isTrue(success)
      })

    // Check ingredient appers at contractor
    cy.get(tag(Alias.CONSTRUCTOR_LIST)).should('contain.text', 'Биокотлета из марсианской Магнолии')

    // Perform DnD for BUN
    cy.get(tag(Alias.BUN))
      .drag(tag(Alias.CONSTRUCTOR_ELEMENT_TOP))
      .then((success) => {
        assert.isTrue(success)
      })

    // Check BUN appers *both* on top and bottom
    cy.get(tag(Alias.CONSTRUCTOR_ELEMENT_TOP)).should('contain.text', 'Краторная булка')
    cy.get(tag(Alias.CONSTRUCTOR_ELEMENT_BOTTOM)).should('contain.text', 'Краторная булка')

    // Make order
    cy.get(tag(Alias.ORDER_BUTTON)).click()
    cy.wait('@orderRequest').then(() => {
      cy.get('[data-testid="order-detail-title"]').should('contain.text', 'Space краторный spicy бургер')
      cy.get('[data-testid="order-detail-number"]').should('contain.text', '9546')
    })
  })
})
