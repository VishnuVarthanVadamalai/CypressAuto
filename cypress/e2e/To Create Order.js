
const neatCSV = require('neat-CSV');
describe('Order', () => {


    it.only('To Create Order Refered by Doctor', () => {
      cy.log("vishnu varthan Doctor")
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

      cy.get('input[name=\'showDoctorSelect\']').click()
      cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(1).click()
      cy.get('[role="option"]').contains('Jacob Martin').click()

      cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(2).click()
      cy.get('[role="option"]').contains('MRI ANGIGRAPHY BOTH LOWER LIMB').click()

      cy.get('button[aria-label=\'Add to Cart\']').click()

    })

    it('To Create Order Refered by Sales', () => {
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
  
      })

      it('To Create Order Refered by New Doctor', () => {
        cy.log("vishnu varthan Doctor")
        cy.visit("http://healai-billing.s3-website-us-east-1.amazonaws.com/")
        cy.get('button[aria-label=Login]').click()
  
        cy.get('.actions-left > .MuiButtonBase-root').click()
        cy.get('li:nth-child(2) a:nth-child(1) div:nth-child(2) p:nth-child(1)').click()
        cy.get('button[aria-label=\'Add a new order to the system\']').click()
  
        cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(0).click()
        cy.get('[role="option"]').contains('Emily - 9876543210').click()
  
        cy.get('input[name=\'showDoctorSelect\']').click()
        cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(1).click()
        cy.get('button[aria-label=\'Add Doctor\']').click()

      cy.get('#mui-component-select-salutation').click()
      cy.get('[role="option"]').contains('Mrs.').click()

      cy.get('[name="firstName"]').type("Rekha")
      cy.get('[name="lastName"]').type("Kumar")
      cy.get('[name="email"]').type("rekhan@gmail.com")
      cy.get('[name="mobileNumber"]').type("8095938000")
      cy.get('[name="phone"]').type("8095938001")
      cy.get('[name="age"]').type("44")

      cy.get('#mui-component-select-maritalStatus').click()
      cy.get('[role="option"]').contains('Widowed').click()

      cy.get('#mui-component-select-gender').click()
      cy.get('[role="option"]').contains('Female').click()

      cy.get('[name="aadharNumber"]').type("444433332220")
      cy.get('[name="panNumber"]').type("AIPPV4620C")

      cy.get('button:nth-child(2)').eq(1).click()


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

      cy.get('.MuiBox-root.css-dvxtzn').click()
  
        // cy.get('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-5xsnhk').eq(2).click()
        // cy.get('[role="option"]').contains('MRI ANGIOGRAPHY NECK VESSELS').click()
  
        // cy.get('button[aria-label=\'Add to Cart\']').click()
  
      })
  })