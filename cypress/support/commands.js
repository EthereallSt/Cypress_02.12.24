/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
//const { MailSlurp } = require('mailslurp-client');
// set your api key with an environment variable CYPRESS_API_KEY
// (cypress prefixes environment variables with CYPRESS)
const apiKey = Cypress.env("API_KEY");
// const mailslurp = new MailSlurp({ apiKey });

// Cypress.Commands.add('createInbox', () => mailslurp.createInbox());

// Cypress.Commands.add('waitForLatestEmail', (inboxId) => mailslurp.waitForLatestEmail(inboxId));
import { signUpPage } from "../selectors/sing_up_page";
import { signInPage } from "../selectors/sign_in_page";
import { billingSettingPage } from "../selectors/billing_setting_page";
import { shippingPackagesPage } from "../selectors/shipping_packages_page";
import { openOrderPage } from "../selectors/open_order_page";
import { productOverviewPage, } from "../selectors/product_overview_page";
import { orderEditPage } from "../selectors/order_edit_page";
import { userAccessPage } from "../selectors/user_access_page"
import { basePage } from "../selectors/base_page";
import { orderOnHoldPage } from "../selectors/orders_on_hold_page";
import { organizationSettingsAdminPage } from "../selectors/organization_settings_admin_page";
import { inventoryManagementPage } from "../selectors/inventory_management_page";
import { freightShipmentsPage, navigateToFreightShipmentsPage, dimensionFields } from "../selectors/freight_shipments_page";
import { feeTypeElement, invoiceCenterPage, navigateToInvoiceCenterPage } from "../selectors/invoice_center_page";
import { uniqueName, uniqueValue, randomNumber, formatWithCommas, getRandomNumber } from "../support/util";
import { bundlePage } from "../selectors/bundles_page";
const voidLabelsModal = orderEditPage.voidLabelsModal
const bulkConfiguration = productOverviewPage.bulkConfiguration
const componentsTab = bundlePage.componentsTab
const paymentModal = billingSettingPage.paymentModal


/**
 * This command can be used to login by passing username and passwords
 */
Cypress.Commands.add("login", (username, password, successConfirm = true) => {
  cy.intercept("POST", "auth/token/").as("auth");

  cy.visit("login");

  cy.window().then((win) => {
    if (win.location.href != `${Cypress.config().baseUrl}login`) {
      cy.xpath(basePage.accountLogOut).click();
    }
  });

  cy.get(signInPage.emailField).type(username);
  cy.get(signInPage.passwordField).type(password);
  cy.get(signInPage.loginButton).click();

  if (successConfirm) {
    cy.wait("@auth").should((req) => {
      expect(req.response.statusCode).to.eq(200);
    });
  }
  console.log(successConfirm, "successConfirm");
});





Cypress.Commands.add("getIframe", (iframe) => {
  return cy
    .get(iframe)
    .its("0.contentDocument.body")
    .should("be.visible")
    .then(cy.wrap);
});

Cypress.Commands.add("checkEmail", (emailaddr, title, wait_time) => {
  cy.task("gmail:check", {
    options: {
      to: emailaddr,
      subject: title,
      wait_time_sec: wait_time,
    },
  }).then(() => {
    cy.log(`Checked for email to ${emailaddr} with subject ${title}`);
  });

  return cy.task("gmail:get-messages", {
    options: {
      to: emailaddr,
      subject: title,
      include_body: true,
      body: {
        html: "string",
        text: "string",
      },
    },
  }).then((messages) => {
    cy.log(`Retrieved messages: ${JSON.stringify(messages)}`);
  });
});


Cypress.Commands.add("singUp", (user) => {
  const baseURL = `${Cypress.config().baseUrl}login`;
  if (user.url) {
    cy.visit(user.url);
  } else {
    cy.visit(baseURL)
  }
  cy.get(signInPage.signUpButton).click();
  cy.get(signUpPage.firstNameFiled).type(user.name);
  cy.get(signUpPage.errorNotification).should("not.exist");
  cy.get(signUpPage.lastNameFiled).type(user.lastname);
  cy.get(signUpPage.errorNotification).should("not.exist");
  cy.get(signUpPage.companyNameFiled).type(user.companyname);
  cy.get(signUpPage.errorNotification).should("not.exist");
  cy.get(signUpPage.companyEmailFiled).type(user.email);
  cy.get(signUpPage.errorNotification).should("not.exist");
  cy.get(signUpPage.passwordFiled).type(user.password);
  cy.get(signUpPage.errorNotification).should("not.exist");
  cy.get(signUpPage.confirmPasswordFiled).type(user.password);
  cy.get(signUpPage.errorNotification).should("not.exist");
  cy.get(signUpPage.agreementCheckbox).click();
  cy.get(signUpPage.signUpBtn).click();
});

Cypress.Commands.add("addCreditCard", (card) => {
  cy.get(billingSettingPage.billingOptionsBtn).click({ force: true });
  cy.xpath(billingSettingPage.addCreditCardOptin, { timeout: 10000 }, { force: true }).click();
  cy.wait(1000)
  cy.get(billingSettingPage.newCardWindow)
    .should("be.visible")
    .should("have.text", "New Card");
  cy.wait(500);
  cy.get(billingSettingPage.cardNumberField).type(card.number);
  cy.get(billingSettingPage.expiryDateField).type("042030").invoke('val').should('eq', '04/2030')
  cy.get(billingSettingPage.cvvField).type("111").invoke('val').should('eq', '111')
  cy.get(billingSettingPage.cardNameField).type(card.name).invoke('val').should('eq', card.name)
  cy.log(`card name is : ${card.name}`)
  if (card.default) {
    cy.get(billingSettingPage.defaultToggleBtn).check({ force: true }).should('be.checked')
  }
  cy.get(billingSettingPage.cardholderNameField).type("Test").invoke('val').should('eq', 'Test')
  cy.get(billingSettingPage.searchPlacesField).clear().type('123');
  cy.get(billingSettingPage.addressesDropDownList1).first().click();
  cy.get(billingSettingPage.cityField).invoke("val").should("not.be.empty");
  cy.get(billingSettingPage.saveBtn).click({ force: true });
  // cy.get(accountSettingsPage.savingSuccessfulNotification).should(
  //   "contain",
  //   "Successfully added"
  // );
  cy.get(billingSettingPage.newCardWindow).should("not.exist");
  cy.xpath(billingSettingPage.getCardByName(card.name)).should('be.visible')
  if (card.default) {
    cy.xpath(billingSettingPage.getToggleByCardName(card.name)).should('be.checked')
  }
});

Cypress.Commands.add("addACH", (ach) => {
  const checkedStyle = 'rgb(245, 146, 49)';

  // Click on "+" button to the right of "Billing Options" title
  cy.get(billingSettingPage.billingOptionsBtn).click();
  cy.xpath(billingSettingPage.addACH).click();
  cy.wait(2000);

  // Click on "Add ACH" item
  cy.get(billingSettingPage.newACHWindow)
    .should("be.visible")
    .should("have.text", "Payment Method - ACH");

  // Fill in all required fields with valid data
  cy.get(billingSettingPage.acvAccountField).type(ach.name).should('have.value', ach.name);
  cy.get(billingSettingPage.acvAccountHolderField).type(ach.holder).should('have.value', ach.holder);
  cy.get(billingSettingPage.acvRoutingNumberField).type(ach.routingNumber).should('have.value', ach.routingNumber);
  cy.get(billingSettingPage.acvAccountNumberField).type(ach.accountNumber).should('have.value', ach.accountNumber);
  cy.get(billingSettingPage.acvAccountNumber2Field).type(ach.accountNumber).should('have.value', ach.accountNumber);

  // Click on "Save" (white checkmark)
  cy.wait(2000);
  cy.get(':nth-child(3) > .MuiButtonBase-root').click();
  cy.get(billingSettingPage.confirmPlaidAccountTitle).should('be.visible').should('have.text', 'Confirm Account');
  cy.get(':nth-child(2) > .MuiButton-label').click();
});

Cypress.Commands.add("removeCreditCard", (card) => {
  cy.get(billingSettingPage.newCardWindow)
    .should("be.visible")
    .and("have.text", "Payment Method Details");
  cy.get(billingSettingPage.removeCreditCardBtn).should('be.enabled').click()
  cy.get(billingSettingPage.billingTitle).last().should('be.visible').and('have.text', 'Remove Payment Method')
  cy.get(billingSettingPage.removeConfirmBtn).should('be.enabled').click()
  cy.get(billingSettingPage.newCardWindow).should('not.exist')
  cy.xpath(billingSettingPage.getTitleByCardName(card)).should('not.exist')
})


Cypress.Commands.add("addShippingPackage", (option) => {
  cy.intercept('GET', '/api/products/*').as('getProducts')
  cy.intercept('GET', '/api/v2/boxes/boxes/*').as('boxes')

  cy.get(shippingPackagesPage.addNewShippingPackageBtn).click();
  cy.wait('@getProducts').its("response.statusCode").should("eq", 200);
  cy.xpath(shippingPackagesPage.addNewShippingPackageWindow).should(
    "be.visible"
  );
  if (option.organization) {
    cy.get(shippingPackagesPage.organizationField).last().click()
    cy.get(shippingPackagesPage.organizationList).contains(option.organization).click()
  }
  cy.get(shippingPackagesPage.shippingPackageNameField).type(option.packageName)
  if (option.sku) {
    cy.get(shippingPackagesPage.productSKU)
      .type(option.sku)
      .invoke('val').should('eq', option.sku)
  }
  if (option.pallet) {
    cy.get(shippingPackagesPage.packageTypeSelectDropdown).first().click()
    cy.get(shippingPackagesPage.packageTypeList).contains('Pallet').click()
    cy.get(shippingPackagesPage.lengthField).type(option.dimension)
    cy.get(shippingPackagesPage.widthField).type(option.dimension)
    cy.get(shippingPackagesPage.heightField).type(option.dimension)
    cy.contains('button', 'Actions').click();
    cy.get(shippingPackagesPage.actionList).contains('Save and close').click()
    cy.wait('@boxes').its("response.statusCode").should("eq", 200);
    cy.xpath(shippingPackagesPage.addNewShippingPackageWindow).should('not.exist')
  }
  cy.get(shippingPackagesPage.packagingInventoryTab).click()
  cy.xpath(shippingPackagesPage.getStockFieldByWarehouseName(option.warehouse)).click()
  cy.get(shippingPackagesPage.stockAdjustmentField).invoke('val', '').trigger('input').type(option.stockcount);
  cy.xpath(shippingPackagesPage.addBtn).click();
  cy.xpath(shippingPackagesPage.stockAdjustmentWindow).should("not.exist");
  cy.xpath(shippingPackagesPage.getStockFieldByWarehouseName(option.warehouse)).should("have.value", option.stockcount);
  cy.get(shippingPackagesPage.packagingDetailsTab).click()

  if (option.type == "mailer") {
    cy.get(shippingPackagesPage.packageTypeToggleBtn).click();
    cy.get(shippingPackagesPage.heightField).should("not.be.visible");
    cy.get(shippingPackagesPage.fillerHeightField).should("not.be.visible");
    cy.get(shippingPackagesPage.lengthField)
      .type(option.dimension)
      .should("have.value", option.dimension);
    cy.get(shippingPackagesPage.widthField)
      .type(option.dimension)
      .should("have.value", option.dimension);
  } else {
    cy.get(shippingPackagesPage.lengthField)
      .type(option.dimension)
      .should("have.value", option.dimension);
    cy.get(shippingPackagesPage.widthField)
      .type(option.dimension)
      .should("have.value", option.dimension);
    cy.get(shippingPackagesPage.heightField)
      .type(option.dimension)
      .should("have.value", option.dimension);
  }
  cy.contains('button', 'Actions').click();
  cy.get(shippingPackagesPage.actionList).contains('Save and close').click()
  cy.wait('@boxes').its("response.statusCode").should("eq", 200);
  cy.xpath(shippingPackagesPage.addNewShippingPackageWindow).should('not.exist')
}
);

let upc = []
Cypress.Commands.add("createProduct", (product, options) => {
  cy.intercept('GET', '/api/products/*').as('getProducts')

  //Add new product
  cy.xpath(productOverviewPage.addNewProductBtn).click({ force: true });
  cy.xpath(productOverviewPage.addNewProductWindowTitle, { timeout: 20000 })
    .should("be.visible")
    .should("have.text", "Add Product");
  if (product.childOrg) {
    cy.wait(2000)
    cy.get(productOverviewPage.organizationField).click()
    cy.get(productOverviewPage.organizationList).contains(product.childOrg).click()
  }
  cy.wait(1000)
  cy.get(productOverviewPage.productNameField)
    .type(product.name)
    .should("have.value", product.name);
  cy.get(productOverviewPage.productSkuField)
    .type(product.sku)
    .should("have.value", product.sku);

  if (options.hasOwnProperty('active') && options.active === false) {
    cy.get(productOverviewPage.activeProducToggleBtn).click({ force: true });
  }

  if (product.variants) {
    let index = 0;
    //Input variants data
    for (global.variant of product.variants) {
      cy.xpath(productOverviewPage.addVariantBtn).click()
      cy.get(productOverviewPage.variantNameField)
        .eq(index)
        .type(variant[0])
        .should("have.value", variant[0]);
      cy.get(productOverviewPage.variantSkuField)
        .eq(index)
        .type(variant[1])
        .should("have.value", variant[1]);
      cy.get(productOverviewPage.variantLbsField)
        .eq(index)
        .type(variant[2])
        .should("have.value", variant[2]);
      cy.get(productOverviewPage.variantLengthField)
        .eq(index)
        .type(variant[2])
        .should("have.value", variant[2]);
      cy.get(productOverviewPage.variantWidthField)
        .eq(index)
        .type(variant[2])
        .should("have.value", variant[2]);
      cy.get(productOverviewPage.variantHeightField)
        .eq(index)
        .type(variant[2])
        .should("have.value", variant[2]);

      if (options.fulfilmentIgnore) {
        cy.xpath(productOverviewPage.ignoreFulfillmentToggleBtn)
          .eq(index)
          .click();
        cy.xpath(productOverviewPage.ignoreFulfillmentToggleCheckBox)
          .eq(index)
          .should("be.checked");
      }

      if (options.productPackaging) {
        cy.xpath(productOverviewPage.productPackagingToggleBtn)
          .eq(index)
          .click();
        cy.xpath(productOverviewPage.productPackagingCheckBox)
          .eq(index)
          .should("be.checked");
      }
      index++;
    }
    if (product.upc) {
      if (product.upcCount === 0) {
        cy.get(productOverviewPage.variantUpcField).
          first()
          .clear()
          .type(product.upc)
          .invoke('val')
          .should('eq', `${product.upc}`)
      } else {
        cy.get(productOverviewPage.variantUpcField).eq(index).type(product.upc)
      }
      cy.log('Product UPC', product.upc)
      upc.push(product.upc)
    }

    if (options.amount) {
      cy.xpath(productOverviewPage.inventoryDetailBtn).click();

      //Input amount for variants
      for (let i = 0; i < product.variants.length; i++) {
        cy.get(productOverviewPage.variantStockField).eq(i).click();
        cy.get(productOverviewPage.stockAdjustmentWindowTitle)
          .should("be.visible")
          .should("have.text", "Stock Adjustment");
        cy.get(productOverviewPage.stockAdjustmentField)
          .clear()
          .type(options.amount);
        cy.get(productOverviewPage.addStockAdjustmentBtn).click();
        cy.get(productOverviewPage.confirmStockAdjustmentWindowTitle)
          .should("be.visible")
          .should("have.text", "Confirm Stock Adjustment");
        cy.get(productOverviewPage.currentStockField).should("have.value", "0");
        cy.get(productOverviewPage.newStockField).should(
          "have.value",
          options.amount
        );
        cy.get(productOverviewPage.confirmStockAdjustmentBtn).click();
        cy.get(productOverviewPage.confirmStockAdjustmentWindowTitle).should(
          "not.exist"
        );
        cy.get(productOverviewPage.stockAdjustmentWindowTitle).should(
          "not.exist"
        );
        cy.get(productOverviewPage.variantStockField)
          .eq(i)
          .should("have.value", options.amount);
        cy.get(productOverviewPage.stockAviailable)
          .eq(i)
          .should("have.text", ` ${options.amount} `);
      }
    }
  }
  //todo: add 401 or 200
  cy.wait(3000)
  cy.wait("@getProducts").then(($el) => {
    expect($el.response.statusCode).to.be.oneOf([401, 200]);
  });
  cy.xpath(productOverviewPage.saveNewProductBtn).click();
  cy.wait(2000)
});

export const dimensions =
  [
    bulkConfiguration.configWeightLbs,
    bulkConfiguration.configWeightOz,
    bulkConfiguration.configDimensionsLength,
    bulkConfiguration.configDimensionsWidth,
    bulkConfiguration.configDimensionsHeight,
  ]


Cypress.Commands.add('CreateBulkConfiguration', (options) => {

  cy.get(bulkConfiguration.baseSkuField).each(($el, index) => {
    cy.wrap($el).click()
    cy.get(bulkConfiguration.baseSkuList)
      .should('have.length.gte', 1)
      .contains(options.baseSku[index]).click()
  })

  cy.get(bulkConfiguration.configurationField).each(($el, index) => {
    cy.wrap($el).click()
    cy.get(bulkConfiguration.configurationlist)
      .should('have.length.gte', 1)
      .contains(options.configuration[index]).click()
  })

  cy.get(bulkConfiguration.configSkuField).each(($el, index) => {
    if (options.sku.length === 1) {
      cy.get(bulkConfiguration.configSkuField)
        .type(options.sku[0])
    } else {
      cy.wrap($el).type(options.sku[index]);
    }
  });

  cy.get(bulkConfiguration.unitsPerConfigField).each(($el) => {
    cy.wrap($el).type(options.amount)
      .invoke('val')
      .should('eq', `${options.amount}`)
  });


  dimensions.forEach((field) => {
    cy.get(field).each(($el) => {
      cy.wrap($el)
        .clear()
        .type(options.amount)
        .invoke('val')
        .should('eq', `${options.amount}`)
    });
  })
})


let batchNumber;
Cypress.Commands.add("fulfillOrder", (orderId) => {
  cy.get(openOrderPage.openOrdersTitle).invoke('text').then((text) => {
    if (text === 'Orders On Hold') {
      // for (const orderId of orderIds) {
      cy.xpath(orderOnHoldPage.getCheckboxByOrderId(orderId)).click();
      // }
    } else {
      // for (const orderId of orderIds) {
      cy.xpath(openOrderPage.getCheckboxByOrderId(orderId)).click();
      // }
    }
  });

  cy.get(openOrderPage.fulfillBtn).click();
  cy.get(openOrderPage.fulfillWindowTitle)
    .should("exist")
    .and("have.text", "Create batch");
  cy.intercept("GET", "/api/order_batches/*").as("getOrderBatch");
  cy.xpath(openOrderPage.batchBtn).click();
  cy.xpath(openOrderPage.confirmFulfillBtn).click();
  cy.wait("@getOrderBatch").its("response.statusCode").should("eq", 200);
  cy.wait("@getOrderBatch").its("response.statusCode").should("eq", 200);
  cy.get(orderEditPage.batchPageTitle)
    .should("be.visible")
    .and("have.text", "Batch Order Details");
  cy.get(orderEditPage.loadAnimation).should("not.exist");
  cy.get(orderEditPage.emptyTable).should("not.exist");
  cy.get(orderEditPage.batchNumber).then(elem => {
    batchNumber = elem.text().match(/\d+/)[0]
  })
});

Cypress.Commands.add("completeOpenOrder", (orderId) => {
  cy.wait(2000);
  cy.xpath(openOrderPage.getCheckboxByOrderId(orderId)).click();
  cy.get(openOrderPage.orderActionsDropDown).click();
  cy.get(openOrderPage.completeAction).click();
  cy.get(openOrderPage.completeWindowTitle)
    .should("be.visible")
    .and("have.text", "Complete Order");
  cy.xpath(openOrderPage.confirmCompleteBtn).click();
  cy.get(openOrderPage.completeWindowTitle).should("not.exist");
  cy.get(openOrderPage.loader).should("not.exist");
});

Cypress.Commands.add("completeOrderOnHold", (orderId) => {
  cy.xpath(orderOnHoldPage.getCheckboxByOrderId(orderId)).click();
  cy.get(orderOnHoldPage.completeBtn).click();
  cy.get(orderOnHoldPage.completeWindowTitle)
    .should("be.visible")
    .and("have.text", "Complete Order");
  cy.xpath(orderOnHoldPage.confirmCompleteBtn).click();
  cy.get(orderOnHoldPage.completeWindowTitle).should("not.exist");
});
let totalPaymentFee
Cypress.Commands.add("checkoutOrder", () => {
  cy.xpath(orderEditPage.checkoutLabelsBtn).should('not.be.disabled', { timeout: 30000 }).click();
  cy.get(orderEditPage.checkoutWindowTitle)
    .should("exist")
    .and("have.text", "Checkout");
  cy.get(orderEditPage.paymentServiceFees).invoke('text').then(amount => {
    totalPaymentFee = amount.trim()
    cy.log('totalPaymentFee', totalPaymentFee)
  })
  cy.get(orderEditPage.confirmOrderBtn).click();
  // cy.get(orderEditPage.completeCheckouWindowTitle, { timeout: 40000 })
  //   .should("be.visible")
  //   .and("have.text", "Thank You!");
  cy.get('.MuiDialogTitle-root', { timeout: 40000 })
    .should("be.visible")
    .and("have.text", "Thank You For Your Purchase!");
  cy.get('button').contains('Close').click()
  cy.get('.MuiDialogTitle-root').should("not.exist");
  cy.xpath(orderEditPage.batchStatus).should("have.text", "Ready For Pick");
});

Cypress.Commands.add("waitIfError", (requestName, reload = false) => {
  cy.wait(requestName).then((req) => {
    if (req.response.statusCode == "401" || req.response.statusCode == "400") {
      reload ? cy.reload() : "";
      cy.wait(requestName);
    }
  });
});

Cypress.Commands.add("generateReturnLabel", () => {
  cy.get(orderEditPage.loader).should("not.exist");
  cy.intercept("POST", `api/orders/**/generate_return_labels/`).as(
    `postReturnLabel`
  );
  cy.get(orderEditPage.labelActionsDropDown).click();
  cy.xpath(orderEditPage.returnLabelBtn).click();
  cy.get(orderEditPage.returnLabelModal).should("be.visible");
  cy.xpath(orderEditPage.confirmGenerateLabelBtn).click();
  cy.waitIfError("@postReturnLabel");
  // cy.get(orderEditPage.returnLabelModal).should('not.exist')
  cy.wait(15000);
  cy.get("body").then(($body) => {
    if ($body.find(orderEditPage.returnLabelPdf).length == 0) {
      cy.reload();

      cy.get(orderEditPage.loader).should("not.exist");
      cy.get(orderEditPage.labelActionsDropDown).click();
      cy.xpath(orderEditPage.returnLabelBtn).click();
      cy.get(orderEditPage.returnLabelModal).should("be.visible");
      cy.xpath(orderEditPage.confirmGenerateLabelBtn).click();
      cy.waitIfError("@postReturnLabel");
    }
  });
  cy.get(orderEditPage.returnLabelPdf).should("be.visible");
});

Cypress.Commands.add("search", (locator, name) => {
  const formattedName = name
    //.replace(/\(/, '%28')
    //.replace(/\)/g, '%29')
    .replace(/\+/g, "%2B")
    .replace(/\@/g, "%40")
    .replace(/\s/g, "+");

  cy.intercept("GET", `*search=${formattedName}*`).as(`getSearch${name}`);
  locator ? cy.get(locator).clear().type(name) : "";
  cy.waitIfError(`@getSearch${name}`);
  cy.get("#spinners").should("not.exist"); // load animation
});



//Create order on staging env

Cypress.Commands.add(
  "stagingLogin",
  (username, password, successConfirm = true) => {
    const baseUrl = "httpsin";

    cy.intercept("POST", "auth/token/").as("auth");

    cy.visit("hin");

    cy.window().then((win) => {
      if (win.location.href != baseUrl) {
        cy.xpath(basePage.accountLogOut).click();
      }
    });

    cy.get(signInPage.emailField).type(
      
    );
    cy.get(signInPage.passwordField).type("!");
    cy.get(signInPage.loginButton).click();
  }
);

let orderId;
let pound;
let length;
let width;
let height;
export const companyName = uniqueName('Company')
export const firstName = uniqueName('FirstName')
export const lastName = uniqueName('LastName')

Cypress.Commands.add("createCustomOrder", (shipment, options) => {
  cy.get(basePage.fulfillmentNavigationBtn).click();
  cy.wait("@getOrders").its("response.statusCode").should("eq", 200);
  cy.wait("@users").its("response.statusCode").should("eq", 200);
  cy.wait("@variants").its("response.statusCode").should("eq", 200);
  cy.intercept("PUT", " /api/orders/*").as("orders");
  cy.get(openOrderPage.rowPerPageBtn).first().click();
  cy.get(openOrderPage.getRowPerPageByAmount("100")).first().click();
  cy.get(openOrderPage.openOrdersTitle)
    .should("be.visible")
    .and("have.text", "Open Orders", { timeout: 20000 });
  cy.xpath(openOrderPage.addCustomShipment).click();
  cy.xpath(openOrderPage.addShipmentWindowTitle, { timeout: 20000 })
    .should("exist")
    .and("have.text", "Custom Order Shipment");
  if (shipment.childOrg) {
    cy.get(openOrderPage.childOrgDropdown).click()
    cy.get(openOrderPage.childOrgList).contains(shipment.childOrg).click()
    cy.wait(2000)
    cy.wait('@variants').its("response.statusCode").should("eq", 200);
  }
  if (shipment.childOrg && shipment.childWH) {
    cy.get(openOrderPage.childOrgDropdown).click()
    cy.get(openOrderPage.childOrgList).contains(shipment.childOrg).click()
    cy.wait(2000)
    cy.wait('@variants').its("response.statusCode").should("eq", 200);
    cy.get(openOrderPage.selectWarehouseFromDropdown).click()
    cy.get(openOrderPage.warehouseList).contains(shipment.childWH).click();
    cy.get(openOrderPage.destinationCompanyInput, { timeout: 20000 }).clear().type(companyName);
    cy.get(openOrderPage.firstNameInput).last().type(firstName)
    cy.get(openOrderPage.lastNameInput).eq(1).type(lastName)
    cy.get(openOrderPage.emailInput).eq(1).type('example123@gmail.com');
    cy.get(openOrderPage.phoneInput).eq(1).type("2345678900");
    cy.get(openOrderPage.businessAddressInput).eq(1).type(shipment.address);
    cy.get(openOrderPage.selectBusinessAdress).click();
    cy.get(openOrderPage.validateButton).click();
    cy.get(openOrderPage.addressCheckImg, { timeout: 20000 }).should("exist");
  }
  if (shipment.warehouse) {
    if (options.overrideAddress) {
      cy.get(openOrderPage.selectWarehouseFromDropdown).click()
      cy.get('.WarehouseDropdown p').contains(shipment.warehouse).click();
      cy.xpath(openOrderPage.getCheckboxByName("Force override address")).check(
        { force: true }
      );
      cy.get(openOrderPage.businessAddressInput).eq(1).type("ывафыаф")
      cy.get(openOrderPage.destinationCompanyInput, { timeout: 20000 }).clear().type(companyName);
      cy.get(openOrderPage.firstNameInput).last().type(firstName)
      cy.get(openOrderPage.lastNameInput).eq(1).type(lastName)
      cy.get(openOrderPage.phoneInput).eq(1).type("2345678900");
      cy.get(openOrderPage.emailInput).eq(1).type(shipment.email);
      cy.get(openOrderPage.cityInput).eq(1).clear().type("Mexico D.F");
      cy.get(openOrderPage.stateInput).eq(1).clear().type("CDMX");
      cy.get(openOrderPage.countryInput).eq(1).clear().type("MX");
      cy.get(openOrderPage.zipCodeInput).eq(1).clear().type("006600");
      cy.get(openOrderPage.validateButton)
        .should("be.visible", { timeout: 20000 })
        .and("not.be.disabled")
        .click();
      cy.get(openOrderPage.validateLoader).should("be.visible");
      cy.get(openOrderPage.invalidAddressImg, { timeout: 20000 }).should("be.visible");
    } else {
      cy.get(openOrderPage.selectWarehouseFromDropdown).click()
      cy.get('.WarehouseDropdown p').contains(shipment.warehouse).click();
      cy.get(openOrderPage.destinationCompanyInput, { timeout: 20000 }).clear().type(companyName);
      cy.get(openOrderPage.firstNameInput).last().type(firstName)
      cy.get(openOrderPage.lastNameInput).eq(1).type(lastName)
      cy.get(openOrderPage.emailInput).eq(1).type('example123@gmail.com');
      if (shipment.phone) {
        cy.get(openOrderPage.phoneInput).eq(1).clear().type(shipment.phone);
      } else cy.get(openOrderPage.phoneInput).eq(1).clear().type("2345678900");
      cy.get(openOrderPage.businessAddressInput).eq(1).type(shipment.address);
      cy.get(openOrderPage.selectBusinessAdress).click();
      cy.get(openOrderPage.validateButton).click();
      cy.get(openOrderPage.addressCheckImg, { timeout: 20000 }).should("exist");
    }
  }

  if (!shipment.warehouse && !options.overrideAddress && shipment.email) {
    cy.get(openOrderPage.originContactInput).type("Test");
    cy.get(openOrderPage.destinationCompanyInput, { timeout: 20000 }).clear().type(companyName);
    cy.get(openOrderPage.emailInput).each(($el) => {
      cy.wrap($el).type(shipment.email);
    });
    cy.get(openOrderPage.phoneInput).each(($el) => {
      cy.wrap($el).type("2345678900");
    });
    cy.get(openOrderPage.businessAddressInput).each(($el) => {
      cy.wrap($el).type(shipment.address);
      cy.get(openOrderPage.selectBusinessAdress).click();
    });
    cy.get(openOrderPage.validateButton).click();
    cy.get(openOrderPage.addressCheckImg, { timeout: 20000 }).should(
      "be.visible"
    );
  }

  let index = 0;
  if (options.product) {
    for (let i = 0; i < shipment.products.length; i++) {
      cy.intercept("PUT", "/api/orders/*").as("order");
      const product = shipment.products[i];
      const product1QTY = getRandomNumber(2, 10);
      //add product
      cy.wait(2000)
      cy.get(openOrderPage.addProductButton).click();
      cy.get(openOrderPage.productInput).eq(i).click();
      cy.get(openOrderPage.searchProductField).type(product)
      cy.get(openOrderPage.productList).should('have.length', 1).click()
      cy.wait(2000)
      cy.get(openOrderPage.productQTY)
        .eq(index)
        .clear({ timeout: 20000 })
        .type(shipment.product1QTY)
        .blur();
      cy.wait(2000)
      cy.wait("@variants").its("response.statusCode").should("eq", 200);
      cy.wait("@orders").its("response.statusCode").should("eq", 200);
      index++;
    }
    if (shipment.product2QTY) {
      cy.get(openOrderPage.productQTY)
        .eq(1)
        .clear()
        .type(shipment.product2QTY)
        .blur();
    }
    cy.get(openOrderPage.removeProductBtn)
      .should("exist")
      .and("have.css", "color", "rgb(255, 255, 255)")
      .and("have.length", shipment.products.length);
  }

  if (shipment.note) {
    cy.get(openOrderPage.orderNotes).type(shipment.note, { delay: 0 })
  }

  if (options.package && shipment.package == "Custom Package") {
    //Add package and input package dimensions
    const dimension = ["length", "width", "height"];
    cy.get(openOrderPage.packageDropdown).select("Custom Package", { timeout: 30000 });
    for (const name of dimension) {
      cy.get(openOrderPage.getInputById(name)).should("not.be.disabled");
    }
    cy.get(openOrderPage.poundsInput).should("not.be.disabled");
    cy.get(openOrderPage.lengthİnput)
      .clear()
      .type(shipment.dimension)
      .should("have.value", shipment.dimension);
    cy.get(openOrderPage.loader).should("not.exist");
    cy.wait(1000);
    cy.get(openOrderPage.widthInput)
      .clear()
      .type(shipment.dimension)
      .should("have.value", shipment.dimension)
      .blur();
    cy.get(openOrderPage.loader).should("not.exist");
    cy.wait(1000);
    cy.get(openOrderPage.heightInput)
      .clear()
      .type(shipment.dimension)
      .should("have.value", shipment.dimension)
      .blur();
    cy.get(openOrderPage.loader).should("not.exist");
    cy.wait(1000);
    cy.get(openOrderPage.poundsInput)
      .clear()
      .type(shipment.customWeight)
      .blur();
  } else if (options.package && shipment.package) {
    const dimensions = ["length", "width", "height"];
    cy.get(openOrderPage.packageDropdown).select(shipment.package, { timeout: 20000 });
    for (const name of dimensions) {
      cy.get(openOrderPage.getInputById(name))
        .should("not.be.enabled")
        .invoke("val")
        .should("not.be.empty");
    }
  }

  if (!options.product && options.package) {
    //package wieght
    cy.get(openOrderPage.poundsInput)
      .clear()
      .type("5")
      .should("have.value", "5")
      .blur();
    cy.get(openOrderPage.loader).should("not.exist");
  }

  if (options.shopRate) {
    if (shipment.weight) {
      cy.get(openOrderPage.poundsInput).clear().type(shipment.weight).blur();
      cy.get(openOrderPage.poundsInput).invoke('val').then(($el) => {
        pound.push($el)
      })
    }
    if (shipment.declaredValue) {
      cy.get(openOrderPage.declValueInput)
        .clear()
        .type(shipment.declaredValue)
        .should("have.value", shipment.declaredValue)
        .blur();
    }
    cy.wait(2000)
    cy.get(openOrderPage.shopRatebtn)
      .should("exist", { timeout: 20000 })
      .click();
    cy.get(openOrderPage.shopRateSuccessMesage, { timeout: 30000 })
      .should("be.visible", { timeout: 30000 })
      .and("have.text", "Successfully recalculated shipping.", {
        timeout: 20000,
      });
    if (shipment.carrier) {
      cy.xpath(openOrderPage.getCarrierByImage(shipment.carrier)).click()
      cy.get(openOrderPage.carrierService).should('be.visible')
      if (shipment.carrier == 'USPS.png') {
        cy.get(openOrderPage.carrierService).click()
        cy.xpath(openOrderPage.getTitleByName('USPS GroundAdvantage (USPS)')).eq(0).click()
      }
    }
    cy.get(openOrderPage.poundsInput).invoke('val').then(($el) => {
      pound = Number($el)
      cy.log(pound, 'pound')
    })
    cy.get(openOrderPage.lengthİnput).invoke('val').then(($el) => {
      length = parseInt($el)
      cy.log(length, 'length')
    })
    cy.get(openOrderPage.widthInput).invoke('val').then(($el) => {
      width = parseInt($el)
      cy.log(width, 'width')
    })

    cy.get(openOrderPage.heightInput).invoke('val').then(($el) => {
      height = parseInt($el)
      cy.log(height, 'height')
    })
    cy.wait(2000)
    cy.xpath(openOrderPage.saveBtn).click();
    if (shipment.childOrg) {
      cy.get(openOrderPage.orderIdMessage)
        .contains("created", { timeout: 30000 })
        .then((elem) => {
          orderId = elem.text().match(/SB-\d*/)[0];
          cy.log(orderId)
          cy.xpath(openOrderPage.getOrderByOrderId(orderId), {
            timeout: 50000,
          }).should("exist", { timeout: 30000 });
        })
    } else {
      cy.get(openOrderPage.orderIdMessage)
        .contains("created", { timeout: 30000 })
        .then((elem) => {
          orderId = elem.text().match(/SB-\d*/)[0];
          cy.log(orderId);
          cy.xpath(openOrderPage.getOrderByOrderId(orderId), {
            timeout: 50000,
          }).should("exist", { timeout: 30000 });
        });
    }
  }
});

Cypress.Commands.add("checkAlwaysRequireConfirmationCheckbox", (email) => {
  cy.fixture("user_test_data").its("testUser3plOwnerOrders").as("testOrders").then((testOrders) => {
    cy.loginAsAdminOnStaging();
    cy.get(organizationSettingsAdminPage.organizationsField).click();
    cy.get(organizationSettingsAdminPage.organizationsSearchField).type(email);
    cy.get(organizationSettingsAdminPage.organizationsSearchButton).click();
    cy.get(organizationSettingsAdminPage.organizationsId).first().click();
    cy.get(organizationSettingsAdminPage.alwaysRequireConfirmationCheckbox)
      .check()
      .should("be.checked");
    cy.get(organizationSettingsAdminPage.saveBtn).click();
    cy.get(organizationSettingsAdminPage.logoutBtn).click();
    cy.clearCookies();
    cy.visit('/');
    cy.get(signInPage.emailField).type(testOrders.orders3plOwnerEmail);
    cy.get(signInPage.passwordField).type(testOrders.orders3plOwnerPassword);
    cy.get(signInPage.loginButton).click();
  });
});

Cypress.Commands.add("uncheckAlwaysRequireConfirmationCheckbox", (email, child) => {
  cy.fixture("user_test_data").its("testUser3plOwnerOrders").as("testOrders").then((testOrders) => {
    cy.loginAsAdminOnStaging();
    cy.get(organizationSettingsAdminPage.organizationsField).click();
    cy.get(organizationSettingsAdminPage.organizationsSearchField).type(email);
    cy.get(organizationSettingsAdminPage.organizationsSearchButton).click();
    cy.get(organizationSettingsAdminPage.organizationsId).first().click();
    cy.get(organizationSettingsAdminPage.alwaysRequireConfirmationCheckbox)
      .uncheck()
      .should("not.be.checked");
    cy.get(organizationSettingsAdminPage.saveBtn).click();
    cy.get(organizationSettingsAdminPage.logoutBtn).click();
    cy.clearCookies();
    cy.visit('/');
    if (child.email && child.password) {
      cy.get(signInPage.emailField).type(child.email);
      cy.get(signInPage.passwordField).type(child.password);
      cy.get(signInPage.loginButton).click();
    } else {
      cy.get(signInPage.emailField).type(testOrders.orders3plOwnerEmail);
      cy.get(signInPage.passwordField).type(testOrders.orders3plOwnerPassword);
      cy.get(signInPage.loginButton).click();
    }
  });
});

Cypress.Commands.add("loginWithDifferentUser", (Email, Password) => {
  cy.get(basePage.accountSettingsDropdown).click()
  cy.get(basePage.accountSettingsUsersList).contains('Login with different user').click()
  cy.get(signInPage.emailField).type(Email)
  cy.get(signInPage.passwordField).type(Password)
  cy.get(signInPage.loginButton).click()
})

Cypress.Commands.add("chooseDifferentUser", (User, Name) => {
  cy.get(basePage.accountSettingsDropdown).click()
  cy.get(basePage.accountSettingsUsersList).contains(User).click()
  cy.get(basePage.accountSettingsDropdown).invoke('text').should('contain', Name)
})

Cypress.Commands.add("selectOrderStatus", (Number, Status) => {
  cy.loginAsAdminOnStaging()
  cy.get(organizationSettingsAdminPage.orderBatchsField).click()
  cy.xpath(organizationSettingsAdminPage.getIdByBatchNumber(Number)).eq(0).click()
  cy.get(organizationSettingsAdminPage.selectStatusDropdown).select(Status)
  cy.get(organizationSettingsAdminPage.saveBtn).click()
  cy.get(organizationSettingsAdminPage.successMessage).should('be.visible')
  cy.get(organizationSettingsAdminPage.logoutBtn).click()
})

Cypress.Commands.add("checkIncludePackingSlipsCheckbox", (User) => {
  cy.loginAsAdminOnStaging()
  cy.get(organizationSettingsAdminPage.organizationsField).click()
  cy.get(organizationSettingsAdminPage.organizationsSearchField).type(User)
  cy.get(organizationSettingsAdminPage.organizationsSearchButton).click()
  cy.get(organizationSettingsAdminPage.organizationsId).click()
  cy.get(organizationSettingsAdminPage.includePackingSlipsCheckbox).check()
  cy.get(organizationSettingsAdminPage.logoUrlField).clear()
    .type('https://global-uploads.webflow.com/612fd158136ca6aeb62a8558/61b14e07072c2548cd0e7b70_Worlwide.svg')
  cy.get(organizationSettingsAdminPage.saveAndContinueBtn).click()
  cy.get(organizationSettingsAdminPage.successMessage).should('be.visible')
  cy.get(organizationSettingsAdminPage.logoutBtn).click()
})

Cypress.Commands.add("editStock", (randomValue) => {

  const inputs =
    [
      inventoryManagementPage.productInventory.lotField,
      inventoryManagementPage.productInventory.vendorField
    ]

  // Expand a variant > Expand a warehouse
  for (const input of inputs) {
    cy.get(input)
      .should('be.visible')
      .and('not.be.disabled')
  }

  // Click on "Add Location" button
  cy.get(inventoryManagementPage.productInventory.addLocationBtn).click()
  for (const input of inputs) {
    cy.get(input)
      .should('be.visible')
  }

  // Click on "Location" dropdown > Select a location (e.g. location A)
  cy.get(inventoryManagementPage.productInventory.locationField)
    .find('span')
    .contains('Location')
    .click()
  cy.get(inventoryManagementPage.productInventory.locationList).contains('A1').click()
  cy.get(inventoryManagementPage.productInventory.locationField)
    .contains('A1')
    .should('exist')

  //Edit "Vendor ID",Lot ID,QTY fields with valid data (any characters)
  for (const input of inputs) {
    cy.get(input)
      .last()
      .type(randomValue)
  }
  cy.get(inventoryManagementPage.productInventory.qtyField).last().type('5')

})

Cypress.Commands.add("checkAdvManagement", (User) => {
  cy.loginAsAdminOnStaging()
  cy.get(organizationSettingsAdminPage.organizationsField).click()
  cy.get(organizationSettingsAdminPage.organizationsSearchField).type(User)
  cy.get(organizationSettingsAdminPage.organizationsSearchButton).click()
  cy.get(organizationSettingsAdminPage.organizationsId).first().click()
  cy.get(organizationSettingsAdminPage.advManagementCheckbox).check().should('be.checked')
  cy.get(organizationSettingsAdminPage.saveAndContinueBtn).click()
  cy.get(organizationSettingsAdminPage.successMessage).should('be.visible')
  cy.get(organizationSettingsAdminPage.logoutBtn).click()

})

Cypress.Commands.add('checkUserManagementfieldsEditable', () => {
  cy.get(userAccessPage.tableFirstNameField).should('not.have.attr', 'disabled');
  cy.get(userAccessPage.tableLastNameField).should('not.have.attr', 'disabled');
  cy.get(userAccessPage.tableEmailField).should('not.have.attr', 'disabled');
  cy.get(userAccessPage.tableCompanyField).should('have.attr', 'disabled');
  cy.get(userAccessPage.accessTypeField1).first().should('not.have.attr', 'disabled');
  cy.get(userAccessPage.accessTypeField2).eq(1).should('not.have.attr', 'disabled');
  cy.get(userAccessPage.isRecievesBilingEmailField).should('not.have.attr', 'disabled');
  cy.get(userAccessPage.isActiveField).should('not.have.attr', 'disabled');
});

Cypress.Commands.add('checkUserManagementfieldsUneditable', () => {
  cy.get(userAccessPage.tableFirstNameField).should('not.exist');
  cy.get(userAccessPage.tableLastNameField).should('not.exist');
  cy.get(userAccessPage.tableEmailField).should('not.exist');
  cy.get(userAccessPage.tableCompanyField).should('not.exist');
  cy.get(userAccessPage.accessTypeField1).should('not.exist');
  cy.get(userAccessPage.isRecievesBilingEmailField).should('not.exist');
  cy.get(userAccessPage.isActiveField).should('not.exist');
});


Cypress.Commands.add("createInboundShipment", (status, options) => {
  navigateToFreightShipmentsPage()
  cy.get(freightShipmentsPage.actionDropdown).click()
  cy.xpath(freightShipmentsPage.createShipmentBtn).click()
  cy.xpath(freightShipmentsPage.createShipmentWindowTitle).should('exist')
  if (options.organization) {
    cy.wait(1000)
    cy.get(freightShipmentsPage.organizationField)
      .parent()
      .find('div[role="button"]')
      .click();
    cy.get(freightShipmentsPage.organizationList).contains(options.organization).click()
  }
  cy.xpath(freightShipmentsPage.selectWarehouseBtn).click()
  cy.xpath(freightShipmentsPage.getWarehouseByName(options.warehouse)).click()
  cy.xpath(freightShipmentsPage.shipmentIdField).type(options.shipmentId)
  cy.log('ShipmentId', options.shipmentId)
  cy.xpath(freightShipmentsPage.saveBtn).should('not.be.disabled')
  cy.xpath(freightShipmentsPage.inboundPalletsField).type(options.inboundPallets)
  cy.get(freightShipmentsPage.addProductBtn).click()
  cy.get(freightShipmentsPage.selectProductBtn).click()
  cy.get(freightShipmentsPage.searchProductField).eq(1).type(options.productName)
  cy.xpath(freightShipmentsPage.getProductByName(options.productName)).click()
  cy.xpath(freightShipmentsPage.cartonsInboundField).clear().type(options.inboundValue)
  cy.xpath(freightShipmentsPage.unitsPerCartonsField).clear().type(options.unitsValue)
  cy.xpath(freightShipmentsPage.totalUnitsInboundField).invoke('val').then((val => {
    expect(Number(val)).to.eq(options.inboundValue * options.unitsValue)
  }))
  cy.get(freightShipmentsPage.actionsBtn).click()
  if (status === 'Draft') {
    cy.xpath(freightShipmentsPage.getActionByName('Save draft and close')).click()
    cy.xpath(freightShipmentsPage.generateBulkShipmentWindow).should('not.exist')
    cy.xpath(freightShipmentsPage.createShipmentWindowTitle).should('not.exist')
  }
  else if (status === 'Open') {
    cy.xpath(freightShipmentsPage.getActionByName('Generate Shipment')).click()
    cy.xpath(freightShipmentsPage.generateBulkShipmentWindow).should('exist')
    cy.xpath(freightShipmentsPage.cancelGenerateBulkShipment).should('be.visible')
    cy.xpath(freightShipmentsPage.confirmGenerateBulkShipment).should('be.visible').click()
    cy.xpath(freightShipmentsPage.generateBulkShipmentWindow).should('not.exist')
    cy.xpath(freightShipmentsPage.createShipmentWindowTitle).should('not.exist')
  }
})

