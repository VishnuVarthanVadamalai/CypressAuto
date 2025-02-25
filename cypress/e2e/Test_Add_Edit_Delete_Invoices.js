const neatCSV = require('neat-CSV');

describe('Test_Add_Edit_Delete_Invoices', () => {
  let table
  let rowCount

    before(()=>{

              cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/Invoice_Details.csv")
                  .then(neatCSV)
                  .then(data=> {
                      table = data ;
                      rowCount = table.length
                      cy.log(rowCount)
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
          cy.get('.actions-left > .MuiButtonBase-root').should('be.visible')
          cy.get('.actions-left > .MuiButtonBase-root').click()
          cy.get('.css-a7jay2').contains("Invoices").click()
    });

    it('Add_Edit_Delete_Invoices', () => {
      for (let i = 0; i < rowCount; i++ )
      {
      
        cy.log(rowCount)
        let DateOfBirth
        let date
        DateOfBirth = table[i]['InvoiceDate']
        DateOfBirth = DateOfBirth.split("/")
        date = DateOfBirth[0]
        date = +date
    
        const month = DateOfBirth[1]
        const year  = DateOfBirth[2]

        cy.get('button[aria-label=\'Add a new Invoice to the system\']').click()
        cy.get('.css-n29blg').eq(0).click()
        cy.get('[role="option"]').contains(table[i]['PatientName']).click()
        cy.get('.css-n29blg').eq(1).click()
        cy.get('[role="option"]').contains(table[i]['DoctorName']).click()
        
        cy.get('[aria-labelledby="place-label mui-component-select-place"]').click()
        // cy.get('.css-vme924').eq(0).click()
        cy.get('[role="option"]').contains(table[i]['Place']).click()
        // 
        cy.get('[data-testid="CalendarIcon"]').eq(0).click()
        cy.get('.css-1v994a0').eq(0).click()

        cy.contains('button',year).click()
        
        const date1 = new Date();
        const currentMonthIndex = date1.getMonth();
        const monthNumber = currentMonthIndex + 1;
        if(monthNumber == month)
        {
            cy.log("do nothing")
        }
        if(monthNumber > month)
        {
            const diff = monthNumber - month
            for (let i = 0; i < diff; i++)
                {
                    cy.get('button[title=\'Previous month\']').click()
        
                }
        
        } else
        {
            const diff = month -  monthNumber
            for (let i = 0; i < diff; i++)
            {
                cy.get('button[title=\'Next month\']').click()
        
            }
        }
        cy.contains('button',date).click()

        cy.get('.css-n29blg').eq(3).click()
        cy.get('[role="option"]').contains(table[i]['SalesPerson']).click()

        cy.get('.css-n29blg').eq(4).click()
        cy.get('[role="option"]').contains(table[i]['Product']).click()

        cy.get('input[name="amount"]').invoke('attr','value').then(text => {
          const someText = text;
          cy.log(someText);
        });

        cy.get('input[name="amount"]').invoke('attr','value').as('amount')
        cy.get('[aria-label="Add product"]').click()

        cy.get('.css-4t8ujy').invoke('text').then((strText) => {
          cy.log('Paragraph text:', strText);
          expect(strText).to.contains(table[i]['Product']);
        });
        cy.get('input[name="adjustment"]').clear()
        cy.get('input[name="adjustment"]').type(table[i]['Adjustment'])
        cy.get('input[name="discount"]').type(table[i]['Discount'])

        cy.get('.ProseMirror').eq(3).invoke('text').then((ProductAmount) => {
          ProductAmount = +ProductAmount
          ProductAmount = parseFloat(ProductAmount);
          ProductAmount = Math.trunc(ProductAmount)
          table[i]['Discount'] = +table[i]['Discount']
          table[i]['Adjustment'] = +table[i]['Adjustment']
          let netamount = ProductAmount + table[i]['Adjustment'] - table[i]['Discount']
          cy.get('.ProseMirror').eq(11).invoke('text').then((FinalAmount) => {expect(Math.trunc(FinalAmount)).to.equal(netamount)})
          cy.get('[name="paidAmount"]').type(netamount-100)

        });
        cy.get('[aria-labelledby="paymentType-label mui-component-select-paymentType"]').click()
        cy.get('[role="option"]').contains(table[i]['PaymentMethod']).click()
        // cy.get('[name="paidAmount"]').type(netamount)
        cy.get('[aria-labelledby="paymentStatus-label mui-component-select-paymentStatus"]').click()
        cy.get('[role="option"]').contains(table[i]['PaymentStatus']).click()
        let now = new Date();
        cy.log(now)
        let dateTimeString = now.toLocaleString();
        cy.get('[name="paymentReference"]').clear()
        cy.get('[name="paymentReference"]').type(dateTimeString)
        cy.get('button[aria-label=\'Add Payment\']').click()
        cy.get('button[aria-label=\'Submit\']').click()

        cy.get('div[role=\'status\']').invoke('text').then((strText2) => {
          cy.log('Paragraph text:', strText2);
          expect(strText2).to.equal('Invoice added successfully!');
        });
        cy.get('div[role=\'status\']').should('not.exist');
        cy.get('svg[data-testid=\'MoreVertIcon\']').eq(0).click()
        cy.get('div[role=\'tooltip\']').contains('Edit').click()
        cy.get('div[role=\'presentation\']').contains('Confirm').click()

        cy.get('[aria-labelledby="paymentType-label mui-component-select-paymentType"]').click()
        cy.get('[role="option"]').contains(table[i]['PaymentMethod']).click()
        cy.get('[aria-labelledby="paymentStatus-label mui-component-select-paymentStatus"]').click()
        cy.get('[role="option"]').contains(table[i]['PaymentStatus']).click()
        cy.get('[name="paymentReference"]').clear()
        cy.pause()
        let now1 = new Date();
        cy.log(now1)
        let dateTimeString1 = now1.toLocaleString();
        cy.get('[name="paymentReference"]').type(dateTimeString1)

        cy.get('.ProseMirror').eq(11).should('exist')
        cy.get('.ProseMirror').eq(11).invoke('text').then((BalanceAmount) => {
          cy.log(BalanceAmount)
          cy.get('[name="paidAmount"]').should('be.visible')
          cy.get('[name="paidAmount"]').click()
          cy.get('[name="paidAmount"]').type(BalanceAmount)
        });

        cy.get('button[aria-label=\'Add Payment\']').click()

        cy.get('button[aria-label=\'Submit\']').click()
        cy.get('div[role=\'status\']').invoke('text').then((strText3) => {
          cy.log('Paragraph text:', strText3);
          expect(strText3).to.equal('Invoice updated successfully!');
        });
        cy.get('div[role=\'status\']').should('not.exist');

        cy.get('svg[data-testid=\'MoreVertIcon\']').eq(0).click()
        cy.get('div[role=\'tooltip\']').contains('Delete').click()
        cy.get('div[role=\'presentation\']').contains('Confirm').click()
        cy.get('div[role=\'status\']').invoke('text').then((strText4) => {
          cy.log('Paragraph text:', strText4);
          expect(strText4).to.equal('Invoice deleted successfully');
        });
        cy.get('div[role=\'status\']').should('not.exist');
    
      }
    })
  })