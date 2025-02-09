const neatCSV = require('neat-CSV');

describe('Doctor', () => {
    let table;

    before(()=>{
        cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/ad.csv")
            .then(neatCSV)
            .then(data=> {
                table = data ;
        })
            .then(console.table)
    });

    it('To Add Doctor',  () => {

        let DateOfBirth
        let date
        DateOfBirth = table[0]['DOB']
        DateOfBirth = DateOfBirth.split("-")
        date = DateOfBirth[0]
        date = +date
    
        const month = DateOfBirth[1]
        const year  = DateOfBirth[2]
  
        cy.visit("http://healai-billing.s3-website-us-east-1.amazonaws.com/")
        cy.get('[name="email"]').clear()
        cy.get('[name="email"]').type("superadmin")
        cy.get('[name="password"]').clear()
        cy.get('[name="password"]').type("superadmin")
        cy.get('button[aria-label=\'Login\']').click()
  
        cy.get('h6:nth-child(1)').click()
        cy.get('.actions-left > .MuiButtonBase-root').click()
  
        cy.get('li:nth-child(6) a:nth-child(1) div:nth-child(2) p:nth-child(1)').click()
        cy.get('button[aria-label=\'Add a new doctor to the system\']').click({force: true})
        cy.get('#mui-component-select-salutation').click()
        cy.get('[role="option"]').contains('Mrs.').click()
        cy.get('[name="firstName"]').type("Rekha")
        cy.get('[name="lastName"]').type("Kumar")
        cy.get('[name="email"]').type("rekhan@gmail.com")
        cy.get('[name="mobileNumber"]').type("8095938000")
        cy.get('[name="phone"]').type("8095938001")
  
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
  
        // cy.get('[name="age"]').type("44")
        cy.get('#mui-component-select-maritalStatus').click()
        cy.get('[role="option"]').contains('Widowed').click()
        cy.get('#mui-component-select-gender').click()
        cy.get('[role="option"]').contains('Female').click()
        cy.get('[name="aadharNumber"]').type("444433332220")
        cy.get('[name="panNumber"]').type("AIPPV4620C")
  
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2)').click()
        cy.get('[name="homeAptNo"]').type("7-2")
        cy.get('[name="homeLandmark"]').type("Govt Girls High School")
        cy.get('[name="homeCity"]').type("Trichy")
        cy.get('[name="homePincode"]').type("621005")
        cy.get('[name="homeMobileNo"]').type("8095938001")
        cy.get('[name="emergencyContactName"]').type("9916647654")
        cy.get('[name="emergencyContactRelationship"]').type("Friend")
        cy.get('[name="emergencyContactPhone"]').type("04312560711")
  
        cy.get('#mui-component-select-homeState').click()
        cy.get('[role="option"]').contains('Kerala').click()
        cy.get('#mui-component-select-homeCountry').click()
        cy.get('[role="option"]').contains('India').click()
  
        cy.get('button:nth-child(3)').click()
        cy.get('#mui-component-select-qualifications').click()
        cy.get('[role="option"]').contains('Diploma in Medical Specialization').click()
        cy.get('[name="specialization"]').type("abc")
        cy.get('[name="yearsOfExperience"]').type("12")
        cy.get('[name="registrationNumber"]').type("R125")
        cy.get('#mui-component-select-hospitalDepartment').click()
        cy.get('[role="option"]').contains('Hematology').click()
        cy.get('[name="consultationFee"]').type("750")
  
        cy.get('button:nth-child(4)').click()
        cy.get('[name="accountName"]').type("Consented")
        cy.get('[name="routingCode"]').type("IFSC0000573")
        cy.get('[name="accountNumber"]').type("055801529529")
        cy.get('#mui-component-select-bankName').click()
        cy.get('[role="option"]').contains('CITI BANK').click()
        cy.get('#mui-component-select-bankAccountType').click()
        cy.get('[role="option"]').contains('Savings').click()
      
        cy.get('button:nth-child(5)').click()
        cy.get('#mui-component-select-documents').click()
        cy.get('[role="option"]').contains('Pan Card').click()
        cy.get('input[type = "file"]').attachFile('sap.png')
        cy.get('div[class=\'MuiBox-root css-1w2p18d\'] button:nth-child(2)').click()
        cy.get('.MuiDialogActions-root > :nth-child(2)').click()
        cy.get('div[role=\'status\']').invoke('text').then((strText) => {
            cy.log('Paragraph text:', strText);
          });
    })

    it('Table Play Around',  () => {
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

        cy.get('.MuiTablePagination-displayedRows').click({force: true})
        cy.get('.MuiTablePagination-displayedRows').invoke('text').then((strText) => {
            cy.log('Paragraph text:', strText);
          });


    })
  })