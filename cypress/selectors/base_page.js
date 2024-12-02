export const basePage = {
    logo: '[data-cy="navbar-logo"]',
    accountLogOut: '//span[text()="LOGOUT"]',
    setupGuideBtn: 'span.MuiTouchRipple-root',
    addContactInfoBtn: '.MuiGrid-root:nth-of-type(3)>div:nth-of-type(3)',
    enterCompanyInfoBtn: '.MuiGrid-root:nth-of-type(3)>div:nth-of-type(4)',
    carrierSetupBtn: '.MuiGrid-root:nth-of-type(3)>div:nth-of-type(5)',
    shippingPackSetup: '.MuiGrid-root:nth-of-type(3)>div:nth-of-type(7)',
    termsConditionsLink: 'a[href*="Terms_of_Use"]',
    privacyPolicyLink: 'a[href*="Privacy_Policy"]',
    footer: '.footer',


    storefrontNavigationBtn: 'a[href="/storefront"]',
    generalOverviewNavigationBtn: '//div[contains(text(),"General Overview")]',
    storefrontOverviewnavigationBtn: '[href="/storefront/overview"]',
    shippingOverviewNavigationBtn: 'a[href="/storefront/shipping-overview"]',

    fulfillmentNavigationBtn: '[href="/fulfillment"]',
    openOrdersNavigationBtn: '//*[@href="/fulfillment/open"]',
    ordersOnHoldNavigationBtn: '[href="/fulfillment/hold"]',
    fulfilledOrdersNavigationBtn: '[href="/fulfillment/fulfilled"]',

    productNavigationBtn: '//*[@href="/inventory"]//*[text()="PRODUCT"]',
    productOverviewNavigationBtn: '//*[@href="/inventory"]//*[text()="Product overview"]',
    shippingPackagesNavigationBtn: '[href="/inventory/packaging"]',
    bundlesNavigationBtn: '[href="/inventory/bundles"]',

    distributionCenterNavigationBtn: '//*[@href="/distribution"]//*[text()="DISTRIBUTION CENTER"]',
    warehouseManagement: '//*[@href="/distribution/warehouse"]//*[text()="Warehouse management"]',
    freightShipmentsNavigationBtn: '[href="/distribution/freight-shipments"]',
    inventoryManagementNavigationBtn:'a[href="/distribution/inventory"]',
    printCenterNavigationBtn:'a[href="/distribution/print-center"]',

    _3plManagementNavigationBtn: '//*[@href="/three-pl-manager"]//*[text()="3PL MANAGEMENT"]',
    my3plCustomersNavigationBtn: '//*[@href="/three-pl-manager/customer"]//*[text()="My 3PL Customers"]',
    settingsNavigationBtn: '//*[@href="/settings"]//*[text()="SETTINGS"]',
    userAccessNavigationBtn: '[href="/settings/user-access"]',
    companyNavigationBtn: '[href="/settings/company"]',
    billingNavigationBtn: '[href="/settings/billing"]',
    subscriptionNavigationBtn:'a[href="/settings/subscription"]',
    integrationsNavigationBtn:'a[href="/settings/integrations/quickbooks"]',
    accountSettingsDropdown:'[data-cy="navbar-settings-dropdown"]',
    accountSettingsUsersList:'[role="menu"] div'

}