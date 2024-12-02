
export const openOrderPage = {
  openOrdersTitle: "li h1",
  fulfillmentCenterNavigationBtn: '[data-cy="navbar-fulfillment-center"]',
  ordersOnHoldNavigationBtn: '[data-cy="sidebar-flagged-orders"]',
  addCustomShipment:
    './/*[@class="btn orange-square"][text()="Custom Shipment"]',
  addShipmentWindowTitle: '//h6[normalize-space()="Custom Order Shipment"]',
  firstNameField: 'input[name="firstName"]',
  lastNameField: 'input[name="lastName"]',
  addressField: '.MuiGrid-container [role="combobox"]',
  selectAddress: "li.MuiAutocomplete-option",
  phoneField: 'input[name="phone"]',
  emailField: 'input[name="emailAddress"]',
  emailError: ".Mui-error.MuiFormHelperText-filled",
  addressesDropDownElement: 'li[data-option-index="0"]',
  validateBtn:
    '//button[@class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"]',
  validateErrorNotification:
    '#DisabledAutoHideTooltip[src*="invalid_address.png"]',
  saveBtn: '(//h6[text()="Custom Order Shipment"]//..//button)[2]',
  closeCustomShipmentWindowBtn: '(//span[@class="MuiIconButton-label"])[15]',
  carrier: '[data-cy="carrier-selector-dropdown"]',
  carriers: '.row-packaging [data-cy*="carrier-selector-"]',
  packageField: '//div[@role="presentation"][normalize-space()="Select"]',
  packagesSelect: ".css-11jt7fy-menu",
  weightLbsField: 'input[name="pounds"]',
  weightOzsField: 'input[name="ounces"]',
  lengthField: 'input[name="length"]',
  widthField: 'input[name="width"]',
  heightField: 'input[name="height"]',
  declaredValue: '[placeholder="0.00"]',
  shopRatesBtn: '//span[contains(text(),"Shop rates")]',
  addProductBtn:
    '//tbody/tr[@class="MuiTableRow-root"]/td[2]/button[1]/span[1]',
  productDropDownField:
    '//td[@class="MuiTableCell-root MuiTableCell-body"]//div[@role="button"]',
  productDropDown: ".css-l6i6a6-menu",
  productField: "tbody tr.MuiTableRow-root:nth-child(3) td:nth-child(1)",
  searchProductField: 'input[placeholder="Search..."]',
  selectProduct: ".css-l6i6a6-menu",
  selectAllOrdersCheckbox: "#fulfillment_checkbox",
  orderCheckbox: 'input[type="checkbox"]',
  fulfillBtn: '[aria-label="split button"] button:nth-of-type(1)',
  fulfillWindowTitle: "h2.MuiTypography-h6",
  batchBtn: '//span[contains(text(),"Batch")]',
  confirmFulfillBtn: '//span[contains(text(),"Confirm")]',
  orderActionsDropDown: '[aria-label="split button"] button:nth-of-type(2)',
  deleteAction: "#split-button-menu .MuiListItem-button:nth-of-type(1)",
  holdAction: "#split-button-menu .MuiListItem-button:nth-of-type(3)",
  completeAction: "#split-button-menu .MuiListItem-button:nth-of-type(2)",
  deleteWindowTitle: "h2.MuiTypography-h6",
  holdWindowTitle: "h2",
  completeWindowTitle: "h2",
  cancelWindowtitle: "h2",
  confirmDeleteBtn: '//span[contains(text(),"Confirm")]',
  confirmHoldBtn: '(//span[contains(text(),"Confirm")])[1]',
  confirmCompleteBtn: '//span[contains(text(),"Confirm")]',
  completeOrderConfirmBtn: "(//span[contains(text(),'Confirm')])[2]",
  completeOrderHoldmBtn: "(//span[contains(text(),'Confirm')])[3]",
  loader: "#spinners",
  loading: ".MuiDialogActions-spacing circle.MuiCircularProgress-circle",
  warehouseField: "div[class$='-container']",
  warehouseDropDown: ".css-e91lkq-control",
  selectFirstWareHouseFromDropdown: ".css-26l3qy-menu #react-select-2-option-0",
  selectWarehouseFromDropdown: ".ShipFromComponent [role='presentation']",
  selectProductFromDropdown: ".css-11unzgr",
  productList: ".Text[role='presentation']",
  orderSearchField: "#searcher",
  fulfilledOrdersNavigationBtn: '[data-cy="sidebar-processed-orders"]',
  storefrontNavigationBtn: '[data-cy="navbar-storefront"]',
  shopRatesErrorNotification: "#toast-message-container",
  carrierService: "[data-cy='carrier-selector-dropdown']",
  carrierServiceList: "[data-cy='carrier-selector-dropdown'] .dropdown-item",
  carrierServiceDropDown: ".css-11unzgr",
  carrierList: ".css-11unzgr div",
  carrierMessageField: "[aria-label=more]",
  carrierMessageText: "li",
  orderNumberMessage: ".MuiAlert-message",
  showingOrders: "p.sc-fzoLsD",
  countOrdersOnPage: ".table tbody tr",
  previousPageBtn: '[aria-label="previous page"]',
  nextPageBtn: '[aria-label="next page"]',
  lastPage: "[aria-label='last page']",
  firstPage: "[aria-label='first page']",
  rowPerPageBtn: '[aria-haspopup="listbox"]',
  totalOrders: '(//*[text()="of "]//..//span)[2]',
  amountOfSelectedOrders: '//span[@class="sc-AxirZ eIArnD"]',
  shippingRateLabel: '//p[normalize-space()="Shipping Rate"]',
  shippingRate: ".MuiTypography-body2",
  shippingRateTermsOfTradeLabel: '//*[text()="Shipping Rate"]/..//p',
  sortByDateBtn: ".table-header-text",
  dateCell: "td time",
  productQuantityField: 'input[placeholder="QTY"]',
  overrideAddressToggleBtn:
    '//*[text()="Force override address"]//ancestor::label//*[contains(@class,"MuiSwitch-root")]',
  signatureCheck: '.MuiSwitch-root input[type="checkbox"]',
  filterByRecipientAddressBtn: '//*[text()="Recipient Address"]//img',
  filterByWarehouseBtn: '//*[text()="Ship From"]//img',
  filterByShippingSLABtn: '//*[text()="Shipping SLA"]//img',
  warehouseFilter: "p.label",
  searchVariantField: "#variants-search",
  recipientAddressTab: "div.multiselect",
  internetionalAddressOption: "p.label",
  domesticAddressOption: "p.label",
  clearFilterBtn: ".clear-filter label",
  itemNameBtn: '[src="/img/brand/Triangle.png"]',
  validationSuccess: ".MuiGrid-root>p.MuiTypography-body2",
  billTo3rfPartyDropDown: '.row .text-orange',
  _3rdPartyBillingAccountDropDown: ".show #tailui-dropdown",
  itemNameOptionsWindow: "#infinite-scrollable-div",
  dateFromField: "#start_date",
  dateToField: "#end_date",
  pagination: ".table-pagination-toolbar button",
  paginationCounter: ".MuiTablePagination-caption:nth-child(4)",
  allCheckboxes: "tbody tr [type='checkbox']",
  tableIcons: "thead tr .table-icon",
  tableIconImages: "thead tr img",
  favoriteStar: "tbody  td img",
  cleanOrder: ".clean",
  previousMonthButton:
    "[aria-label='Move backward to switch to the previous month.']",
  nextMonthButton: "[aria-label='Move forward to switch to the next month.']",
  calendar: ".CalendarMonth_caption",
  calendarDays: "table.CalendarMonth_table_1",
  cleanDates: "[aria-label='Clear Dates']",
  tableRow: ".table tbody tr",
  funnelFilterButton: "tr button",
  cubeLoader: ".sk-cube1",
  organizationModalPage: ".MuiPaper-rounded",
  organizationCheckboxes: ".MuiPaper-rounded [type='checkbox']",
  sortDown: "tr .fa-sort-down",
  sortUp: ".fa-sort-up",
  optionsList: ".multiselect-options .options-container",
  quantityCell: "tbody tr td:nth-child(5)",
  itemNameCell: "tbody tr td:nth-child(6)",
  totalField: "input[placeholder='Total']",
  orderTotalCell: "tbody tr td:nth-child(8)",
  uniqueSKUModalPAge: "[role='listbox']",
  uniqueSKUList: "ul[role='listbox'] li",
  crossButton: ".MuiIconButton-sizeSmall",
  uniqueSKUCell: "tbody tr td:nth-child(9)",
  shippingSlaCell: "tbody tr td:nth-child(10)",
  warehouseCell: "tbody tr td:nth-child(11)",
  warehouseModalPage: "#infinite-scrollable-div",
  recipientAddressModalpage: ".infinite-scroll-component",
  recipientAddressCell: "tbody tr td:nth-child(13)",
  shippingCostCell: "tbody tr td:nth-child(14)",
  costRow: "tbody tr td:nth-child(14)",
  secondCostRow: "tbody tr:nth-child(2) td:nth-child(14)",
  ordersCheckBox: "tbody #order-fulfillment-checkbox",
  selectedCounter: ".hSYTqr span",
  fulfillemntStar: ".MuiIconButton-label svg",
  closePageButton: "[data-cy=go-back-action-btn]",
  organizationsDialog: ".MuiDialogContent-root p",
  fulfillOrganizationsCell: "[role=cell]",
  ordersOrganizationCell: 'tbody tr td:nth-child(2)',
  fulfillOrdersCountCell: ".MuiTableRow-root td",
  fulfillCheckbox: "tbody .MuiTableCell-body input[type=checkbox]",
  fulfillCancelButton: ".MuiDialogActions-root button[type=button]",
  batchCounter: "h3",
  ordersDetailsTable: '[aria-labelledby="tableTitle"] tbody tr',
  closeOrderButton: "img[alt=Close]",
  rowsCounter: ".MuiTablePagination-root p",
  cancelBatchButton: "[alt=print]",
  deleteBatchConfirmButton: "//button[contains(text(),'Confirm')]",
  fullfillmentSummaryTitle: "#simple-tab-1",
  selectedOrderTitle: "h5",
  fulfillActionList: "ul[role=menu] li",
  actionsDropDownBtn: 'button[aria-haspopup="menu"]',
  fulfillBtnList: "ul[role='menu'] li",
  alertMessage: ".MuiAlertTitle-root",
  warningMessageText: ".MuiAlert-message span",
  orderCreateDate: "[datetime]",
  upvoteIcon: "svg",
  videoContent: "[role='tooltip']",
  videoContentText: "[role='tooltip'] span",
  shipmentCrossButton: "(//button[@type='button'])[21]",
  openOrdersCount: "[href='/fulfillment/open'] div div div",
  holdOrdersCount: "[href='/fulfillment/hold'] div div div",
  fulfilledCount: "[href='/fulfillment/fulfilled'] div div div",
  videoTutorial: "div[role=presentation] iframe",
  closeVideoTooltip: "[role=presentation] .MuiSvgIcon-root",
  phoneInput: "input[type=tel]",
  flagUS: ".flag.us",
  addProductButton: "[data-cy=add-product-action-button]",
  orderNotes: "[data-cy=order-notes-textarea]",
  packageDropdown: "[data-cy=package-type-select-dropdown]",
  poundsInput: "[data-cy=box-weight-pounds-input]",
  ouncesInput: "[data-cy=box-weight-ounces-input]",
  shopRatebtn: "[data-cy=shop-rates-action-btn]",
  carrierServiceField: ".dropdown .disabled",
  insuranceCheckbox: ".SwitchContainer [type=checkbox]",
  declValueInput: "[placeholder='$0.00']",
  warehouseInput: ".ShipFromComponent .OptionsContainer",
  warehouseDropdown: "#scrollableDiv",
  originContactInput: "input[placeholder='Origin Contact*']",
  errorMessageTooltip:
    "[data-cy='custom-input--tooltip-error-message-last-name']",
  destinationCompanyInput: '[data-cy="destinationCompany"]',
  businessAddressInput: "[data-cy=custom_order_address__places_input]",
  selectBusinessAdress:
    "[data-cy=places-input--dropdown-container] [data-cy=places-input--dropdown-value-container]:nth-child(1)",
  validateButton: "[data-cy=validate-action-btn]",
  addressCheckImg: "[src='/img/brand/address_check.png']",
  shopRateSuccessMesage: "#toast-message-element",
  orderIdMessage: "#toast-message-element",
  productInput: "[data-cy='select-product-dropdown'] #tailui-dropdown",
  productField: '[data-cy="select-product-dropdown"]',
  productAssortment: "[cyattribute='dynamic-order-form--fulfillment--option']",
  productQTY: "[data-cy='select-product-quantity-input']",
  emailInput: "[data-cy='email']",
  lengthİnput: '[data-cy="box-dimention-length-input"]',
  widthInput: '[data-cy="box-dimention-width-input"]',
  heightInput: '[data-cy="box-dimention-height-input"]',
  removeProductBtn: "[data-cy='remove-product-action-button']",
  cityInput: "[data-cy='custom_order_address__city']",
  stateInput: "[data-cy='custom_order_address__state']",
  countryInput: "[data-cy='custom_order_address__country_code']",
  zipCodeInput: "[data-cy='custom_order_address__zip_code']",
  invalidAddressImg: "[src='/img/brand/invalid_address.png']",
  validateLoader: "[data-cy='-loader']",
  countryDropdown: ".flag-dropdown",
  countryList: ".country-list li",
  mailerToggle: "[data-cy='mailer-vs-box-toggle-switch'] [type='checkbox']",
  signatureToggle: ".switch-input[type='checkbox']",
  insuranceAmount: ".sc-AxjAm .kaPquH",
  upsCarrierDropdown: "(//button[@aria-label='more'])[1]",
  fedexCarrierDropdown: "(//button[@aria-label='more'])[2]",
  quantumDropdown:
    ".MuiCollapse-entered .MuiCollapse-wrapperInner > .MuiGrid-root >  :nth-child(5) .MuiInputBase-root .MuiSelect-select",
  quantomList: "ul.MuiMenu-list li span",
  carrierCard: ".row-packaging .sc-AxhCb",
  cheapestCarrier: "[data-cy='carrier-selector-dropdown']",
  shippingCounter: "//*[text()='Shipping Rate']/following-sibling::div//span",
  stockWarning: ".DynamicOrderForm p",
  phoneErrorTooltip: "[data-cy='custom-input--tooltip-phone-number-phone']",
  phoneErrorMesage: "[data-cy='custom-input--tooltip-error-message-phone']",
  cityErrorMessage:
    "[data-cy='custom-input--tooltip-error-message-custom_order_address__city']",
  stateErrorMessage:
    "[data-cy='custom-input--tooltip-error-message-custom_order_address__state']",
  countryErrorMessage:
    "[data-cy='custom-input--tooltip-error-message-custom_order_address__country_code']",
  zipCodeErrorMessage:
    "[data-cy='custom-input--tooltip-error-message-custom_order_address__zip_code']",
  emailErrorMessage: "[data-cy='custom-input--tooltip-error-message-email']",
  addUPSnotificationBtn: "button.MuiIconButton-sizeSmall",
  removeUPSnotificationBtn: "button.MuiIconButton-sizeSmall",
  triangleIcon: ".MuiPaper-rounded svg",
  messagesCounter: ".MuiPaper-rounded .MuiBadge-badge",
  carrierMessagecounter: ".MuiGrid-item ul li",
  ordersTableRow: ".table-wrapp table tbody tr",
  ordersItem: ".eoxgzk .inauvg .hNUNYZ",
  itemTolltip: "#order-summary-order-lines-order-item-name img",
  selectAllOrders: "#count-comp",
  orderCell: 'tbody:nth-child(2) tr:nth-child(1) td:nth-child(4)',
  carrierDetailsTitle: 'p.CarrierTitle',
  firstNameInput: '[data-cy="first-name"]',
  lastNameInput: '[data-cy="last-name"]',
  organizationField: '.css-1hwfws3',
  organizationList: '.css-11unzgr div',
  messageWarningUPSlabel: 'data-cy="carrier-selector-0"',
  newWindow: '#react-select-2-input',
  addressesDropDownList1: '[data-cy="places-input--dropdown-container"] [data-cy="places-input--dropdown-text"]',
  childOrgDropdown: '.css-2b097c-container',
  childOrgList: '.css-11unzgr div',
  warehouseList: '.WarehouseDropdown p',
  organizationCell: 'tbody:nth-child(2) tr td:nth-child(2)',

  getOrderByUserName: function (Name) {
    return `.//*[@class="table bg-white text-center no-gear"]//td[text()= "${Name}"]`;
  },

  getOrderByOrderId: function (Id) {
    return `//td[normalize-space()="${Id}"]`;
  },

  getCheckboxByOrderId: function (Id) {
    return `.//*[@class="table bg-white text-center no-gear"]//td[text()= "${Id}"]//ancestor::tr//*[@id="order-fulfillment-checkbox"]`;
  },

  getCarrierByImageName: function (Name) {
    return `//span[contains(text(),"${Name}")]`;
  },

  getRowPerPageByAmount: function (Number) {
    return `[role="listbox"] [data-value="${Number}"]`;
  },

  getWarehouseByName: function (Name) {
    return `//*[@class="Text"][text()="${Name}"]`;
  },

  get3rdPartyBillingAccountByName: function (Name) {
    return `//*[@cyattribute="undefined--option"]//*[text()="${Name}"]`;
  },

  getOptionByName: function (Name) {
    return `//td[normalize-space()="${Name}"]`;
  },

  getCheckboxesOfAllStarredOrders: function () {
    return `//*[@class="table bg-white text-center no-gear"]//*[contains(@src,"star_filled.png")]//ancestor::tr//*[@id="order-fulfillment-checkbox"]`;
  },
  getMultiplyProducts: function (Index) {
    return `tr.MuiTableRow-root:nth-child(${Index}) td:nth-child(1)`;
  },
  getHeaderByName: function (Name) {
    return `//th[normalize-space()='${Name}']`;
  },
  getCheckboxByOrganizationName: function (Name) {
    return `//span[contains(text(),"${Name}")]/preceding-sibling::span/span/input[@type="checkbox"]`;
  },
  getChecckboxByItemName: function (Name) {
    return `(//p[contains(text(),"${Name}")]/preceding-sibling::input[@type="checkbox"])[1]`;
  },
  getCheckboxByWarehouseName: function (Name) {
    return `//div[@class='options-container']/p[text()="${Name}"]/preceding-sibling::input[@type='checkbox']`;
  },
  getCheckboxByRecipientAddressName: function (Name) {
    return `//div[@class='options-container']/p[text()="${Name}"]/preceding-sibling::input[@type='checkbox']`;
  },
  getActionByName: function (Name) {
    return `//*[@role="menu"]//li[normalize-space()="${Name}"]`;
  },
  getTimeByOrderId: function (Id) {
    return `//td[text()="${Id}"]/preceding-sibling::td[1]/time`;
  },
  getInputByName: function (Name) {
    return `//input[@name="${Name}"]`;
  },
  getInputbyPlaceholder: function (Name) {
    return `//input[@placeholder="${Name}"]`;
  },
  getTitleByName: function (Name) {
    return `//*[contains(text(), "${Name}")]`;
  },
  getCheckboxByName: function (Name) {
    return `//label[contains(., "${Name}")]//input[@type='checkbox']`;
  },
  getInputById: function (Name) {
    return `[id="${Name}"]`;
  },
  getTextByName: function (Name) {
    return `//*[text() = "${Name}"]`;
  },
  getCarrierByimage: function (image, Name) {
    return `//img[contains(@src, "${image}")] | //span[contains(text(), "${Name}")]`;
  },
  getWarningMessageByOrderId: function (id, text) {
    return `//td[normalize-space()="${id}"] | //p[normalize-space()="${text}"]`;
  },

  getProductByName: function (Name) {
    return `//p[normalize-space()="${Name}"]`
  },

  getCarrierByImage: function (Name) {
    return `//img[contains(@src, "${Name}")]`
  },
  getOrderCellByrow: function (row) {
    return `tbody:nth-child(2) tr:nth-child(${row}) td:nth-child(4)`;
  },
};


export const tableHeader =
  [
    "Organization",
    "Order Date",
    "Order #",
    "Quantity",
    "Item Name",
    "Storefront",
    "Order Total",
    "Unique SKUs",
    "Shipping SLA",
    "Ship From",
    "Customer name",
    "Recipient Address",
    "Shipping Cost",
  ]

export const shipFromSection =
  [
    "Origin Company",
    "Origin Contact*",
    "Email",
    "1 (702) 123-4567",
    "Business Address",
    "Address 2 (optional)",
    "City",
    "State",
    "Country",
    "Zipcode",
  ]

export const shipToSection =
  [
    "Destination Company",
    "First name*",
    'Last name*',
    "Email",
    "1 (702) 123-4567",
    "Business Address",
    "Address 2 (optional)",
    "City",
    "State",
    "Country",
    "Zipcode",
  ]

export const OrdersTitle = [
  "Shipping From*",
  "Shipping To*",
  "Order Information",
  "Package*",
  "Carrier*",
  "Bill To 3rd Party",
];

export const bill3Partytext =
  [
    "UPS assumes no liability for the information provided by the address validation functionality. The address validation functionality does not support the identification or verification of occupants at an address. Any request to the UPS Address Validation Street Level API shall be solely for the purpose of validating and classifying an address in connection with tendering a package for delivery via UPS.",
    "UPS, the UPS Shield trademark, the UPS Ready mark, the UPS Developer Kit mark and the Color Brown are trademarks of United Parcel Service of America, Inc. All Rights Reserved.",
    "** Additional fees may apply",
  ];

export const ordersToggles =
  [
    "This is a residential address",
    "Force override address",
    "Additional Handling",
  ];

export const ordersStatictext =
  [
    "Shipping Rate",
    "NA",
    " Shipment insurance costs 1% of the Declared Value + $1 ",
    " Value of the contents of the shipment ",
    " Minimum Declared Value: $10 ",
  ];

export const dimensions =
  [
    "length", "width", "height"
  ];


export const note =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum";

export const upsOptions = [
  "Delivery Confirmation",
  "Carbon Neutral",
  "Direct delivery only",
  "Quantum view notification",
  "Saturday Delivery",
];

export const quantumOptions = [
  "Return or Label Creation Notification",
  "In-transit Notification",
  "Ship Notification",
  "Exception Notification",
  "Delivery Notification",
];
export const fedexOptions = [
  "Alcohol Shipping",
  "Return Clearance",
  "FedEx Freight Direct",
  "Inaccessible Dangerous Goods",
  "Accessible Dangerous Goods",
  "Hold At Location",
  "Priority Alert",
  "Battery",
  "Saturday Delivery",
  "FedEx One Rate®",
];

export const warningMessage = [
  "Insufficient Inventory(1)",
  "Phone number less than 10 digits(1)",
  "No Box Selected(1)",
  "No Box Selected(1)",
  "No Product Dimensions(1)",
];
