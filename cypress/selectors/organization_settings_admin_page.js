export const organizationSettingsAdminPage = {

    alwaysRequireConfirmationCheckbox: '#id_always_require_confirmation',
    saveAndContinueBtn: '[name="_continue"]',
    successMessage: '.success',
    includePackingSlipsCheckbox: '#id_include_packing_slips',
    logoUrlField: '#id_logo_url',
    logoutBtn: '[href="/admin/logout/"]',
    organizationsField: 'th a[href="/admin/rest_api/organization/"]',
    organizationsSearchField: '#searchbar',
    organizationsSearchButton: 'input[value=Search]',
    trackingStatusSelect: '#id_tracking_status',
    delayStatusSelect: '#id_shipping_delay_status',
    organizationsId: '.field-id a',
    subscriptionField: 'a[href="/admin/billing/subscription/87/change/"]',
    newSubscriptionField: 'a[href="/admin/billing/subscription/103/change/"]',
    changeSubscriptionPlanField: '#id_plan',
    labelsfield: "th [href='/admin/rest_api/label/']",
    labelsTtitle: '#content h1',
    saveBtn: "input[name='_save']",
    orderBatchsField: '[scope="row"] a[href="/admin/rest_api/orderbatch/"]',
    selectStatusDropdown: "#id_status",
    termsOfTrade: '#id_terms_of_trade',
    advManagementCheckbox: '#id_enable_wh_adv_management',
    ltlShipmentsCheckbox:'#id_enable_ltl_shipments',
    grapevineApiKey:'#id_grapevine_api_key',
    deleteBtn:'.deletelink-box',
    yesImSureBtn:'input[type="submit"]',
    productField:'[href="/admin/rest_api/product/"]',
    boxsField:'th [href="/admin/rest_api/box/"]',
    baseUsersField:'[href="/admin/rest_api/baseuser/"]',
    actionDropdown:'[name="action"]',
    goBtn:'button[type="submit"]',
    baseUsersSearchBtn:'input[value="Search"]',
    variantsField:'[scope="row"] [href="/admin/rest_api/variant/"]',

    getLabelByTrackNumber: function (trackNumber) {
        return `//*[@class="field-__str__"]//*[contains(text(),"${trackNumber}")]`
    },

    getIdByBatchNumber: function (Number) {
        return `//td[@class="field-batch_number" and text()="${Number}"]/../th[@class="field-id"]/a`
    }
}
