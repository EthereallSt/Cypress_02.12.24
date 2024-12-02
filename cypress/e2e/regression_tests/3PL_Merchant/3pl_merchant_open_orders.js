/* eslint-disable no-undef */
import { setJwtToken, baseUrl, createOrderWithApi, ids, login, uniqueName, uniqueEmai } from "../../../support/util";
import { basePage } from "../../../selectors/base_page";
import { fulfilledOrdersPage } from "../../../selectors/fulfilled_orders_page";
import { orderId, batchNumber, pound, length, width, height, firstName, lastName } from "../../../support/commands";
import { orderEditPage, fulfillmentElements, orderSummaryElements, document, file, uploadedFileName } from "../../../selectors/order_edit_page";
import { importOrdersPage } from "../../../selectors/import_orders_modal_page";
import { openOrderPage, tableHeader, shipFromSection, shipToSection, OrdersTitle, bill3Partytext, ordersToggles, ordersStatictext, dimensions, note, upsOptions, quantumOptions, warningMessage } from "../../../selectors/open_order_page";
import { orderOnHoldPage } from "../../../selectors/orders_on_hold_page";
import "cypress-file-upload";



describe.only('Regression tests for 3PL Merchant users', () => {

    beforeEach('Login before each test', () => {
      cy.interceptNetworkRequest()
      login('stepan+3plChildme', '!')
      cy.url().should('include', '/storefront')
      cy.wait('@users').its("response.statusCode").should("eq", 200);
      Cypress.on("uncaught:exception", () => {
        return false;
      });
    })
  

    const newAddress = '35005 BEACH RD'
    // const newEmail = uniqueEmail('example')
    const newLastName = uniqueName('LastName')
    const newFirstName = uniqueName('FirstName')
    const newQTY = Cypress._.random(5, 20)
    const totalAmount = Cypress._.random(1, 100);


it('Org selector. Verify that the Merchant/Child org is able to create an "Open" order with  warehouse', () => {

    // 1. User is logged into  as Merchant
    // 2. User has at least one product
    // 3. User has at least one package
    // 4. User has at least one warehouse
    // 5 Merchant / Child has access to the org warehous



    cy.createCustomOrder(
        {
          childOrg: "erchant for smoke",
          childWH: " Merchant for smoke Warehouse",
          address: "35005 Bordman Rd",
          products: ["product1: m"],
          package: "package1",
          declaredValue: "20",
          product1QTY: '1',
        },
        { product: true, package: true, shopRate: true }
      )
})

it('Org selector. Verify that 3PL Owner is able to Fulfill an order', () => {

    Cypress._.times(2, () => {
      createOrderWithApi({
        baseUrl: requestUrl,
        warehouseId: 4390,
        username: 'com',
        password: '!',
        boxId: 34170, 
        organizationId: 1783, 
        variant: 30461
      })
    })

    cy.wrap(ids).then((id) => {
      cy.log(`Created order ${id}`)
      cy.get(basePage.fulfillmentNavigationBtn).click()
      cy.wait('@users').its("response.statusCode").should("eq", 200);
      cy.wait('@getOrders').its("response.statusCode").should("eq", 200);

      id.forEach((id) => {
        cy.xpath(openOrderPage.getCheckboxByOrderId(id))
          .check()
          .should('be.checked');
      });

      cy.get(openOrderPage.fulfillBtn)
        .find('.MuiButton-label span')
        .should('have.text', 'Fulfill (2)')

      // Get count of open orders
      cy.get(openOrderPage.openOrdersCount)
        .invoke("text")
        .then(($el) => {
          const openOrders = Number($el);

          cy.log('openOrders', openOrders)

          cy.get(openOrderPage.fulfilledCount)
            .invoke("text")
            .then(($el) => {
              const fulfilledOrders = Number($el);
              cy.log('fulfilledOrders', fulfilledOrders)


              //3 Click on "Fulfill" button
              cy.get(openOrderPage.fulfillBtn).click()

              cy.get(openOrderPage.fulfillWindowTitle)
                .should("be.visible")
                .and("have.text", "Create batch");
              cy.get(openOrderPage.organizationsDialog)
                .should("have.text", "Select Organizations to create batch")
                .and("have.css", "color", "rgba(88, 88, 88, 0.6)");
              cy.get(openOrderPage.fulfillOrganizationsCell).invoke('text').should("contain", "Stepan's Merchant for smoke");
              cy.get(openOrderPage.fulfillCheckbox).should("be.checked");
              cy.get(openOrderPage.fulfillOrdersCountCell)
                .last()
                .should("have.text", 2);
              cy.xpath(openOrderPage.batchBtn).should("have.css", "color", "rgb(245, 146, 49)");
              cy.get(openOrderPage.fulfillCancelButton)
                .eq(0)
                .should("have.css", "color", "rgb(88, 88, 88)");

              //4 Unmark one of modal checkboxes
              //5 Unmark all the checkboxes
              //6 Mark one of checkboxes

              //7 Click on "Cancel" button or outside the modal
              cy.get(openOrderPage.fulfillCancelButton).first().click()
              cy.get(openOrderPage.fulfillWindowTitle).should('not.exist')

              //8 Repeat step 3 and click on "Batch" button
              cy.get(openOrderPage.fulfillBtn).click()
              cy.xpath(openOrderPage.batchBtn).click()

              //9 Repeat step 7
              cy.get(openOrderPage.fulfillCancelButton).first().click()

              //10 Repeat step 8 and click on "Confirm" button
              cy.get(openOrderPage.fulfillBtn).click()
              cy.xpath(openOrderPage.batchBtn).click()
              cy.xpath(openOrderPage.confirmFulfillBtn).click()
              cy.get(openOrderPage.cubeLoader).should("not.exist");
              cy.wait(1000);
              cy.xpath(openOrderPage.getTextByName("Batch Order Details")).should("be.visible");
              cy.wait('@batches')
              cy.reload()
              cy.xpath(orderEditPage.batchStatus)
                .should("have.text", "Open")
                .and("have.css", "color", "rgb(46, 125, 50)");
              cy.get(orderEditPage.batchNumber).then((elem) => {
                const batchNumber = elem.text().match(/#\d*/)[0].replace("#", "");
                cy.log(batchNumber, 'batchNumber');
                cy.get(openOrderPage.openOrdersCount, { timeout: 20000 })
                  .invoke("text")
                  .then(($el) => {
                    const updatedOpenOrders = Number($el);
                    expect(updatedOpenOrders).to.eq(openOrders - 2);

                    //11 Close the order by clicking cross-button or navigating to "Open Orders" tab
                    cy.get(openOrderPage.closeOrderButton).click()
                    cy.get(openOrderPage.fulfilledCount, { timeout: 20000 })
                      .invoke("text")
                      .then(($el) => {
                        const updatedFulfilledOrders = Number($el);
                        expect(updatedFulfilledOrders).to.eq(fulfilledOrders + 1);
                      });
                    id.forEach(id => {
                      cy.xpath(openOrderPage.getOrderByOrderId(id)).should('not.exist')
                    })

                    //16 Navigate to "Fulfilled Orders" > "Batch Orders" page
                    cy.get(basePage.fulfilledOrdersNavigationBtn).click()
                    cy.get(fulfilledOrdersPage.fulfilledOrdersTitle).invoke('text').should('contain', 'Fulfilled Orders')
                    cy.xpath(fulfilledOrdersPage.getBatchByNumber(batchNumber)).should('be.visible')

                    //17 Click on "View Detail" link for one of the open fulfilled orders
                    cy.xpath(fulfilledOrdersPage.getViewDetailByOrderNumber(batchNumber)).click()
                    cy.xpath(openOrderPage.getTextByName("Batch Order Details")).should("be.visible");
                    cy.xpath(orderEditPage.batchStatus)
                      .should("have.text", "Open")
                      .and("have.css", "color", "rgb(46, 125, 50)");
                  })
              })
            })
        })
    })
})
it('Org selector. Verify that Merchant/Child org is able to edit Order from the  warehouse', () => {

    // Order from the  warehouse has been created
    createOrderWithApi({
        baseUrl: requestUrl,
        warehouseId: 4390,
        username: 'stem',
        password: '!',
        boxId: 34170, 
        organizationId: 1783, 
        variant: 30461
      })
    cy.wrap(ids).then(() => {
      const orderId = ids[ids.length - 1]
      cy.log(`Created order ${ids}`)

      //1. Open ""Fulfillment Center &amp;gt; ""Open Orders"" page
      cy.get(basePage.fulfillmentNavigationBtn).click()
      cy.wait('@users').its("response.statusCode").should("eq", 200);
      cy.wait('@getOrders').its("response.statusCode").should("eq", 200);

      //2. Open created Child org order 
      cy.xpath(openOrderPage.getOrderByOrderId(orderId)).should('be.visible').click()
      cy.get(openOrderPage.fullfillmentSummaryTitle)
        .should("be.visible")
        .and("have.text", "Fulfillment Summary");
      cy.get(openOrderPage.selectedOrderTitle)
        .eq(0)
        .should("be.visible")
        .and("have.text", ` Order #${orderId}`);

      //3. Click on the ""Edit"" button on ""Fulfilmment Summary"" table 
      cy.get(orderEditPage.editBtn).eq(0).click()
      cy.get(orderEditPage.editShippingAddressWindowTitle, { timeout: 30000 }).invoke('text').should('contain', 'Edit Shipping Recipient')

      //4. Edit all required field 
      cy.get(orderEditPage.firstNameInput)
        .eq(1)
        .clear()
        .type(newFirstName)
        .invoke('val')
        .should('eq', newFirstName)
      cy.get(orderEditPage.lastNameInput)
        .eq(1)
        .clear()
        .type(newLastName)
        .invoke('val')
        .should('eq', newLastName)
      cy.get(orderEditPage.emailInput)
        .eq(1)
        .clear()
        .type(newEmail)
        .invoke('val')
        .should('eq', newEmail)
      cy.get(openOrderPage.phoneInput).eq(1).type("{backspace}{backspace}{backspace}{backspace}")
      cy.get(openOrderPage.phoneInput).eq(1).type("2222")
      cy.get(openOrderPage.phoneInput).eq(1).invoke('val').should('eq', '+1 522 221 2222')
      cy.get(orderEditPage.newAddressField)
        .eq(1)
        .clear()
        .type(newAddress);
      cy.get(openOrderPage.selectBusinessAdress).click();
      cy.wait(2000)

      //5. Click on the ""Update"" button 
      cy.get(orderEditPage.modalUpdateBtn).click()
      cy.get(orderEditPage.modalLoader, { timeout: 30000 }).should('not.exist')
      cy.wait('@getOrders').its("response.statusCode").should("eq", 200)
      cy.get(openOrderPage.selectedOrderTitle)
        .eq(0)
        .should("be.visible")
        .and("have.text", ` Order #${orderId}`);
      cy.xpath(openOrderPage.getTextByName("Address Verified")).should(
        "have.css",
        "color",
        "rgb(76, 175, 80)"
      );

      //6. Navigate to the ""Order Summary"" tab 
      cy.get(orderEditPage.orderSummaryBtn).click();
      cy.xpath(orderEditPage.orderSummaryTitle).should('be.visible')

      //7. Click on the ""Edit"" button on the ""Order Lines"" table 
      cy.get(orderEditPage.editBtn).eq(0).click();

      //8. Edit qty of the order item 
      cy.get(orderEditPage.productQty)
        .clear()
        .type(newQTY)
        .invoke("val")
        .should("eq", newQTY.toString());

      //9. Add a product row and select the product 
      cy.get(orderEditPage.addProductBtn).eq(1).click();
      cy.wait("@variants").its("response.statusCode").should("eq", 200);
      cy.get(orderEditPage.packageSelect).click();
      cy.get(orderEditPage.searchProductsField).type("name98424242224: mid");    //change product to mine
      cy.wait("@variants").its("response.statusCode").should("eq", 200);
      cy.wait('@getOrders').its("response.statusCode").should("eq", 200)
      cy.wait(3000)
      cy.get(orderEditPage.productList)
        .first()
        .should("contain", "name98424242224: mid")   //change product to mine
        .click()
      cy.get(orderEditPage.productQty)
        .eq(1)
        .clear()
        .type(newQTY)
        .invoke("val")
        .should("eq", newQTY.toString());

      //10. Click on ""Save"" button 
      cy.get(orderEditPage.modalTitleButtons).eq(1).click();
      cy.get(openOrderPage.selectedOrderTitle)
        .eq(0)
        .should("be.visible")
        .and("have.text", ` Order #${orderId}`);

      //11. Go back to the ""Fulfillment Summary"" tab
      cy.get(orderEditPage.fulfillmentSummaryBtn).click();

      //12. Navigate to the ""Packaging"" tab in the ""Fulfillment Details"" table &amp;gt; Package 1
      cy.xpath(orderEditPage.packagingTab).click();
      cy.xpath(orderEditPage.packagingTab).should(
        "have.css",
        "color",
        "rgb(245, 146, 49)"
      );

      //13. Select the package 
      cy.get(orderEditPage.packageDropdown).click();
      cy.get(orderEditPage.packageList).contains('Test package(Box)195151').click();
      cy.wait(2000)

      //14. Proceed to the ""Carrier"" tab 
      cy.xpath(orderEditPage.carrierTab).click();
      cy.get(orderEditPage.declaredValue).clear().type("20");

      //15. Click on the ""Shop Rates""
      cy.xpath(orderEditPage.shopRatesBtn).click();
      cy.get(orderEditPage.shopRateSuccessMesage, { timeout: 20000 })
        .should("be.visible")
        .and("have.text", "Successfully recalculated shipping.");

      //16. Navigate to the ""Open Orders"" page
      cy.get(basePage.fulfillmentNavigationBtn).click();

      //17. Switch to the  org account
      cy.get(basePage.accountSettingsDropdown).click()
      cy.get(basePage.accountSettingsUsersList).contains('Login with different user').click()
      login('ste!');
      cy.url().should('include', '/storefront');

      //Edited order is displayed in the table with corresponding data 
      //   18. Open edited order by Merchant/Child org
      //   18. Order is opened and displayed with corresponding data

    });

})

it('Org selector. Verify that Merchant is not able to void label for a batch with warehouse', () => {

// Order form the warehouse has been fulfilled and checked out
// User is logged as a Merchant
createOrderWithApi({
    baseUrl: requestUrl,
    warehouseId: 4390,
    username: 's',
    password: '!',
    boxId: 34170, 
    organizationId: 1783, 
    variant: 30461
    })
cy.wrap(ids).then((ids) => {
const orderId = ids[ids.length - 1]
cy.log(`Created order ${orderId}`)
cy.get(basePage.fulfillmentNavigationBtn).click()
cy.wait('@users').its("response.statusCode").should("eq", 200);
cy.wait('@getOrders').its("response.statusCode").should("eq", 200);
cy.fulfillOrder([orderId]).then(() => {
    cy.get(basePage.fulfilledOrdersNavigationBtn).click()
    cy.get(fulfilledOrdersPage.fulfilledOrdersTitle).invoke('text').should('contain', 'Fulfilled Orders')
    cy.xpath(fulfilledOrdersPage.getBatchedOrderByNumberAndByStatus('Open', batchNumber)).should('exist')
    cy.xpath(fulfilledOrdersPage.getViewDetailByOrderNumber(batchNumber)).click()
    cy.xpath(openOrderPage.getTextByName("Batch Order Details")).should("be.visible");
    cy.checkoutOrder()

    //1 Navigate to "Fulfillment" > "Fulfilled Orders" tab
    cy.get(basePage.fulfilledOrdersNavigationBtn).click()

    //2 Open checked out batch
    cy.xpath(fulfilledOrdersPage.getViewDetailByOrderNumber(batchNumber)).click()
    cy.xpath(openOrderPage.getTextByName("Batch Order Details")).should("be.visible");

    // 3. Expand ""Actions"" dropdown
    // 3. ""Actions"" button is disabled
    cy.get(openOrderPage.actionsDropDownBtn).first().should('not.be.enabled')
    // cy.contains('li', 'Void Labels', { timeout: 15000 })
    })
})
})

it('Org selector. Verify that only own child org is displayed in the "Organization" dropdown list in the "Custom Order Shipment" modal', () => {
// User is logged into  as Merchant

    // 1. Open "Fulfillment" "Open Orders" page
    cy.get(openOrderPage.openOrdersTitle)
        .should("be.visible")
        .and("have.text", "Open Orders");

    //2. Click on "Custom Shipment" button
    cy.xpath(openOrderPage.addCustomShipment).click();
    cy.xpath(openOrderPage.addShipmentWindowTitle)
        .should("exist")
        .and("have.text", "Custom Order Shipment");
    cy.get(openOrderPage.warehouseDropDown)
        .invoke("text")
        .should("contain", "Auto-Select Warehouse");
    // Own org is selected by default in the ""Organization"" dropdown

    // 3. Expand the ""Organization"" dropdown
    cy.get(productOverviewPage.organizationField).click()
    cy.get(productOverviewPage.organizationList).contains("Stepan's Merchant for smoke")
    cy.contains(productOverviewPage.organizationList, 'Parent org').should('not.exist')
    // Only own Child org is displayed
})

it('Check that "Total" field is editable in the "Edit Order" modal ater creating an order with variants', () => {

    login('', '',{
      url: 'https:/com',
    });
    cy.url().should('include', '/storefront')
    cy.wait('@users').its("response.statusCode").should("eq", 200);
    createOrderWithApi({
      baseUrl: requestUrl,
      warehouseId: 4390,
      username: 'stom',
      password: '!',
      boxId: 34170,
      organizationId: 1783,
      variant: 28579
    })
    cy.wrap(ids).then((ids) => {
      const orderId = ids[ids.length - 1]
      cy.log(`Created order ${orderId}`)

      //1 Navigate to the "Fulfillment" > "Open Orders" tab 
      cy.get(basePage.fulfillmentNavigationBtn).click()
      cy.wait('@users').its("response.statusCode").should("eq", 200);
      cy.wait('@getOrders').its("response.statusCode").should("eq", 200);

      //2 Open created order 
      cy.xpath(openOrderPage.getOrderByOrderId(orderId)).click()
      cy.get(openOrderPage.selectedOrderTitle, { timeout: 30000 })
        .eq(0)
        .should("be.visible")
        .and("have.text", ` Order #${orderId}`)

        //3 Proceed to the "Order Summary" tab
      cy.get(orderEditPage.orderSummaryBtn).click();
      cy.xpath(orderEditPage.orderSummaryTitle).should('be.visible')

      //4 Click on the "Edit" button in the "Order Lines" section
      cy.get(orderEditPage.editBtn).eq(0).click()
      cy.get(orderEditPage.editOrderWindowTitle).should('be.visible').and('have.text', 'Edit Order')
      cy.xpath(orderEditPage.totalProductCost).should('have.text', '$0.00')

      //5 Edit "Total" field with the numeric value (e.g. 23.25)
      cy.get(orderEditPage.productCostField).clear().type(totalAmount).invoke('val').should('eq', `${totalAmount}`)

      //6 Click on the "Save" button 
      cy.get(orderEditPage.saveEditOrderBtn).click()
      cy.get(orderEditPage.editOrderWindowTitle).should('not.exist')
      cy.wait('@boxes').its("response.statusCode").should("eq", 200);
      cy.wait('@getOrders').its("response.statusCode").should("eq", 200);
      cy.xpath(orderEditPage.getTotalAmountByProductName(`'Special smoke product1 : medium'`, `'$${totalAmount}.00'`)).should('be.visible')

      //7 Navigate back to the "Fulfilment Summary" tab
      cy.get(orderEditPage.fulfillmentSummaryBtn).click()
      cy.xpath(orderEditPage.getTotalAmountByProductName(`'Special smoke product1 : medium'`, `'$${totalAmount}.00'`)).should('be.visible')
    })
})

it.only('Check that corresponding error message is displayed when saving the item price with more than 2 decimal places in the "Edit Order" modal', () => {

    login('st', 'T',{
        url: 'htt.com',
    });
    cy.url().should('include', '/storefront')
    cy.wait('@users').its("response.statusCode").should("eq", 200);
    createOrderWithApi({
      baseUrl: requestUrl,
      warehouseId: 4390,
      username: 'stm',
      password: '',
      boxId: 34170,
      organizationId: 1783,
      variant: 28579
    })
    cy.wrap(ids).then((ids) => {
      const orderId = ids[ids.length - 1]
      cy.log(`Created order ${orderId}`)

      //1 Navigate to the "Fulfillment" > "Open Orders" tab
      cy.get(basePage.fulfillmentNavigationBtn).click()
      cy.wait('@users').its("response.statusCode").should("eq", 200);
      cy.wait('@getOrders').its("response.statusCode").should("eq", 200);

      //2 Open created order
      cy.xpath(openOrderPage.getOrderByOrderId(orderId)).click()
      cy.get(openOrderPage.selectedOrderTitle, { timeout: 30000 })
        .eq(0)
        .should("be.visible")
        .and("have.text", ` Order #${orderId}`)

        //3 Proceed to the "Order Summary" tab
      cy.get(orderEditPage.orderSummaryBtn).click();
      cy.xpath(orderEditPage.orderSummaryTitle).should('be.visible')

      //4 Click on the "Edit" button in the "Order Lines" section
      cy.get(orderEditPage.editBtn).eq(0).click()
      cy.get(orderEditPage.editOrderWindowTitle).should('be.visible').and('have.text', 'Edit Order')
      cy.xpath(orderEditPage.totalProductCost).should('have.text', '$0.00')

      //5 Edit the "Total" field with more than 2 decimal places (e.g. 23.253)
      cy.get(orderEditPage.productCostField).clear().type('23.253').invoke('val').should('eq', '23.253')

      //6 Click on the "Save" button
      cy.get(orderEditPage.saveEditOrderBtn).click()
      cy.wait('@boxes').its("response.statusCode").should("eq", 200);
      cy.get(orderEditPage.editOrderErrorMesage).should('be.visible').and('have.text', 'Price error: Ensure that there are no more than 2 decimal places.')
    })
})
})