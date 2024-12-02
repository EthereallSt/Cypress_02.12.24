
import { shippingOverviewPage, carrierCards } from "../../selectors/shipping_overview_page";
import { basePage } from "../../selectors/base_page";
import { storefrontOverviewPage } from "../../selectors/storefront_overview_page"
import { warehouseManagementPage, navigateToWarehouseManagementPage, createUniqWarehouse, deleteWarehouse, name } from "../../selectors/warehouse_management_page"
import { productOverviewPage } from "../../selectors/product_overview_page";
import { freightShipmentsPage, navigateToFreightShipmentsPage, checkCreatedInboundOnpage, deleteOutbound, dimensionFields } from "../../selectors/freight_shipments_page";
import { shippingPackagesPage } from "../../selectors/shipping_packages_page";
import { bundlePage, searchBundle } from "../../selectors/bundles_page";
import { batchNumber, firstName, orderId, totalPaymentFee, shiptId } from '../../support/commands'
import { my3plCustomersPage } from "../../selectors/my_3pl_customers_page";
import { accountSettingsPage, changePassword, navigateToSettingsPage } from "../../selectors/account_setting_page";
import { fulfilledOrdersPage } from "../../selectors/fulfilled_orders_page";
import { openOrderPage } from "../../selectors/open_order_page";
import { inventoryManagementPage, navigateToInventoryManagementPage } from "../../selectors/inventory_management_page";
import { orderEditPage } from "../../selectors/order_edit_page";
import { orderOnHoldPage } from '../../selectors/orders_on_hold_page';
import { userAccessPage, managementTable, accessTypeList } from "../../selectors/user_access_page";
import {
    createIbsWithApi1,
    createOrderWithApi,
    createProductWithApi,
    getCurrentFormattedDate,
    ids,
    login,
    uniqueName,
    uniqueValue
  } from "../../support/util"
import { billingSettingPage } from '../../selectors/billing_setting_page'


describe("Smoke test for 3PL Merchant", () => {

    beforeEach('', () => {
        cy.clearLocalStorage();
        cy.window().then((win) => {
            win.sessionStorage.clear();
        });
        cy.clearCookies();

        // Cypress.on("uncaught:exception", () => {
        //     return false;
        // });
        cy.intercept("GET", "/api/v2/order/*").as("getOrders");
        cy.intercept("GET", "/api/users/*").as("users");
        cy.intercept("GET", `/api/variants/*`).as("variants");
        cy.intercept('GET', '/api/order_batches/*').as('batches');
        cy.intercept('GET', '/api/products/*').as('getProducts');
  })

    function temporaryLogin(email, password) {
        const temporaryUrl = 'httpx.com'
        cy.visit(temporaryUrl)
        cy.get('[data-cy="username"]').type(email)
        cy.get('[data-cy="password"]').type(password)
        cy.get('[type="submit"]').click()
    }


    const accountId = uniqueValue("123456789");
    const outboundShipments = freightShipmentsPage.outboundShipments;
    const lastName = uniqueName("Name");
    const FirstName = uniqueName("Name");
    const email = uniqueName("email") + "@gmail.com";
    const phone = uniqueValue("1234");
    const street = "35005 Jason Rd";
    const accountName = uniqueName("Account");
    const securityCode = 1;
    const newPassword = uniqueValue('Password');
    const shipmentNumber = uniqueValue("Shipment");
    const shipmentId = 'Shipment' + Cypress._.random(10, 1e3);
    const editedStock = Cypress._.random(10,50)
    const inboundPallets = Cypress._.random(10, 10)
    const inboundValue = Cypress._.random(10, 10)
    const unitsValue = Cypress._.random(10, 10)
    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    const product1QTY = getRandomNumber(1, 5);
    const bulkConfiguration = productOverviewPage.bulkConfiguration
    const currentDate = getCurrentFormattedDate();
    const companyName = uniqueName("companyName");
    const contactName = uniqueName("contactName");
    const paletName = uniqueName("Palet");
    const requestUrl = 'ht';
    const stockcount = Cypress._.random(10, 20);





    /*PRECONDITIONS:
    User is logged into  as Merchant
    User has at least one product
    User has at least one package
    Have shipping packages on the Shipping Packages page
    At least one payment method has been added
    Domestic Open order with the preferred carrier has been fulfilled 
    User has logged as Merchant (child org)
    Merchant org has Parent org
    Parent organization has given acces to several of his warehouses to Merchant(Child) org
    */

    //+
    it('Verify that Merchant/Child org is able to log into ', () => {
        //Login with valid user
        login('stm', '!')

        //1 Navigate to the "Shipping Overview" page
        cy.url().should('include', 'storefront')

        // ? Should opened shipping-overview for merchant, but open storefront. Need clarificate req.
        // Open "SHIPPING OVERVIEW" page
        cy.get(basePage.shippingOverviewNavigationBtn).click();
        cy.get(shippingOverviewPage.title)
            .should('be.visible')
            .and('have.text', 'Shipping Overview')

        // cy.contains('body', '3plmerchantOrg').should('exist');

    })

    //blocked by problem with with CloudFlare
    it.skip('Verify that Merchant is able to add a storefront and all corresponding data is synced from storefront', () => {

        //preconditions: Be logged into Shopify with test account
        // cy.intercept('POST', '/api/storefront_configs/get_shopify_link/').as('getShopifyLink')

        //Login with valid user
        login('st', '!')
        cy.url().should('include', '/storefront')

        //Open storefront overview page
        cy.get(basePage.storefrontOverviewnavigationBtn).click()

        //Add storefront
        cy.get(shippingOverviewPage.addShippingCarrierBtn).click()
        cy.get(storefrontOverviewPage.addShopifyBtn).click()
        cy.get(storefrontOverviewPage.yourShopField).type('soaptest1')


        //Problem with CloudFlare
        cy.get(storefrontOverviewPage.goNowShopifyBtn).click()

        // cy.wait('@getShopifyLink').then(xhr => {
        //     let body = xhr.response.body
        //     console.log(body.url)

        //     cy.window().then(win => {
        //         win.location.href = body.url;
        //     })
        //     cy.get('.ui-stack-item:nth-of-type(2) p').then(elem => {
        //         const rid = elem.text().replace(/(\r\n|\n|\r)/gm, "").replace('Request ID: ', "")
        //         console.log(elem.text())               
        //         console.log(rid)               
        //         cy.window().then(win => {
        //             win.location.href = 'https://accounts.shopify.com/lookup?rid=' + rid;
        //         })
        //     })
        // })

    })


    //+
    it('Verify that Merchant is able to create an Open order only for own org', () => {

        //User is logged into  as Merchant
        //User has at least one product
        //User has at least one package

        //Login with valid user
        login('', '!')

        //2-9
        cy.createCustomOrder(
            {
                warehouse: "Auto-Select Warehouse",
                address: "35005 Bordman Rd",
                products: ["special smoke product1"],
                package: "package1",
                declaredValue: "50",
                email: "example123@gmail.com",
                product1QTY: '2',
                carrier: 'DHL.png'
            },
            { product: true, package: true, shopRate: true }
        )

    })

    //+
    it('Verify that Merchant is able to Fulfill an order', () => {

        const row = [1, 2];
        const orderId = [];

        login('', '!');

        // 1. Navigate to "Open Orders" tab
        cy.get(basePage.fulfillmentNavigationBtn).click()
        cy.url().should('include', '/fulfillment/open')
        cy.get(openOrderPage.openOrdersTitle)
            .should("be.visible")
            .and("have.text", "Open Orders", { timeout: 20000 });

        cy.createCustomOrder(
            {
                warehouse: "Auto-Select Warehouse",
                address: "35005 Bordman Rd",
                products: ["special smoke product1"],
                package: "package1",
                declaredValue: "20",
                email: "example123@gmail.com",
                product1QTY: '2',
                carrier: 'DHL.png'
            },
            { product: true, package: true, shopRate: true }
        )

        // 2. Mark a order checkbox
        cy.get(openOrderPage.ordersCheckBox).eq(0).check();
        cy.get(openOrderPage.selectedCounter)
            .eq(0)
            .should("have.css", "color", "rgb(245, 120, 14)")


        //3 Click on "Fulfill" button
        cy.get(openOrderPage.fulfillBtn).click()
        cy.get(openOrderPage.fulfillWindowTitle)
            .should("be.visible")
            .and("have.text", "Create batch");
        cy.get(openOrderPage.organizationsDialog)
            .should("have.text", "Select Organizations to create batch")
            .and("have.css", "color", "rgba(88, 88, 88, 0.6)");
        cy.get(openOrderPage.fulfillOrganizationsCell).invoke('text').should(
            "contain",
            "Stepan's Merchant for smoke"
        );
        cy.get(openOrderPage.fulfillCheckbox).should("be.checked");
        cy.get(openOrderPage.fulfillOrdersCountCell)
            .last()
            .should("have.text", 1);
        cy.xpath(openOrderPage.batchBtn).should(
            "have.css",
            "color",
            "rgb(245, 146, 49)"
        );
        cy.get(openOrderPage.fulfillCancelButton)
            .eq(0)
            .should("have.css", "color", "rgb(88, 88, 88)");

        // 4. Click on the "Batch" button
        cy.xpath(openOrderPage.batchBtn).click();
        cy.get(openOrderPage.fulfillCancelButton)
            .eq(0)
            .should("have.css", "color", "rgb(88, 88, 88)");

        // 5. Click on the "Confirm" button
        cy.xpath(openOrderPage.confirmFulfillBtn).click();

        // Verify the batch creation process
        cy.get(openOrderPage.cubeLoader).should("not.exist");
        cy.xpath(openOrderPage.getTextByName("Batch Order Details")).should("be.visible");

    })

    //+ (added new api request)
    it.only('Verify that Merchant is able Checkout labels', () => {

        // At least one payment method has been added
        // Domestic Open order with the preferred carrier has been fulfilled

        //Login with valid user
        login('sm', '!')
        cy.url().should('include', '/storefront')

        // Create custom shipment
        createOrderWithApi({
            baseUrl: requestUrl,
            warehouseId: 4390,
            username: 'stepan+3plChildmerchant2@ com',
            password: '!',
            boxId: 34170,
            organizationId: 1783,
            variant: 28579
        })
        cy.wrap(ids).then(() => {
            const orderId = ids[ids.length - 1]
            cy.log(`Created order ${orderId}`)
            cy.get(basePage.fulfillmentNavigationBtn).click()
            cy.wait('@users').its("response.statusCode").should("eq", 200);
            cy.wait('@getOrders').its("response.statusCode").should("eq", 200);
  
            cy.fulfillOrder([orderId]).then(() => {

                //1 Navigate to the "Fulfillment" >  "Fulfilled Orders" tab
                cy.get(basePage.fulfilledOrdersNavigationBtn).click();
                cy.get(fulfilledOrdersPage.fulfilledOrdersTitle).invoke('text').should('contain', 'Fulfilled Orders');
                cy.xpath(fulfilledOrdersPage.getBatchedOrderByNumberAndByStatus('Open', batchNumber)).should('exist');

                //2 Open batched order
                cy.xpath(fulfilledOrdersPage.getViewDetailByOrderNumber(batchNumber)).click();
                cy.xpath(openOrderPage.getTextByName("Batch Order Details")).should(
                    "be.visible"
                );

                //3 Click on the "Checkout Labels" button
                cy.checkoutOrder();

                //4 Click on "Close" button
                cy.get(basePage.fulfilledOrdersNavigationBtn).click();
                cy.get(fulfilledOrdersPage.individualOrdersNavigationBtn).click();
                cy.xpath(fulfilledOrdersPage.getIndividualOrderByStatusByNumber('Ready For Pick', `#${batchNumber}`)).should('be.visible');

            })
        })
    })

    //+
    it('C41 Verify that Merchant is able to create product only for own org', () => {

        //initialization test data
        const productName = uniqueName('Test Product')
        const productSku = uniqueName('TEST')


        //Login with valid user
        cy.url().should('include', '/storefront')

        //1 Navigate to "PRODUCT" section
        cy.xpath(basePage.productNavigationBtn).click()
        cy.url().should('include', '/inventory')

        //2 Click on "Add New Product" button
        cy.xpath(productOverviewPage.addNewProductBtn).click()
        cy.xpath(productOverviewPage.addNewProductWindowTitle).should('be.visible')


        //3 Fill in all required fields with valid data
        cy.get(productOverviewPage.organizationField).click()
        cy.get(productOverviewPage.organizationList).contains("Stepan's Merchant for smoke").click()
        cy.get(productOverviewPage.productNameField)
            .type(productName)
            .should("have.value", productName);
        cy.get(productOverviewPage.productSkuField)
            .type(productSku)
            .should("have.value", productSku);
        cy.xpath(productOverviewPage.addVariantBtn).click();
        cy.get(productOverviewPage.variantNameField)
            .type("S")
            .should("have.value", 'S');
        cy.get(productOverviewPage.variantLengthField)
            .type(2)
            .should("have.value", 2);
        cy.get(productOverviewPage.variantWidthField)
            .type(2)
            .should("have.value", 2);
        cy.get(productOverviewPage.variantHeightField)
            .type(2)
            .should("have.value", 2);

        //4 Click on "Save" (checkmark) button
        cy.xpath(productOverviewPage.saveNewProductBtn).click();
        cy.get(productOverviewPage.productsAsListBtn).click();
        cy.wait(1000);
        cy.xpath(productOverviewPage.getProductByName(productName)).should('be.visible');
    })

    //+ 
    it('C42 Verify that Merchant is able to create package', () => {

        //Initialization test data 
        const packageName = uniqueName('Test package(Box)')

        //Login with valid user
        login('stepan+3plChildmerchant2@ com', '  3!')

        // Open "SHIPPING OVERVIEW" page
        cy.get(basePage.shippingOverviewNavigationBtn).click();
        cy.get(shippingOverviewPage.title).should("have.text", "Shipping Overview");
        cy.url().should('include', '/storefront/shipping-overview')

        //1 Navigate to "Product" > "Shipping Packages" tab
        cy.xpath(basePage.productNavigationBtn).click()
        cy.url().should('include', '/inventory')
        cy.get(basePage.shippingPackagesNavigationBtn).click()
        cy.url().should('include', '/inventory/packaging')

        //2-4
        cy.addShippingPackage({
            organization: "Stepan's Merchant for smoke",
            packageName: packageName,
            stockcount: stockcount,
            warehouse: "Stepan's Merchant for smoke Warehouse",
            dimension: '2',
          })
        //5 Created package is displayed on "Shipping Packages" page
        cy.xpath(shippingPackagesPage.getPackagesByName(packageName)).should('be.visible');
    }) 

    //+ todo: add step for new field 'type'
    it('C315 Verify that Merchant is able to create a bundle only for own org', () => {

        //1. Login as Merchant
        //2. User has at least 1 product

        cy.intercept('GET', 'https://api-staging. com/api/order_item_expansion_templates/*').as('bundle')

        const bundleName = uniqueName('Test Bundle')
        const bundleSku = uniqueName('BUNDLESKU')

        //Login with valid user
        login('stepan+3plChildmerchant2@ com', '  3!')
        cy.url().should('include', '/storefront')

        // 1. Navigate to "Product" > "Bundles" tab
        cy.get(bundlePage.productNavigationBtn).click()
        cy.get(bundlePage.bundlesNavigationBtn).click()

        // 2. Click on "Create Bundle" button
        cy.xpath(bundlePage.creatBundleBtn).click();
        cy.xpath(bundlePage.newBundleWindowTitle)
            .should('be.visible')
            .and('have.text', 'Bundle Details');

        //2.1 Expand the "Organization" dropdown
        cy.get(productOverviewPage.organizationField).first().click()
        cy.get(productOverviewPage.organizationList).contains("Stepan's Merchant for smoke").click()
        //Only own org is displayed in the dropdown list

        // 3. Enter any text with letters / number / special characters in "Bundle Name" /"SKU" input fields
        cy.get(bundlePage.bundleNameField).type(bundleName);
        cy.get(bundlePage.bundleNameField).should('have.value', bundleName);
        cy.get(bundlePage.bundleSkuField).type(bundleSku);
        cy.get(bundlePage.bundleSkuField).should('have.value', bundleSku);

        // cy.pause();
        // 4. Click on "Add product" button 
        cy.xpath(bundlePage.addProductBtn).should('be.visible').click();

        // 5. Select any product from dropdown list 
        cy.get(bundlePage.selectProductDropDown).should('be.visible').click();
        cy.get(bundlePage.selectProduct).contains('test1').click();

        // 6.Fill in "QTY" filed with valid data 
        cy.get(bundlePage.qtyPerBundleField).type('1');
        cy.get(bundlePage.qtyPerBundleField).should('have.value', 1);

        // 7.1 Click on "Save" button in the upper right corner of modal
        cy.xpath(bundlePage.saveBtn).click();

        // 7.2 Modal is closed
        cy.xpath(bundlePage.newBundleWindowTitle).should('not.be.visible', { timeout: 5000 });
        cy.xpath(bundlePage.successMessageSelector)
            .should('exist')
            .and('be.visible');

        // 7.2 Bundle card is displayed in "Bundles" table with corresponding data 
        cy.get(bundlePage.searchBunldeField).type(bundleName);
        cy.xpath(bundlePage.getBundleByName(bundleName), { timeout: 10000 }).should('exist');
        cy.xpath(bundlePage.getBundleBySku(bundleSku)).should('exist');
    })

    //+
    it('C44 Verify that Merchant is able to create warehouse in "Distribution Center"', () => {

        //Login with valid user
        login('stepan+3plChildmerchant2@ com', '  3!');
        cy.url().should('include', '/storefront');

        //1 Navigate to "DISTRIBUTION CENTER"
        navigateToWarehouseManagementPage();

        //2 Click on "Add Warehouse" button
        cy.get(warehouseManagementPage.addWarehouseBtn).click();
        cy.xpath(warehouseManagementPage.warehouseWindowTitle)
            .should('be.visible')
            .and('have.text', 'Warehouse Details');

        //3 Fill in all required fields with valid data
        createUniqWarehouse();

        //4 Click on "Save" button
        cy.get(warehouseManagementPage.saveWarehouseBtn).eq(0).click();
        cy.xpath(warehouseManagementPage.warehouseWindowTitle).should('not.exist');
        //problem here
        // cy.reload();
        cy.xpath(warehouseManagementPage.getWarehouseByName(name)).should('be.visible');

        //Delete warehouse
        deleteWarehouse(name);
    })

    //+  
    it('Verify that Merchant is able to create "Draft" Inbound shipment with data only for own org', () => {

        login('stepan+3plChildmerchant2@ com', '  3!');
        cy.url().should('include', '/storefront');
        navigateToFreightShipmentsPage();
        
        cy.createInboundShipment('Draft', {
            warehouse: "Stepan's Merchant for smoke Warehouse",
            shipmentId: shipmentId,
            inboundPallets: inboundPallets,
            productName: 'Special smoke product1: medium',
            inboundValue: inboundValue,
            unitsValue: unitsValue
          })

        //todo: Created shipment is displayed in the table with "DRAFT" status
    })

    //+ (sometimes need clean IBS or add steps to search it)
    it('C134 Verify that Merchant is able to generate inbound shipment', () => {

        login('stepan+3plChildmerchant2@ com', '  3!');
        // Precondition : "Draft" inbound shipment is created
        createIbsWithApi1({
            organizationId: 1783, warehouseId: 4390, shipmentId: shipmentId, productId: 27886,
          })      
        
        //2 Click on created "Draft" inbound shipment in table
        navigateToFreightShipmentsPage();
        checkCreatedInboundOnpage(shipmentId);

        //3 Click on "Arrow" button to the right of "Save"
        cy.get(freightShipmentsPage.actionsBtn).click();
        cy.get(freightShipmentsPage.actionList)
            .should('have.length.gte', 1)
            .and('contain', 'Save draft and continue')
            .and('contain', 'Save draft and create new')
            .and('contain', 'Save draft and close')
            .and('contain', 'Generate Shipment');

        //4 Click on "Generate shipment" item
        cy.xpath(freightShipmentsPage.getActionByName('Generate Shipment')).click();
        cy.xpath(freightShipmentsPage.generateBulkShipmentWindow).should('be.visible');
        cy.xpath(freightShipmentsPage.confirmGenerateBulkShipment).should('be.visible');
        cy.xpath(freightShipmentsPage.cancelGenerateBulkShipment).should('be.visible');

        //5 Click on "Confirm" button
        cy.xpath(freightShipmentsPage.confirmGenerateBulkShipment).click();
        cy.xpath(freightShipmentsPage.generateBulkShipmentWindow).should('not.exist');
        cy.wait('@variants').its("response.statusCode").should("eq", 200);
        cy.xpath(freightShipmentsPage.getShipmentByIdAndStatus(shipmentId, 'OPEN')).should('be.visible');

    })
    //+
    it('C135 Verify that Merchant is able to to adjust stock for a product via inbound shipment', () => {

        cy.intercept('GET', 'https://api-staging. com/api/products/?is_active=true&is_component=false&product_listings__storefront_config__in=&organization__in=&search=SProduct1&ordering=name&limit=20&is_hidden=false').as('product');

        //Inbound shipment is created and generated (use Special smoke product1 at this case)
        //Generated IBS contains products and valid amount to receive

        login('stepan+3plChildmerchant2@ com', '  3!');

        // Navigate to the Product Overview page to get the current amount of stock
        cy.xpath(basePage.productNavigationBtn).click()
        cy.get(productOverviewPage.searchField).type('SProduct1')
        cy.wait('@product').then((req) => {
            const productStock = req.response.body.results[0].inventories[0].numberStock
            cy.log(productStock, 'productStock')
        
        // Precondition : Inbound shipment is created and generated
        createIbsWithApi1({
            status: 'Open', organizationId: 1783, warehouseId: 4390, shipmentId: shipmentId, productId: 29503,
          })

        //2 Click on created "Open" inbound shipment in table
        navigateToFreightShipmentsPage();
        checkCreatedInboundOnpage(shipmentId);

        //3 Fill in "Receiving" field in "Total Units" section with valid data
        cy.xpath(freightShipmentsPage.totalUnitsReceivingField).type(editedStock);

        //4 Click on "Save" button
        cy.xpath(freightShipmentsPage.saveBtn).should('not.be.disabled').click();
        cy.xpath(freightShipmentsPage.updateInventoryUpdateWindow).should('be.visible');
        cy.wait(1000)
        cy.xpath(freightShipmentsPage.updateInventoryTable)
            .should('contain', 'mimiproduct1: m')
            .and('contain', '0')
            .and('contain', editedStock);
        cy.xpath(freightShipmentsPage.confirmInventoryUpdateBtn).should('not.be.disabled').click()  //click ins't works

        //5 Close "Inbound Bulk Shipment" modal
        cy.get(freightShipmentsPage.closeInboundBulkBtn).should('not.be.disabled').click();
        cy.xpath(freightShipmentsPage.updateInventoryUpdateWindow).should('not.exist');

        //6 Navigate to "Inventory Management" tab > Search for delivered product
        navigateToInventoryManagementPage()
        cy.wait(1000)
        cy.get(inventoryManagementPage.searchField).type('mimiproduct1')
        cy.log(`productStock - ${productStock} editedStock - ${editedStock}`)
        cy.get(inventoryManagementPage.firstProductRow).should('have.length', 1)
            // .and('contain', productStock + editedStock);

        //7 Navigate to "Product" > "Product Overview" tab
        // cy.xpath(basePage.productNavigationBtn).should('not.be.disabled').click();
        cy.xpath(basePage.productNavigationBtn).should('not.be.disabled').click({force: true});
        cy.wait('@users').its("response.statusCode").should("eq", 200);
        cy.wait('@getProducts').its("response.statusCode").should("eq", 200);
        cy.get(productOverviewPage.pageTitle).should('be.visible');
        cy.wait(1000);
        cy.get(productOverviewPage.searchField).type('mimiproduct1');
        cy.wait('@getProducts').its("response.statusCode").should("eq", 200);
        cy.wait(4000);
        cy.get(productOverviewPage.firstProductTable).should('have.length', 1);

        //8 Open the product used in IBS
        cy.xpath(productOverviewPage.getProductByName('mimiproduct1')).click();
        cy.xpath(productOverviewPage.cardEditWindowTitle).should('be.visible');

        //9 Navigate to "Product History" tab
        cy.wait('@getProducts').its("response.statusCode").should("eq", 200);
        cy.get(productOverviewPage.productHistoryBtn).should('not.be.disabled').click({force: true});
        cy.get(productOverviewPage.productHistoryTab).eq(0)
            // .should('contain', 'm')
            .and('contain', editedStock)
            .and('contain', shipmentId)
            .and('contain', '0')
            .and('contain', currentDate)
            .and('contain', "Stepan's Merchant for smoke Warehouse");

        })
    })

    //+
    it('C136 Verify that Merchant is able to create "Draft" outbound shipment after filling up "Shipment #" field', () => {
        //1 Navigate to "Distribution Center" > "Freight Shipments" tab
        login('stepan+3plChildmerchant2@ com', '  3!');
        cy.url().should('include', '/storefront');
        navigateToFreightShipmentsPage();

        cy.createInboundShipment
            (
                'Draft',
                {
                    warehouse: "Stepan's Merchant for smoke Warehouse",
                    shipmentId: shipmentId,
                    inboundPallets: inboundPallets,
                    productName: 'TestProduct989: meduim',
                    inboundValue: inboundValue,
                    unitsValue: unitsValue
                }
            )

        checkCreatedInboundOnpage(shipmentId);

    })

    //
    it('C137 Verify that Merchant is unable to generate outbound shipment if "Ship To" and "Ship From" fields are n...', () => {

        // "Enable outbound shipments" field is enabled in admin

        //test data
        const shipmentNumber = uniqueValue("Shipment");

        //1 Navigate to "Distribution Center" > "Freight Shipments" tab
        login('stepan+3plChildmerchant2@ com', '  3!');
        cy.url().should('include', '/storefront');
        navigateToFreightShipmentsPage()

        //2 Proceed to "Outbound Shipments" sub-tab
        cy.get(outboundShipments.outboundShipmentsTab).click()
        cy.url().should('include', '/outbound-shipments')
        cy.get(outboundShipments.title)
            .should('be.visible')
            .and('have.text', 'Carton/Freight Shipments')

        //3 Click on "Create Outbound Shipment" button
        cy.get(outboundShipments.actionDropdown).click();
        cy.get(outboundShipments.createOutbondBtn).click();
        cy.contains('Outbound Shipment Details').should('exist');

        //4 Fill in the "Shipment #" field without specifying an existing shipment name
        cy.get(outboundShipments.shipmentNumberField).eq(1).type(shipmentNumber);

        // Click on main "Save" button
        cy.xpath(freightShipmentsPage.saveBtn).last().click()
        // cy.get(outboundShipments.successMessage)
        //     // .should('be.visible')
        //     // .and('have.text', 'Shipment has been saved.');

        // 5 Click on "Close" (white cross) button
        cy.get(outboundShipments.shipmentsDropdown).last().click();
        cy.get(outboundShipments.shipmnetActions).eq(5).contains('Save draft and close').click();

        // "Outbound Shipment Details" modal is closed
        cy.contains('Outbound Shipment Details').should('not.exist');

        // "Draft" status is assigned to outbound shipment
        cy.xpath(freightShipmentsPage.getShipmentById(shipmentNumber))
            .parents('tr')
            .within(() => {
                cy.get('span.MuiChip-label').contains('Draft').should('be.visible');
            });

        //Delete created outbound
        deleteOutbound(shipmentNumber);
    })

    //
    it('C138 Verify that Merchant is able to generate outbound shipment after filling up "Ship To" and "Ship From" fields with valid data', () => {




        const shipmentNumber = uniqueValue("Shipment");

        //1 Navigate to "Distribution Center" > "Freight Shipments" tab
        login('stepan+3plChildmerchant2@ com', '  3!');
        cy.url().should('include', '/storefront');
        navigateToFreightShipmentsPage()

        //2 Proceed to "Outbound Shipments" sub-tab
        cy.get(outboundShipments.outboundShipmentsTab).click()
        cy.url().should('include', '/outbound-shipments')
        cy.get(outboundShipments.title)
            .should('be.visible')
            .and('have.text', 'Carton/Freight Shipments')

        //3 Click on "Create Outbound Shipment" button
        cy.get(outboundShipments.actionDropdown).click()
        cy.get(outboundShipments.createOutbondBtn).click()
        cy.contains('Outbound Shipment Details').should('exist')

        //4 Fill in all required fields in "Shipment info" section
        cy.get(outboundShipments.shipmentNumberField).eq(1).type(shipmentNumber)
        cy.get(outboundShipments.shipFromDropdown).eq(1).click()
        cy.get(outboundShipments.list).contains('Main Parent warehouse').click()
        cy.xpath(outboundShipments.businessAddressField).eq(3).type('444 W Lake St')
        cy.get(outboundShipments.list).eq(0).click()

        //5 Fill in all required fields in "Shipment Details" section
        cy.get(outboundShipments.declaredValueField).eq(1).type('20')

        //6 Expand "Action" dropdown
        cy.get(outboundShipments.shipmentsDropdown).last().click()
        cy.get(outboundShipments.shipmnetActions).eq(5).contains('Save draft and close').click()
        cy.wait(1000)

        //7 Click on "Save draft and close" button
        cy.contains('Outbound Shipment Details').should('not.exist')
        cy.xpath(freightShipmentsPage.getShipmentById(shipmentNumber)).should('be.visible')

        //Delete created outbound
        deleteOutbound(shipmentNumber)
    })


    //+
    it('C141 Verify that Merchant is able to set / change "Company" and "Account" info in "Settings" section', () => {

        login('stepan+3plChildmerchant2@ com', '  3!');
        cy.url().should('include', '/storefront');

        // Navigate to "Settings" tab
        cy.url().should('include', '/storefront');
        navigateToSettingsPage();

        //2 Modify data in "First Name" field
        cy.get(accountSettingsPage.firstNameField)
            .clear()
            .type(firstName)
            .invoke('val')
            .should('eq', firstName)
        cy.log(`First name is ${firstName}`)

        //3-4 Modify data in "Last Name" field and 4 Click on "Save" button
        cy.get(accountSettingsPage.lastNameField)
            .clear()
            .type(lastName)
            .invoke('val')
            .should('eq', lastName)
        cy.log(`Last name is ${lastName}`)
        cy.xpath(accountSettingsPage.settingsSaveBtn)
            .should('not.be.disabled')
            .click()
        cy.wait('@users')
        cy.get(accountSettingsPage.successSaveMessage)
            .should('be.visible')
            .and('have.text', 'Successfully updated your user information!')

        //5 Navigate to "Company" tab
        cy.get(basePage.companyNavigationBtn).click()
        cy.url().should('include', '/settings/company')
        cy.get(accountSettingsPage.settingCompanyTitle).should('have.text', 'Company Info')

        //6-7  Fill in "Company Address" field with part of valid data (e.g. 321w) and Select any valid address from the list (e.g. 321 Wythe Ave)
        cy.get(accountSettingsPage.companyAddressField).clear().type('3005')
        cy.get(accountSettingsPage.companyAddressesDropDownElement).click()

        //8 Click on "Save" button
        cy.xpath(accountSettingsPage.settingsSaveBtn)
            .should('not.be.disabled')
            .click()
        cy.wait('@users')
        cy.contains('Successfully updated your company information!')
            .should('be.visible')

        //9 Reload the page
        cy.reload()

        // Check Company info 
        cy.get(accountSettingsPage.companyAddressField).invoke('val').should('eq', '30055 Northwestern Hwy')
        cy.get(accountSettingsPage.companyCityField).invoke('val').should('eq', 'Farmington Hills')
        cy.get(accountSettingsPage.companyStateField).invoke('val').should('eq', 'MI')
        cy.get(accountSettingsPage.companyZipField).invoke('val').should('eq', '48334')

        // Check Account info
        navigateToSettingsPage()
        cy.get(accountSettingsPage.firstNameField)
            .invoke('val')
            .should('eq', firstName)
        cy.log(`First name is ${firstName}`)
        cy.get(accountSettingsPage.lastNameField)
            .invoke('val')
            .should('eq', lastName)

        // Return previous value
        cy.get(accountSettingsPage.firstNameField)
            .clear()
            .type('Bob')
            .invoke('val')
            .should('eq', 'Bob')
        cy.get(accountSettingsPage.lastNameField)
            .clear()
            .type('Smith')
            .invoke('val')
            .should('eq', 'Smith')
        cy.xpath(accountSettingsPage.settingsSaveBtn)
            .should('not.be.disabled')
            .click()
        cy.wait('@users')
        cy.get(accountSettingsPage.successSaveMessage)
            .should('be.visible')
            .and('have.text', 'Successfully updated your user information!')
        cy.get(basePage.companyNavigationBtn).click()
        cy.url().should('include', '/settings/company')
        cy.get(accountSettingsPage.settingCompanyTitle).should('have.text', 'Company Info')

        //6-7  Fill in "Company Address" field with part of valid data (e.g. 321w) and Select any valid address from the list (e.g. 321 Wythe Ave)
        cy.get(accountSettingsPage.companyAddressField).clear().type('Wisper Palms Way')
        cy.get(accountSettingsPage.companyAddressesDropDownElement).click()

        //8 Click on "Save" button
        cy.xpath(accountSettingsPage.settingsSaveBtn)
            .should('not.be.disabled')
            .click()
        cy.wait('@users')
        cy.contains('Successfully updated your company information!')
            .should('be.visible')

    })

    //+
    it('C143 Verify that data is synced between Merchant/Child and 3PL Owner/Parent orgs', () => {

        // Merchant org has Parent org
        // Parent organization has given acces to several of his warehouses to Merchant(Child) org

        //Login with valid user
        login('stepan+3plChildmerchant2@ com', '  3!');
        cy.url().should('include', '/storefront');

        // 1. Navigate to "3PL Management"  > "My 3PL Network" tab 
        cy.xpath(basePage._3plManagementNavigationBtn).click();
        cy.url().should('include', '/three-pl-manager/partner');
        cy.get(my3plCustomersPage.title)
            .should('be.visible')
            .and('have.text', '3PL Partner Account');


        // 2. Only warehouses to which was given access are displayed
        cy.get(my3plCustomersPage.page).contains('Main Parent warehouse');

    })

    //+
    it('C144 Verify that 3PL Owner is able to change password in "Account" tab', () => {

        //1 Navigate to "Settings" tab
        login('stepan+3plChildmerchant2@ com', '  3!');
        cy.url().should('include', '/storefront');
        navigateToSettingsPage()

        //2 Fill in "Old Password" field with valid data
        cy.get(accountSettingsPage.oldPasswordField).type('  3!')

        //3 Fill in "New Password" and "Confirm Password" fields with the same valid data
        cy.get(accountSettingsPage.newPasswordField).type(newPassword)
        cy.get(accountSettingsPage.confirmPasswordField).type(newPassword)
        cy.log(newPassword, 'newPassword')

        //4 Click on "Save" button
        cy.xpath(accountSettingsPage.settingsSaveBtn).click()
        cy.get(accountSettingsPage.successSaveMessage).should('be.visible').and('have.text', 'Successfully updated your user information!')

        //5 Click on "Logout" button
        cy.xpath(basePage.accountLogOut).click()
        cy.url().should('include', '/login')

        //6 Sign into the 3PL Owner account using new password
        login('stepan+3plChildmerchant2@ com', newPassword);
        cy.url().should('include', '/storefront');

        //7 Return the password
        navigateToSettingsPage()
        changePassword(newPassword, '  3!')
        cy.xpath(accountSettingsPage.settingsSaveBtn).click()
        cy.get(accountSettingsPage.successSaveMessage)
            .should('be.visible')
            .and('have.text', 'Successfully updated your user information!')
        cy.xpath(basePage.accountLogOut).click()
        cy.url().should('include', '/login')
        login('stepan+3plChildmerchant2@ com', '  3!');
        cy.url().should('include', '/storefront');
    })

    //+
    it('C145 Verify that Merchant is able to logout from account', () => {

        //Login with valid user
        login('stepan+3plChildmerchant2@ com', '  3!')

        cy.url().should('include', '/storefront')
        cy.get(shippingOverviewPage.title)
            .should('be.visible')
            .and('have.text', 'General Overview')  //General Overview??

        // cy.contains('body', '3plmerchantOrg').should('exist');

        // 12. Logout from 3PL Merchant's org
        cy.xpath(basePage.accountLogOut).click();
        cy.url().should('include', 'bx.com/login')
    })

    
 
    const checkVisibility = (selector) => {
        cy.get(selector).should('be.visible');
    };


})
