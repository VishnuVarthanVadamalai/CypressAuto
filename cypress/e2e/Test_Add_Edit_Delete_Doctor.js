const neatCSV = require('neat-CSV');

describe('Test_Add_Edit_Delete_Doctor', () => {
  let table
  let rowCount

    before(()=>{
        cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/Doctor_Details.csv")
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
     cy.get('.css-1j71eye').eq(0).click()
     cy.get('.css-a7jay2').each(($el, index, $list) => {
       cy.wrap($el).invoke('text').then((text) => {
       if (text == ['Doctors'])
       {
         cy.get($el).click()
       }
     })
   })
    
    });

    it('Add_Doctor', () => {
        for (let i = 0; i < rowCount; i++ )
            {
      
        cy.log(rowCount)
        let DateOfBirth
        let date
        DateOfBirth = table[i]['DOB']
        DateOfBirth = DateOfBirth.split("/")
        date = DateOfBirth[0]
        date = +date
    
        const month = DateOfBirth[1]
        const year  = DateOfBirth[2]

        cy.get('button[aria-label=\'Add a new doctor to the system\']').click()

        cy.get('#mui-component-select-salutation').click()
        cy.get('[role="option"]').contains(table[i]['Salutation']).click();
        cy.get('[name="firstName"]').type(table[i]['firstName'])
        cy.get('[name="lastName"]').type(table[i]['lastName'])
        cy.get('[name="email"]').type(table[i]['email'])
        cy.get('[name="mobileNumber"]').type(table[i]['mobileNumber'])
        cy.get('[name="phone"]').type(table[i]['phone'])
        
        cy.get('.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-18k2iyp').click()
        cy.get('.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiPickersCalendarHeader-switchViewIcon.css-r38j8b').click()
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
        
        cy.get('#mui-component-select-gender').click()
        cy.get('[role="option"]').contains(table[i]['gender']).click();
        cy.get('#mui-component-select-maritalStatus').click()
        cy.get('[role="option"]').contains(table[i]['maritalStatus']).click();
        
        // cy.get('[name="aadharNumber"]').type(table[i]['aadharNumber'])
        cy.get('[name="panNumber"]').type(table[i]['panNumber'])

      cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2)').click()
      cy.get('[name="homeAptNo"]').type(table[i]['homeAptNo'])
      cy.get('[name="homeLandmark"]').type(table[i]['homeLandmark'])
      cy.get('[name="homeCity"]').type(table[i]['homeCity'])
      cy.get('[name="homePincode"]').type(table[i]['homePincode'])
      cy.get('[name="homeMobileNo"]').type(table[i]['homeMobileNo'])
      cy.get('[name="emergencyContactName"]').type(table[i]['emergencyContactName'])
      cy.get('[name="emergencyContactRelationship"]').type(table[i]['emergencyContactRelationship'])
      cy.get('[name="emergencyContactPhone"]').type(table[i]['emergencyContactPhone'])
      cy.get('#mui-component-select-homeState').click()
      cy.get('[role="option"]').contains(table[i]['homeState']).click()
      cy.get('#mui-component-select-homeCountry').click()
      cy.get('[role="option"]').contains(table[i]['homeCountry']).click()

      cy.get('button:nth-child(3)').click()
      cy.get('#mui-component-select-qualifications').click()
      cy.get('[role="option"]').contains(table[i]['qualifications']).click()
      cy.get('[name="specialization"]').type(table[i]['specialization'])
      cy.get('[name="yearsOfExperience"]').type(table[i]['yearsOfExperience'])
      cy.get('[name="registrationNumber"]').type(table[i]['registrationNumber'])
      cy.get('#mui-component-select-hospitalDepartment').click()
      cy.get('[role="option"]').contains(table[i]['hospitalDepartment']).click()
      cy.get('[name="consultationFee"]').type(table[i]['consultationFee'])

      cy.get('button:nth-child(4)').click()
      cy.get('[name="accountName"]').type(table[i]['accountName'])
      cy.get('[name="routingCode"]').type(table[i]['routingCode'])
      cy.get('[name="accountNumber"]').type(table[i]['accountNumber'])
      cy.get('#mui-component-select-bankName').click()
      cy.get('[role="option"]').contains(table[i]['bankName']).click()
      cy.get('#mui-component-select-bankAccountType').click()
      cy.get('[role="option"]').contains(table[i]['bankAccountType']).click()
    
      cy.get('button:nth-child(5)').click()
      cy.get('#mui-component-select-documents').click()
      cy.get('[role="option"]').contains(table[i]['SelectProof']).click()
      cy.get('input[type = "file"]').attachFile('sap.png')
      cy.get('div[class=\'MuiBox-root css-1w2p18d\'] button:nth-child(2)').click()
      cy.get('.MuiDialogActions-root > :nth-child(2)').click()
      cy.get('div[role=\'status\']').invoke('text').then((strText) => {
        cy.log('Paragraph text:', strText);
        expect(strText).to.equal('Files uploaded successfully!');
      });
      cy.get('button[aria-label=\'Submit\']').click()
    }
    })
  })