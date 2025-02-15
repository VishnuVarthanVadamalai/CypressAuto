
const neatCSV = require('neat-CSV');
describe('Order', () => {      
  let table;
  
    beforeEach(()=>{
      cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/Patient_Details.csv")
              .then(neatCSV)
              .then(data=> {
                  table = data ;
                 })
        .then(console.table)
        cy.visit("http://healai-billing.s3-website-us-east-1.amazonaws.com/")
        cy.get('[name="email"]').clear()
        cy.get('[name="email"]').type("superadmin")
        cy.get('[name="password"]').clear()
        cy.get('[name="password"]').type("superadmin")
        cy.get('button[aria-label=\'Login\']').click()
        cy.get('h6:nth-child(1)').should('be.visible')
        cy.get('h6:nth-child(1)').eq(0).click()

      });


    it('To Create Order Refered by Doctor', () => {
      
      cy.get('.actions-left > .MuiButtonBase-root',{timeout: 10000}).should('be.visible')
      cy.get('.actions-left > .MuiButtonBase-root').click()
      cy.get('li:nth-child(2) a:nth-child(1) div:nth-child(2) p:nth-child(1)').click()
      cy.get('button[aria-label=\'Add a new order to the system\']').click({force: true})

      cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(0).click()
      cy.get('[role="option"]').contains('Gayathri - 9876543210').click()

      cy.get('input[name=\'showDoctorSelect\']').click()
      cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(1).click()
      cy.get('[role="option"]').contains('Jacob Martin').click()

      cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(2).click()
      cy.get('[role="option"]').contains('MRI ANGIGRAPHY BOTH LOWER LIMB').click()

      cy.get('button[aria-label=\'Add to Cart\']').eq(0).click()
      cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.css-gpdodt').click()

      cy.get('div[role=\'status\']').invoke('text').then((strText) => {
        cy.log('Paragraph text:', strText);
        expect(strText).to.equal('Order added successfully!');
      });
    })

    it('Edit_order', () => {
      cy.get('.actions-left > .MuiButtonBase-root',{timeout: 10000}).should('be.visible')
      cy.get('.actions-left > .MuiButtonBase-root').click()
      cy.get('li:nth-child(2) a:nth-child(1) div:nth-child(2) p:nth-child(1)').click()
      cy.get('svg[data-testid=\'MoreVertIcon\']').eq(0).click()
      cy.get('div[role=\'tooltip\'] li:nth-child(4)').click()
      cy.get('div[role=\'presentation\'] button:nth-child(2)').eq(1).click()
      cy.get('span[class=\'MuiButton-icon MuiButton-startIcon MuiButton-iconSizeSmall css-1ti2r9g\']').click() 

      cy.get('button[aria-label=\'Add to Cart\']').eq(1).click()
      cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.css-gpdodt').click()

      cy.get('div[role=\'status\']').invoke('text').then((strText) => {
        cy.log('Paragraph text:', strText);
        expect(strText).to.equal('Order updated successfully!');
      });
    })

    it('Delete_Order', () => {
      cy.get('.actions-left > .MuiButtonBase-root',{timeout: 10000}).should('be.visible')
      cy.get('.actions-left > .MuiButtonBase-root').click()
      cy.get('li:nth-child(2) a:nth-child(1) div:nth-child(2) p:nth-child(1)').click()
      cy.get('svg[data-testid=\'MoreVertIcon\']').eq(0).click()
      cy.get('div[role=\'tooltip\'] li:nth-child(3)').click()
      cy.get('div[role=\'presentation\'] button:nth-child(2)').eq(1).click()

      cy.get('div[role=\'status\']').invoke('text').then((strText) => {
        cy.log('Paragraph text:', strText);
        expect(strText).to.equal('Order deleted successfully');
      });
    })


    it.skip('To Create Order Refered by Sales', () => {
        expect(true).to.equal(true)
        cy.log("vishnu varthan Sales")
        cy.visit("http://healai-billing.s3-website-us-east-1.amazonaws.com/")
        cy.get('[name="email"]').clear()
        cy.get('[name="email"]').type("superadmin")
        cy.get('[name="password"]').clear()
        cy.get('[name="password"]').type("superadmin")
        cy.get('button[aria-label=\'Login\']').click()
        cy.wait(1000);
        cy.get('h6:nth-child(1)').click()
    
        cy.get('.actions-left > .MuiButtonBase-root').click()
  
        cy.get('li:nth-child(2) a:nth-child(1) div:nth-child(2) p:nth-child(1)').click()
        cy.get('button[aria-label=\'Add a new order to the system\']').click()
  
        cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(0).click()
        cy.get('[role="option"]').contains('Gayathri - 9876543210').click()
  
        cy.get('input[name=\'showSalesPersonSelect\']').click()
        cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(1).click()
        cy.get('[role="option"]').contains('Geetha').click()
  
        cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(2).click()
        cy.get('[role="option"]').contains('MRI ANGIGRAPHY BOTH LOWER LIMB').click()
  
        cy.get('button[aria-label=\'Add to Cart\']').click()
        cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.css-gpdodt').click()

        cy.get('div[role=\'status\']').invoke('text').then((strText) => {
          cy.log('Paragraph text:', strText);
          expect(strText).to.equal('Order added successfully!');
        });
  
      })
  })