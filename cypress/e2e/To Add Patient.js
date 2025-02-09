const neatCSV = require('neat-CSV');
import 'cypress-file-upload'

describe('Patient', () => {
      let table;
  
      before(()=>{
          cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/ad.csv")
              .then(neatCSV)
              .then(data=> {
                  table = data ;
          })
              .then(console.table)
      });


    it('To Add Patient', () => {
      expect(true).to.equal(true)
      cy.log("vishnu varthan vada")
      cy.visit("http://healai-billing.s3-website-us-east-1.amazonaws.com/")
      cy.get('button[aria-label=Login]').click()
      cy.get('.actions-left > .MuiButtonBase-root').click()
      cy.get('li:nth-child(5) a:nth-child(1) div:nth-child(2) p:nth-child(1)').click()
      cy.get('button[aria-label=\'Add a new patient to the system\']').click()
      cy.get('#mui-component-select-salutation').click()
      cy.get('[role="option"]').contains('Mrs.').click();

      cy.get('[name="firstName"]').type("Rekha")
      cy.get('[name="lastName"]').type("Kumar")
      cy.get('[name="email"]').type("rekhan@gmail.com")
      cy.get('[name="mobileNumber"]').type("8095938000")
      cy.get('[name="phone"]').type("8095938001")
      cy.get('[name="age"]').type("44")

      cy.get('#mui-component-select-gender').click()
      cy.get('[role="option"]').contains('Other').click();

      cy.get('#mui-component-select-maritalStatus').click()
      cy.get('[role="option"]').contains('Widowed').click();

      cy.get('[name="aadharNumber"]').type("444433332220")
      cy.get('[name="panNumber"]').type("AIPPV4620C")

      cy.get('#mui-component-select-heightUnit').click()
      cy.get('[role="option"]').contains('CM').click()
      cy.get('[name="heightCm"]').type("178")

      cy.get('#mui-component-select-weightUnit').click()
      cy.get('[role="option"]').contains('kg').click()
      cy.get('[name="weight"]').type("17")

      cy.get('#mui-component-select-bloodGroup').click()
      cy.get('[role="option"]').contains('O+').click()

      cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2)').click()
      cy.get('[name="homeAptNo"]').type("7-2")
      cy.get('[name="homeLandmark"]').type("Govt Girls High School")
      cy.get('[name="homeCity"]').type("Trichy")
      cy.get('[name="homePincode"]').type("621005")
      cy.get('[name="homeMobileNo"]').type("8095938001")
      cy.get('[name="emergencyContactName"]').type("9916647654")
      cy.get('[name="emergencyContactRelationship"]').type("Friend")
      cy.get('[name="emergencyContactPhone"]').type("04312560711")

      // ***Pending***To include code to enter data of birth
      // cy.get('input[type="file"]').attachFile('C:\West\Pilot_Image\PilotbackgroundImage.jpg')
      // ***Pending***To include code to enter data of birth

      cy.get('#mui-component-select-homeState').click()
      cy.get('[role="option"]').contains('Kerala').click()

      cy.get('#mui-component-select-homeCountry').click()
      cy.get('[role="option"]').contains('India').click()

      cy.get('[name="billingCity"]').type("Bengaluru")
      cy.get('[name="billingPincode"]').type("562125")
      cy.get('[name="billingMobileNo"]').type("9999900000")

      cy.get('#mui-component-select-billingState').click()
      cy.get('[role="option"]').contains('Kerala').click()

      cy.get('#mui-component-select-billingCountry').click()
      cy.get('[role="option"]').contains('India').click()

      cy.get('input[name="copyAddress"]').click()

      cy.get('button:nth-child(3)').click()

      cy.get('[name="primaryDiagnosis"]').type("Nothing as such")
      cy.get('[name="secondaryDiagnosis"]').type("Nothing as such")
      cy.get('[name="previousMedicalHistory"]').type("Nothing as such")
      cy.get('[name="allergies"]').type("Nothing as such")
      cy.get('[name="currentMedications"]').type("Nothing as such")
      cy.get('[name="immunizations"]').type("Nothing as such")
      cy.get('[name="wardRoomNumber"]').type("262")
      cy.get('[name="attendingPhysician"]').type("Akila")
      cy.get('[name="consultingPhysicians"]').type("Chitra")
      cy.get('[name="nextOfKin"]').type("kin")
      cy.get('[name="consentForms"]').type("Consented")

      cy.get('button:nth-child(4)').click()
      cy.get('[name="insuranceProvider"]').type("Consented")
      cy.get('[name="insuranceType"]').type("Consented")
      cy.get('[name="policyNumber"]').type("Consented")
      cy.get('[name="insurancePolicyHolder"]').type("Consented")
      cy.get('[name="insuranceCoverageDetails"]').type("Consented")
      cy.get('[name="occupation"]').type("Consented")
      cy.get('[name="companyName"]').type("Consented")
      cy.get('[name="employerAddress"]').type("Consented")
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

      cy.get('.MuiBox-root.css-dvxtzn').click()

      // ***Pending*** To include code attach the Files
      // cy.get('input[type="file"]').attachFile('C:\West\Pilot_Image\PilotbackgroundImage.jpg')
      // ***Pending*** To include code attach the Files
    })
  })