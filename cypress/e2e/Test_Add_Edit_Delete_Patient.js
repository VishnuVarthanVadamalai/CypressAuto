const neatCSV = require('neat-CSV');

describe('Test_Add_Edit_Delete_Patient', () => {
      let table;
      let rowCount
  
      beforeEach(()=>{
          cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/Patient_Details.csv")
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
              cy.get('h6:nth-child(1)').eq(0).click()
              cy.get('.actions-left > .MuiButtonBase-root').click()
              cy.get('li:nth-child(5) a:nth-child(1) div:nth-child(2) p:nth-child(1)').click()
      });

    it('Add_Edit_Delete_Patient', () => {
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

      cy.get('button[aria-label=\'Add a new patient to the system\']').click()

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
      cy.get('#mui-component-select-heightUnit').click()
      cy.get('[role="option"]').contains(table[i]['heightUnit']).click()
      cy.get('[name="heightCm"]').type(table[i]['heightCM'])
      cy.get('#mui-component-select-weightUnit').click()
      cy.get('[role="option"]').contains(table[i]['WeightUnit']).click()
      cy.get('[name="weight"]').type(table[i]['Weight'])
      cy.get('#mui-component-select-bloodGroup').click()
      cy.get('[role="option"]').contains(table[i]['bloodGroup']).click()
      
      cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2)').click()
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
      cy.get('[name="billingAptNo"]').type(table[i]['billingAptNo'])
      cy.get('[name="billingLandmark"]').type(table[i]['billingLandmark'])
      cy.get('[name="billingCity"]').type(table[i]['billingCity'])
      cy.get('[name="billingPincode"]').type(table[i]['billingPincode'])
      cy.get('[name="billingMobileNo"]').type(table[i]['billingMobileNo'])
      cy.get('#mui-component-select-billingState').click()
      cy.get('[role="option"]').contains(table[i]['billingState']).click()
      cy.get('#mui-component-select-billingCountry').click()
      cy.get('[role="option"]').contains(table[i]['billingCountry']).click()
      cy.get('input[name="copyAddress"]').click()
      
      cy.get('button:nth-child(3)').click()
      cy.get('[name="primaryDiagnosis"]').type(table[i]['primaryDiagnosis'])
      cy.get('[name="secondaryDiagnosis"]').type(table[i]['secondaryDiagnosis'])
      cy.get('[name="previousMedicalHistory"]').type(table[i]['previousMedicalHistory'])
      cy.get('[name="allergies"]').type(table[i]['allergies'])
      cy.get('[name="currentMedications"]').type(table[i]['currentMedications'])
      cy.get('[name="immunizations"]').type(table[i]['immunizations'])
      cy.get('[name="wardRoomNumber"]').type(table[i]['wardRoomNumber'])
      cy.get('[name="attendingPhysician"]').type(table[i]['attendingPhysician'])
      cy.get('[name="consultingPhysicians"]').type(table[i]['consultingPhysicians'])
      cy.get('[name="nextOfKin"]').type(table[i]['nextOfKin'])
      cy.get('[name="consentForms"]').type(table[i]['consentForms'])
      
      cy.get('button:nth-child(4)').click()
      cy.get('[name="insuranceProvider"]').type(table[i]['insuranceProvider'])
      cy.get('[name="insuranceType"]').type(table[i]['insuranceType'])
      cy.get('[name="policyNumber"]').type(table[i]['policyNumber'])
      cy.get('[name="insurancePolicyHolder"]').type(table[i]['insurancePolicyHolder'])
      cy.get('[name="insuranceCoverageDetails"]').type(table[i]['insuranceCoverageDetails'])
      cy.get('[name="occupation"]').type(table[i]['occupation'])
      cy.get('[name="companyName"]').type(table[i]['companyName'])
      cy.get('[name="employerAddress"]').type(table[i]['employerAddress'])
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

//Code to Edit the Patient

      cy.get('[name="searchQuery"]').type(table[i]['mobileNumber'])
      cy.get('button[aria-label=\'Apply Filter to list patients\']').click()
      cy.wait(2000);
      cy.get('[name="searchQuery"]').clear()
      cy.get('[name="searchQuery"]').type(table[i]['firstName'])
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

//Code to delete the Patient
      cy.get('[name="searchQuery"]').type(table[i]['mobileNumber'])
      cy.get('button[aria-label=\'Apply Filter to list patients\']').click()
      cy.wait(2000);
      cy.get('[name="searchQuery"]').clear()
      cy.get('[name="searchQuery"]').type(table[i]['firstName'])
      cy.get('button[aria-label=\'Apply Filter to list patients\']').click()
      cy.get('svg[data-testid=\'MoreVertIcon\']').click()
      cy.get('div[role=\'tooltip\'] li:nth-child(3)').click()
      cy.get('div[role=\'presentation\'] button:nth-child(2)').eq(1).click()
      cy.get('div[role=\'status\']').invoke('text').then((strText4) => {
        cy.log('Paragraph text:', strText4);
        expect(strText4).to.equal('Patient deleted successfully');
      });
      cy.get('div[role=\'status\']').should('not.exist');
     }
    })
  })