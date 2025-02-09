const neatCSV = require('neat-CSV');

describe('Test_Add_Edit_Delete_Patient', () => {
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
              cy.get('h6:nth-child(1)').click()
              cy.get('.actions-left > .MuiButtonBase-root').click()
              cy.get('li:nth-child(5) a:nth-child(1) div:nth-child(2) p:nth-child(1)').click()
      });


    it('Add_Patient', () => {
      expect(true).to.equal(true)
      let DateOfBirth
      let date
      DateOfBirth = table[0]['DOB']
      DateOfBirth = DateOfBirth.split("-")
      date = DateOfBirth[0]
      date = +date
  
      const month = DateOfBirth[1]
      const year  = DateOfBirth[2]

      cy.get('button[aria-label=\'Add a new patient to the system\']').click()

      cy.get('#mui-component-select-salutation').click()
      cy.get('[role="option"]').contains(table[0]['Salutation']).click();
      cy.get('[name="firstName"]').type(table[0]['firstName'])
      cy.get('[name="lastName"]').type(table[0]['lastName'])
      cy.get('[name="email"]').type(table[0]['email'])
      cy.get('[name="mobileNumber"]').type(table[0]['mobileNumber'])
      cy.get('[name="phone"]').type(table[0]['phone'])
      
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
      cy.get('[role="option"]').contains(table[0]['gender']).click();
      cy.get('#mui-component-select-maritalStatus').click()
      cy.get('[role="option"]').contains(table[0]['maritalStatus']).click();
      
      // cy.get('[name="aadharNumber"]').type(table[0]['aadharNumber'])
      cy.get('[name="panNumber"]').type(table[0]['panNumber'])
      cy.get('#mui-component-select-heightUnit').click()
      cy.get('[role="option"]').contains(table[0]['heightUnit']).click()
      cy.get('[name="heightCm"]').type(table[0]['heightCM'])
      cy.get('#mui-component-select-weightUnit').click()
      cy.get('[role="option"]').contains(table[0]['WeightUnit']).click()
      cy.get('[name="weight"]').type(table[0]['Weight'])
      cy.get('#mui-component-select-bloodGroup').click()
      cy.get('[role="option"]').contains(table[0]['bloodGroup']).click()
      
      cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2)').click()
      cy.get('[name="homeAptNo"]').type(table[0]['homeAptNo'])
      cy.get('[name="homeLandmark"]').type(table[0]['homeLandmark'])
      cy.get('[name="homeCity"]').type(table[0]['homeCity'])
      cy.get('[name="homePincode"]').type(table[0]['homePincode'])
      cy.get('[name="homeMobileNo"]').type(table[0]['homeMobileNo'])
      cy.get('[name="emergencyContactName"]').type(table[0]['emergencyContactName'])
      cy.get('[name="emergencyContactRelationship"]').type(table[0]['emergencyContactRelationship'])
      cy.get('[name="emergencyContactPhone"]').type(table[0]['emergencyContactPhone'])
      cy.get('#mui-component-select-homeState').click()
      cy.get('[role="option"]').contains(table[0]['homeState']).click()
      cy.get('#mui-component-select-homeCountry').click()
      cy.get('[role="option"]').contains(table[0]['homeCountry']).click()
      cy.get('[name="billingAptNo"]').type(table[0]['billingAptNo'])
      cy.get('[name="billingLandmark"]').type(table[0]['billingLandmark'])
      cy.get('[name="billingCity"]').type(table[0]['billingCity'])
      cy.get('[name="billingPincode"]').type(table[0]['billingPincode'])
      cy.get('[name="billingMobileNo"]').type(table[0]['billingMobileNo'])
      cy.get('#mui-component-select-billingState').click()
      cy.get('[role="option"]').contains(table[0]['billingState']).click()
      cy.get('#mui-component-select-billingCountry').click()
      cy.get('[role="option"]').contains(table[0]['billingCountry']).click()
      cy.get('input[name="copyAddress"]').click()
      
      cy.get('button:nth-child(3)').click()
      cy.get('[name="primaryDiagnosis"]').type(table[0]['primaryDiagnosis'])
      cy.get('[name="secondaryDiagnosis"]').type(table[0]['secondaryDiagnosis'])
      cy.get('[name="previousMedicalHistory"]').type(table[0]['previousMedicalHistory'])
      cy.get('[name="allergies"]').type(table[0]['allergies'])
      cy.get('[name="currentMedications"]').type(table[0]['currentMedications'])
      cy.get('[name="immunizations"]').type(table[0]['immunizations'])
      cy.get('[name="wardRoomNumber"]').type(table[0]['wardRoomNumber'])
      cy.get('[name="attendingPhysician"]').type(table[0]['attendingPhysician'])
      cy.get('[name="consultingPhysicians"]').type(table[0]['consultingPhysicians'])
      cy.get('[name="nextOfKin"]').type(table[0]['nextOfKin'])
      cy.get('[name="consentForms"]').type(table[0]['consentForms'])
      
      cy.get('button:nth-child(4)').click()
      cy.get('[name="insuranceProvider"]').type(table[0]['insuranceProvider'])
      cy.get('[name="insuranceType"]').type(table[0]['insuranceType'])
      cy.get('[name="policyNumber"]').type(table[0]['policyNumber'])
      cy.get('[name="insurancePolicyHolder"]').type(table[0]['insurancePolicyHolder'])
      cy.get('[name="insuranceCoverageDetails"]').type(table[0]['insuranceCoverageDetails'])
      cy.get('[name="occupation"]').type(table[0]['occupation'])
      cy.get('[name="companyName"]').type(table[0]['companyName'])
      cy.get('[name="employerAddress"]').type(table[0]['employerAddress'])
      cy.get('[name="accountName"]').type(table[0]['accountName'])
      cy.get('[name="routingCode"]').type(table[0]['routingCode'])
      cy.get('[name="accountNumber"]').type(table[0]['accountNumber'])
      cy.get('#mui-component-select-bankName').click()
      cy.get('[role="option"]').contains(table[0]['bankName']).click()
      cy.get('#mui-component-select-bankAccountType').click()
      cy.get('[role="option"]').contains(table[0]['bankAccountType']).click()
      
      cy.get('button:nth-child(5)').click()
      cy.get('#mui-component-select-documents').click()
      cy.get('[role="option"]').contains(table[0]['SelectProof']).click()
      cy.get('input[type = "file"]').attachFile('sap.png')
      cy.get('div[class=\'MuiBox-root css-hvj582\'] button:nth-child(2)').click()
      cy.get('.MuiDialogActions-root > :nth-child(2)').click()
      cy.get('div[role=\'status\']').invoke('text').then((strText1) => {
        cy.log('Paragraph text:', strText1);
        expect(strText1).to.equal('Files uploaded successfully!');
      });
      cy.get('div[role=\'status\']').should('not.exist');
      cy.get('button[aria-label=\'Submit\']').click()
 
      cy.get('div[role=\'status\']').invoke('text').then((strText2) => {
        cy.log('Paragraph text:', strText2);
        expect(strText2).to.equal('Patient added successfully!');
      });
      cy.get('div[role=\'status\']').should('not.exist');
    })
    
    it('Edit_Patient', () => {
      cy.get('[name="searchQuery"]').type("8095938000")
      cy.get('button[aria-label=\'Apply Filter to list patients\']').click()
      cy.wait(2000);
      cy.get('[name="searchQuery"]').clear()
      cy.get('[name="searchQuery"]').type(table[0]['firstName'])
      cy.get('button[aria-label=\'Apply Filter to list patients\']').click()
      cy.get('svg[data-testid=\'MoreVertIcon\']').click()
      cy.get('div[role=\'tooltip\'] li:nth-child(2)').click()
      cy.get('div[role=\'presentation\'] button:nth-child(2)').eq(1).click()
      cy.get('[name="lastName"]').clear();
      cy.get('[name="lastName"]').type("Varthan")
      cy.get('button[aria-label=\'Submit\']').click()
      cy.get('div[role=\'status\']').invoke('text').then((strText3) => {
        cy.log('Paragraph text:', strText3);
        expect(strText3).to.equal('Patient updated successfully!');
      });
      cy.get('div[role=\'status\']').should('not.exist');
    })

    it('Delete_Patient', () => {
      cy.get('[name="searchQuery"]').type("8095938000")
      cy.get('button[aria-label=\'Apply Filter to list patients\']').click()
      cy.wait(2000);
      cy.get('[name="searchQuery"]').clear()
      cy.get('[name="searchQuery"]').type(table[0]['firstName'])
      cy.get('button[aria-label=\'Apply Filter to list patients\']').click()
      cy.get('svg[data-testid=\'MoreVertIcon\']').click()
      cy.get('div[role=\'tooltip\'] li:nth-child(3)').click()
      cy.get('div[role=\'presentation\'] button:nth-child(2)').eq(1).click()
      cy.get('div[role=\'status\']').invoke('text').then((strText4) => {
        cy.log('Paragraph text:', strText4);
        expect(strText4).to.equal('Patient deleted successfully');
      });
      cy.get('div[role=\'status\']').should('not.exist');
    })
  })