
const neatCSV = require('neat-CSV');
describe('Order', () => {      
  let table;
  let counter
  let rowCount

    beforeEach(()=>{
      cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/Order_Details.csv")
              .then(neatCSV)
              .then(data=> {
                  table = data ;
                  rowCount = table.length
                 })
        .then(console.table)
        cy.visit("http://healai-billing.s3-website-us-east-1.amazonaws.com/")
        cy.get('[name="email"]').clear()
        cy.get('[name="email"]').type("superadmin")
        cy.get('[name="password"]').clear()
        cy.get('[name="password"]').type("superadmin")
        cy.get('button[aria-label=\'Login\']').click()
        cy.get('h6:nth-child(1)').should('be.visible')
        cy.get('h6:nth-child(1)').eq(1).click()

    });

    it.only('To Create Order Refered by Doctor',  ()=> {
      for (let i = 0; i < rowCount; i++ )
        {
          cy.log(table[i]['Refered_BY'])
            if (table[i]['Refered_BY'] == 'Doctor')
            {
              cy.get('.actions-left > .MuiButtonBase-root',{timeout: 10000}).should('be.visible')
              cy.get('.actions-left > .MuiButtonBase-root').click()
              cy.get('li:nth-child(2) a:nth-child(1) div:nth-child(2) p:nth-child(1)').eq(0).click()
              cy.get('button[aria-label=\'Add a new order to the system\']').click({force: true})

              cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(0).click()
              cy.get('[role="option"]').contains(table[i]['Patient_Name']).click()

              cy.get('input[name=\'showDoctorSelect\']').click()
              cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(1).click()
              cy.get('[role="option"]').contains(table[i]['Doctor_Name']).click()

              cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(2).click()
              cy.get('[role="option"]').contains(table[i]['Product']).click()

              cy.get('.css-2b3try').each(($el, index, $list) => {
                  cy.wrap($el).invoke('text').then((text) => {
                  if (text == table[i]['Product_Detail'])
                  {
                    counter = index
                    cy.log(counter)
                    cy.log(`Shared data: ${counter}`);
                    cy.get('button[aria-label=\'Add to Cart\']').eq(counter).click()
                  }
                })
              })
              cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.css-gpdodt').click({force: true})

   
              cy.get('div[role=\'status\']',{timeout: 10000}).should('be.visible')
              cy.get('div[role=\'status\']').invoke('text').then((strText) => {
              cy.log('Paragraph text:', strText);
              expect(strText).to.equal('Order added successfully!');
              });
              cy.get('div[role=\'status\']').should('not.exist');


              cy.pause()

              cy.get('svg[data-testid=\'MoreVertIcon\']',{timeout: 20000}).should('be.visible')
              cy.get('svg[data-testid=\'MoreVertIcon\']').eq(0).click({force: true})
              cy.get('div[role=\'tooltip\'] li:nth-child(4)').click()
              cy.get('div[role=\'presentation\'] button:nth-child(2)').eq(1).click()
              cy.get('span[class=\'MuiButton-icon MuiButton-startIcon MuiButton-iconSizeSmall css-1ti2r9g\']').click() 

              cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(2).click()
              cy.get('[role="option"]').contains(table[i]['Product']).click()

              cy.get('.css-2b3try').each(($el, index, $list) => {
                cy.wrap($el).invoke('text').then((text) => {
                if (text == table[i]['Product_Update_Detail'])
                {
                  counter = index
                  cy.log(counter)
                  cy.log(`Shared data: ${counter}`);
                  cy.get('button[aria-label=\'Add to Cart\']').eq(counter).click()
                }
               })
              })
              cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.css-gpdodt').click()

              cy.get('div[role=\'status\']',{timeout: 10000}).should('be.visible')
              cy.get('div[role=\'status\']').invoke('text').then((strText) => {
                cy.log('Paragraph text:', strText);
                expect(strText).to.equal('Order updated successfully!');
              });
              cy.get('div[role=\'status\']').should('not.exist');

              cy.get('svg[data-testid=\'MoreVertIcon\']').should('be.visible')
              cy.get('svg[data-testid=\'MoreVertIcon\']').eq(0).click({force: true})
              cy.get('div[role=\'tooltip\'] li:nth-child(3)').click()
              cy.get('div[role=\'presentation\'] button:nth-child(2)').eq(1).click()

              cy.get('div[role=\'status\']').invoke('text').then((strText) => {
                cy.log('Paragraph text:', strText);
                expect(strText).to.equal('Order deleted successfully');
              });
            }
          }
    })


    it('To Create Order Refered by Sales', () => {
      
      for (let i = 0; i < rowCount; i++ )
        {
          cy.log(table[i]['Refered_BY'])
          if (table[i]['Refered_BY'] == 'Sales'){
              cy.get('.actions-left > .MuiButtonBase-root',{timeout: 10000}).should('be.visible')
              cy.get('.actions-left > .MuiButtonBase-root').click()
              cy.get('li:nth-child(2) a:nth-child(1) div:nth-child(2) p:nth-child(1)').eq(0).click()
              cy.get('button[aria-label=\'Add a new order to the system\']').click({force: true})

              cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(0).click()
              cy.get('[role="option"]').contains(table[i]['Patient_Name']).click()

              cy.get('input[name=\'showSalesPersonSelect\']').click()
              cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(1).click()
              cy.get('[role="option"]').contains('Geetha').click()

              cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(2).click()
              cy.get('[role="option"]').contains(table[i]['Product']).click()

              cy.get('.css-2b3try').each(($el, index, $list) => {
                  cy.wrap($el).invoke('text').then((text) => {
                  if (text == table[i]['Product_Detail'])
                  {
                    counter = index
                    cy.log(counter)
                    cy.log(`Shared data: ${counter}`);
                    cy.get('button[aria-label=\'Add to Cart\']').eq(counter).click()
                  }
                })
              })
              cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.css-gpdodt').click()
              cy.get('svg[data-testid=\'MoreVertIcon\']').should('be.visible')

              cy.get('div[role=\'status\']').invoke('text').then((strText) => {
              cy.log('Paragraph text:', strText);
              expect(strText).to.equal('Order added successfully!');
              });
              cy.get('div[role=\'status\']').should('not.exist');

              cy.get('svg[data-testid=\'MoreVertIcon\']').eq(0).click({force: true})
              cy.get('div[role=\'tooltip\'] li:nth-child(4)').click()
              cy.get('div[role=\'presentation\'] button:nth-child(2)').eq(1).click()
              cy.get('span[class=\'MuiButton-icon MuiButton-startIcon MuiButton-iconSizeSmall css-1ti2r9g\']').click() 

              cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(2).click()
              cy.get('[role="option"]').contains(table[i]['Product']).click()

              cy.get('.css-2b3try').each(($el, index, $list) => {
                cy.wrap($el).invoke('text').then((text) => {
                if (text == table[i]['Product_Update_Detail'])
                {
                  counter = index
                  cy.log(counter)
                  cy.log(`Shared data: ${counter}`);
                  cy.get('button[aria-label=\'Add to Cart\']').eq(counter).click()
                }
               })
              })
              cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.css-gpdodt').click()

              cy.get('div[role=\'status\']').invoke('text').then((strText) => {
                cy.log('Paragraph text:', strText);
                expect(strText).to.equal('Order updated successfully!');
              });
              cy.get('div[role=\'status\']').should('not.exist');

              cy.get('svg[data-testid=\'MoreVertIcon\']').should('be.visible')
              cy.get('svg[data-testid=\'MoreVertIcon\']').eq(0).click({force: true})
              cy.get('div[role=\'tooltip\'] li:nth-child(3)').click()
              cy.get('div[role=\'presentation\'] button:nth-child(2)').eq(1).click()

              cy.get('div[role=\'status\']').invoke('text').then((strText) => {
                cy.log('Paragraph text:', strText);
                expect(strText).to.equal('Order deleted successfully');
              });
          }
        }
    })

    it('Negative Test For Order',  ()=> {
      let i = 0
      cy.get('.actions-left > .MuiButtonBase-root',{timeout: 10000}).should('be.visible')
      cy.get('.actions-left > .MuiButtonBase-root').click()
      cy.get('li:nth-child(2) a:nth-child(1) div:nth-child(2) p:nth-child(1)').eq(0).click()
      cy.get('button[aria-label=\'Add a new order to the system\']').click({force: true})

      cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(0).click()
      cy.get('[role="option"]').contains(table[i]['Patient_Name']).click()

      cy.get('input[name=\'showDoctorSelect\']').click()
      cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(1).click()
      cy.get('[role="option"]').contains(table[i]['Doctor_Name']).click()

      cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(2).click()
      cy.get('[role="option"]').contains(table[i]['Product']).click()

      cy.get('.css-2b3try').each(($el, index, $list) => {
          cy.wrap($el).invoke('text').then((text) => {
          if (text == table[i]['Product_Detail'])
          {
            counter = index
            cy.log(counter)
            cy.log(`Shared data: ${counter}`);
            // cy.get('button[aria-label=\'Add to Cart\']').eq(counter).click()
          }
        })
      })
      cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.css-gpdodt').click()
      cy.get('svg[data-testid=\'MoreVertIcon\']').should('be.visible')

      cy.get('div[role=\'status\']').invoke('text').then((strText) => {
      cy.log('Paragraph text:', strText);
      expect(strText).to.equal('Failed to add doctor!');
      });
      cy.get('div[role=\'status\']').should('not.exist');


    })
  })