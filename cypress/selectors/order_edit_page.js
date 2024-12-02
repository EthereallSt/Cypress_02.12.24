export const orderEditPage = {
  contentTab: '(//button[@role="tab"])[3]',
  contentCard: "[draggable='true']",
  packagingTab:
    '(//span[contains(@class,"MuiTab-wrapper-")][normalize-space()="PACKAGING"])[1]',
  carrierTab: '(//button[@role="tab"])[5]',
  packageCounterTab: "h6",
  packageTitle: "[title='Super package']",
  packageDropdown: ".css-2b097c-container .css-yk16xz-control",
  secondCarrierTab: "(//span[contains(text(),'CARRIER')])[2]",
  secondShipFromField: "(//span[contains(text(),'New Warehouse')])[2]",
  secondShipFromArea: "div[role=button]",
  secondPackagingTab:
    '(//span[contains(@class,"MuiTab-wrapper-")][normalize-space()="PACKAGING"])[2]',
  secondContentTab: '(//button[@role="tab"])[6]',
  shipFromSelect: 'div[role="button"]',
  recommendPackaging: '(//span[contains(text(),"RECOMMENDED PACKAGING")])[1]',
  secondRecommendPackaging:
    '(//span[contains(text(),"RECOMMENDED PACKAGING")])[2]',
  declaredValue: 'input[placeholder="$0.00"]',
  lengthField: '[name="length"]',
  widthField: '[name="width"]',
  heightField: '[name="height"]',
  poundsField: '[name="pounds"]',
  ouncesField: '[name="ounces"]',
  fulfillmentDetailTitle: '//h5[normalize-space()="Fulfillment Details"]',
  loader: "#spinners",
  modalLoader: ".modal-body [role='status']",
  packageSelect: "#tailui-dropdown [role='presentation']",
  shopRatesBtn: '(//*[contains(text(), "SHOP RATES")])[1]',
  secondShopRatesBtn: '(//h6[contains(text(), "SHOP RATES")])[2]',
  timeLabel: "span time",
  addPackageBtn:
    '(//*[text()="Fulfillment Details"]//ancestor::*[contains(@class,"jss")]//button)[1]',
  loadAnimation: ".MuiCircularProgress-svg-1050",
  cubeAnimation: ".sk-cube1",
  deletePackageBtn: '//*[text()="DELETE PACKAGE"]',
  multiPieceShipmentToggleBtn:
    '//span[text()="Activate Multi-Piece Shipment?"]//ancestor::label//span[@aria-disabled="false"]',
  batchPageTitle: ".close-batch li h2",
  checkoutLabelsBtn: './/button[text()="Checkout Labels"]',
  checkoutWindowTitle: "h5.modal-title span",
  paymentMethod: ".payment-option a.nav-link",
  addPaymentMethodBtn: '.dropdown-menu.show',
  paymentServiceFees: '.label-order-table tr:nth-child(2) td:nth-child(4)',
  confirmOrderBtn: "h5.modal-title .checkout-btn",
  completeCheckouWindowTitle: ".media-body h5.mt-0",
  printBtn: ".batch-conatiner img",
  printAllLabels: '//button[text()="Print All Labels"]',
  pickListPrintBtn: '(//*[@alt="picklist"])[1]',
  packListPrintBtn: '(//*[@alt="picklist"])[2]',
  printPackListWindowTitle: "h5.modal-title span",
  pickListPrintWindowTitle: "h5.modal-title span",
  printPickingSlipsBtn: '//*[text()="Print Packing Slips"]',
  printPickingSlipsWindowTitle: ".modal-title h3",
  arrowPageUp: ".fas.fa-chevron-up",
  arrowPageDown: ".fa-chevron-down",
  sheetWithLogo: '[data-page-number="1"] .react-pdf__Page__canvas',
  goBackBtn: '//button[text()="Go Back"]',
  deleteBatchBtn: '.batch-conatiner img[alt="print"]',
  deleteBatchWindowTitle: ".delete-batch-confirmation-modal-header p",
  confirmDeleteBatchBtn:
    '//*[@class="delete-batch-confirmation-modal-button-container"]//*[text()="Confirm"]',
  confirmBatchButton: '//span[contains(text(),"Confirm")]',
  order: ".table tbody tr",
  emptyTable: "tbody .table-empty",
  orderSummaryBtn: "#simple-tab-0",
  fulfillmentSummaryBtn: "#simple-tab-1",
  ignoredMassage: '//*[text()="[IGNORED]"]',
  productPackagingMessage: '//*[text()="Using Product Packaging"]',
  printPackingSlipsDropDown: '[aria-haspopup="menu"]',
  voidLabelsBtn: '//*[text()="Void Labels"]',
  bundleIcon: "#order-summary-order-lines-order-item-name img",
  bundleTooltip: "div.MuiTooltip-tooltip",
  invalidAdressFlagBtn: '[data-cy="customer-summary-ship-to-detail"]',
  noBoxSelectedFlagBtn: '[data-cy="fulfillment-summary-fulfillment-detail"]',
  noRateSelectedFlagBtn: '[data-cy="shop-rate-button"]',
  packageTypeToggleBtn: "div.SwitchContainer",
  orderItem:
    "#order-summary-order-lines-order-item-name svg",
  copyButton:
    "//div[@id='order-summary-order-lines-order-item-name']//div//div//*[name()='svg']",

  successCopyMessage: '[role="alert"] .MuiAlert-message',
  closeSuccessCopyMessageBtn: 'button[title="Close"]',
  shipAddress:
    '(//*[@class="MuiTypography-root   MuiTypography-body2 MuiTypography-colorTextSecondary"]//div)[2]',
  editShippingAddressBtn: '//span[contains(text(),"Edit")]',
  editShippingRecipientBtn: '[data-cy="edit-shipping-address-action-btn"]',
  editShippingAddressWindowTitle: ".modal-title p",
  newPhoneNumberField: 'input[type="tel"]',
  newAddressField: '[data-cy="undefined__places_input"]',
  zipCodeField: '[data-cy="undefined__zip_code"]',
  updateAddressBtn: '//button[text()="Update"]',
  addressesDropDownElement: '[data-cy="places-input--dropdown-text"]',
  editOrderSummary: '(//span[text()="Edit"]//ancestor::button)[1]',
  addressVerifyMessage: "#customer-summary-ship-to-detail",
  overrideAddressToggleBtn:
    '//*[text()="Force Override Address"]//..//*[@class="SwitchContainer"]//*[contains(@class,"MuiSwitch-root-")]',
  overrideAddressCheckbox: "(//div[@class='SwitchContainer']//input[@type='checkbox'])[2]",
  saveEditShippingRecipientBtn: '//button[normalize-space()="Update"]',
  editBtn: ".tab-content .MuiGrid-item button",

  productAmountLabel: ".MuiTableCell-root.MuiTableCell-body:nth-of-type(3) div",
  orderSummaryTitle: './/*[text()="Order Summary"]',
  editOrderWindowTitle: "h5.modal-title span",
  productAmountField: '(//*[@class="modal-body"]//input)[1]',
  totalProductAmount: '//*[@class="modal-body"]//span',
  totalProductCost: '(//*[@class="modal-body"]//p)[8]',
  saveEditOrderBtn: ".MuiSvgIcon-root:nth-of-type(2)",
  deleteVariant: ".modal-body .MuiSvgIcon-root",
  addProductBtn: ".modal-body .MuiSvgIcon-root",
  productDropDown: ".DynamicOrderForm #tailui-dropdown",
  searchProductField: "#select-search",
  selectProduct: '[cyattribute="dynamic-order-form--fulfillment--option"]',
  productCostField: 'div [type="number"]',
  removedTab: '//*[text()="Removed"]',

  labelActionsDropDown: '[aria-haspopup="menu"]',
  returnLabelBtn: '//*[@role="menuitem"][text()="Return Label"]',
  returnLabelModal: "div.return-label-modal",
  returnLabelWindow: "h2",
  returnLabelPdf: ".react-pdf__Page__canvas",
  confirmGenerateLabelBtn: '//span[text()=" Confirm "]',
  batchNumber: ".batchNo h3",
  fulfillmentEditShippingaddressBtn:
    '(//span[text()="Edit"]//ancestor::button)[3]',
  packageField: "#react-select-12-input",
  shipFromField: '(//span[contains(text(),"Company Warehouse")])[1]',
  carrierField: "#react-select-13-input",
  totalShippingCost: '(//div[contains(text(),"$")])[2]',
  shippingCostLabel: "tbody tr:nth-child(2) td:nth-child(3) div",
  addressVerifyError: '(//*[text()="Address Unverified"])',
  orderStatus: '(//*[@class="MuiTypography-root   MuiTypography-body1"])[2]',
  batchStatus: '//*[@class="batch-details-key"][text()="Batch Status:"]//*',
  splitQtyField: '//*[text()="Split QTY"]//..//input',
  confirmSeparateProductShipmentBtn: '//span[text()="confirm"]',
  actionsDropDownBtn: 'button[aria-haspopup="menu"]',
  completeAction: '//li[text()="Complete"]',
  completeWindowTitle: "h2",
  confirmCompleteBtn:
    '//span[@class="MuiButton-label"]//span[contains(text(),"Confirm")]',
  holdAction: '//li[text()="Hold"]',
  holdWindowTitle: "h2",
  confirmHoldBtn:
    '//span[@class="MuiButton-label"]//span[contains(text(),"Confirm")]',
  calculateBoxesAndRatesAction: '//li[text()="Calculate Boxes & Rates"]',
  calculateBoxesAndRatesWindowTitle: "h2",
  confirmCalculateBoxesAndRatesBtn:
    '//span[@class="MuiButton-label"]//span[contains(text(),"Confirm")]',
  signatureCheckBox:
    '//*[text()="Signature"]//ancestor::*[contains(@class, "MuiFormControlLabel-labelPlacementStart-")]//input',
  goToNextOrderBtn:
    '//*[contains(@class,"MuiGrid-item")]//*[text()="Go To Next Order"]',
  goToNextOrderButton: ".MuiGrid-container div button",
  orderNumber: '//*[contains(text(),"Soapbox Order #")]',
  fulfillBtn:
    '[aria-label="split button"] .MuiButton-containedPrimary:nth-child(1)',

  pickListDate: ".react-pdf__Page__textContent span:nth-child(9)",
  pickListBatchNumber: ".react-pdf__Page__textContent span:nth-child(10)",
  pickListWarehouse: ".react-pdf__Page__textContent span:nth-child(11)",
  pickListCountOfSkus: ".react-pdf__Page__textContent span:nth-child(12)",
  pickListCountOfProducts: ".react-pdf__Page__textContent span:nth-child(13)",
  pickListProductName: ".react-pdf__Page__textContent span:nth-child(19)",
  pickListProductQty: ".react-pdf__Page__textContent span:nth-child(21)",
  closePrintWindow: ".fas.fa-times",

  packListDate: ".react-pdf__Page__textContent span:nth-child(12)",
  packListBatchNumber: ".react-pdf__Page__textContent span:nth-child(13)",
  packListWarehouse: ".react-pdf__Page__textContent span:nth-child(14)",
  packListCountOfOrders: ".react-pdf__Page__textContent span:nth-child(15)",
  packListCountOfShipments: ".react-pdf__Page__textContent span:nth-child(16)",
  packListCountOfCommonOrders:
    ".react-pdf__Page__textContent span:nth-child(17)",
  packListProductName: ".react-pdf__Page__textContent span:nth-child(26)",
  packListProductQty: ".react-pdf__Page__textContent span:nth-child(28)",
  packListCarrier: ".react-pdf__Page__textContent span:nth-child(18)",
  orderLinesProductQty:
    '//*[@id="root"]/div[1]/div[2]/div/div/div[1]/div/div[3]/div[2]/div[2]/div[1]/div[2]/div[3]/div/div/table/tbody/tr[1]/td[3]/div/div',
  fixNowBtn: '//*[text()="Fix now"]',
  draggablePlace: ".tab-pane .row .d-item-placeHolder:nth-child(1)",
  secondPackage: "//div[@title='Controller : PS3']",
  packageQuantity: '[data-cy^="draggable-item^-"]',
  firstRowQty: "tbody.MuiTableBody-root tr:nth-child(2) td:nth-child(3)",
  fullfillmentSummaryTitle: "#simple-tab-1",
  onHoldOrderStatus: ".on-hold-orders p.MuiTypography-root",
  packageCounter: "[draggable=true]",

  crossBtn: "[data-cy='go-back-action-btn']",
  starIcon: ".MuiIconButton-label svg",
  shipFromWarehouse: "div[aria-haspopup='listbox'] span",
  closeIcon: "[data-cy='product-modal-close-modal-icon']",
  modalSaveBtn: "[data-cy='product-modal-update-changes-icon']",
  modalcancelBtn: ".modal-body button:nth-child(1)",
  modalUpdateBtn: ".modal-body button:nth-child(2)",
  residentialAddressCheckbox:
    "//span[text()='This is a residential address']//parent::div//input[@type='checkbox']",
  removeProductBtn: "//div[@class='sc-AxjAm cTzycP']//div[5]//*[name()='svg']",
  modalTitleButtons: ".modal-title svg",
  productQty: ".modal-body input",
  productTotal: ".modal-body input",
  totalProductQty: "//span[@class='sc-AxirZ hcqXgg']",
  searchProductsField: 'input[placeholder="Search..."]',
  productList:
    ".infinite-scroll-component [cyattribute='dynamic-order-form--fulfillment--option'] p",
  productTotalsAmount: "//p[@class='sc-fznyAO kkljfs']",
  removedProduct: ".sc-AxjAm .bKHlfb div:nth-child(1)",
  removedProductQty: ".sc-AxjAm .bKHlfb div:nth-child(3)",
  removedProductTotal: ".sc-AxjAm .bKHlfb div:nth-child(4)",
  documentCounter: ".MuiBadge-badge",
  viewBtn: "button:contains('View')",
  documentDropdown: "[role='presentation'] #panel1a-header",
  uploadBtn: "span input[type='file']",
  uploadedFile: ".MuiAccordionDetails-root tr:nth-child(1) td:nth-child(1)",
  removeUploadedFile: ".MuiTableBody-root td button",
  documentCrossBtn: "button svg.MuiSvgIcon-root",
  carrierDropdown: ".css-1fhf3k1-control input",
  centerDeletePackageBtn: "button:contains('Delete package')",
  shopRateBtn: "//span[normalize-space()='SHOP RATES']",
  packageMenu: "ul[role='menu'] [role='menuitem']",
  shipFromWarehouseList: ".css-11unzgr div",
  packageList: ".css-uqxu9s div",
  addUPSnotificationBtn: "button span svg",
  removeUPSnotificationBtn: "button span svg",
  quantomNotificationField: "[role='button'][aria-disabled='true']",
  quantomNotificationList: "ul li",
  shopRateSuccessMesage: "div[role='alert'].Toastify__toast-body",
  triangleIcon: "svg",
  carrierMessagecounter: "ul li",
  messagesCounter: "[class^='MuiBadge-badge-']",
  carrierInput: ".css-14jk2my-container",
  carrierServiceField: '.css-1uccc91-singleValue span',
  productQtyCell: "table:nth-child(2) tr:nth-child(1) td:nth-child(3) div",
  packageList: ".css-9g7j0m-menu span",
  upvoteIcon: ".css-1uccc91-singleValue svg",
  emailInput: "[data-cy='email']",
  firstNameInput: '[data-cy="first-name"]',
  lastNameInput: '[data-cy="last-name"]',
  firstNameErrorMessage: '[data-cy="custom-input--tooltip-error-message-first-name"]',
  lastNameErrorMessage: '[data-cy="custom-input--tooltip-error-message-last-name"]',
  cityInput: '[data-cy="undefined__city"]',
  stateInput: '[data-cy="undefined__state"]',
  countryInput: '[data-cy="undefined__country_code"]',
  zipCodecityInput: '[data-cy="undefined__zip_code"]',
  cityErrorMessage:
    "[data-cy='custom-input--tooltip-error-message-undefined__city']",
  stateErrorMessage:
    "[data-cy='custom-input--tooltip-error-message-undefined__state']",
  countryErrorMessage:
    "[data-cy='custom-input--tooltip-error-message-undefined__country_code']",
  zipCodeErrorMessage:
    '[data-cy="custom-input--tooltip-error-message-undefined__zip_code"]',

  mailerChekbox: '[data-cy="mailer-vs-box-toggle-switch"] [type="checkbox"]',
  insufficientInventoryHoldMessage: '[data-cy="order-summary-order-lines-insufficient-inventory"]',
  internationalShippingAddressHoldMesage: '[data-cy="customer-summary-ship-to-detail"]',
  noBoxSelectedHoldMessage: '[data-cy="fulfillment-summary-fulfillment-detail"]',
  noRateSelectedHoldMessage: '[data-cy="shop-rate-button"]',
  packageDetail: '#fulfillment-summary-fulfillment-detail',
  noProductHoldMessage: '[data-cy="order-summary-order-lines-order-item-name"]',
  noWeightHoldMessage: '[data-cy="order-summary-order-lines-order-item-name"]',
  itemCell: '#order-summary-order-lines-order-item-name',
  addPackageButton: "(//button[@type='button'])[17]",
  packageLength: '.row',
  paymentMethodErrorMessage: '.MuiAlert-message',
  labelSizeDropDown: '.label-size-selector',
  trackingNumberCell: 'td a',
  selectWarehouse: '.css-11jt7fy-menu',
  batchedOrderRow:'tbody:nth-child(2) tr',
  editOrderErrorMesage: '[role="alert"]',

  getPackageSelect: function (Name) {
    return `//p[normalize-space()="${Name}"]`;
  },

  getCarrierServiceByName: function (Name) {
    return `//*[contains(@class, "placeholder")][text()="${Name}"]`;
  },

  getPackageContentByProductName: function (Name) {
    return `//*[contains(@data-cy,"draggable-item")]//div[text()="${Name}"]`;
  },

  getPackageByName: function (Name) {
    return `(//span[contains(normalize-space(), "${Name}")])[1]`;
  },

  getWarehouseByName: function (Name) {
    return `//*[contains(@id, "react-select-")][text()="${Name}"]`;
  },

  getPackageBlockByName: function (Name) {
    return `//*[text()="${Name}"]`;
  },

  getPaymentByName: function (Name) {
    return `//*[@class="dropdown-menu show"]//*[contains(text(),"${Name}")]//div//div[1]`;
  },

  getProductDragByName: function (Name) {
    return `//div[@title="${Name}"]//ancestor::*[contains(@data-cy,"draggable-item")]//div//div[1]`;
  },

  getDropElementByPackageName: function (Name) {
    return `//*[text()="${Name}"]//ancestor::*[contains(@class, "MuiGrid-align-items-xs-center")]//*[contains(@class,"d-item-placeHolder")]`;
  },
  getProductByNameAndPackageName: function (Product, Package) {
    return `(//div[normalize-space()="${Product} : Controller..."])[1] | //h6[normalize-space()="${Package}"]`;
  },

  getCarrierByImgName: function (Name) {
    return `(//img[contains(@src, "${Name}")])`;
  },

  getMultiplyCarrierByImgName: function (Name, index) {
    return `(//img[contains(@src, "${Name}")])["${index}"]`;
  },

  getProductQtyByName: function (Name) {
    return `//div[contains(@title,"${Name}")]//ancestor::*[contains(@data-cy,"draggable-item")]//div//div[1]`;
  },

  getOrderByOrderId: function (Id) {
    return `//*[text()[contains(.,"${Id}")]]`;
  },

  getTrackingNumberByOrderId: function (Id) {
    return `//*[text()[contains(.,"${Id}")]]/..//*[@target="_blank"]`;
  },

  voidLabelsModal: {
    voidSelectedBtn: '//span[text()="void selected"]//ancestor::button',
    confirmVoidLabelsWindow:
      '//*[contains(@class,"MuiDialogTitle")]//*[text()="Confirm Void Labels"]',
    confirmVoidBtn: '//span[text()="confirm void"]//ancestor::button',
    searchField: '[role="dialog"] [placeholder="Search"]',

    getOrderByOrderId: function (Id) {
      return `//*[contains(@class,"MuiDialogContent")]//*[text()="${Id}"]`;
    },

    getCheckBoxByOrderId: function (Id) {
      return `//*[contains(@class,"MuiDialogContent")]//*[text()="${Id}"]/..//*[contains(@class,"MuiCheckbox")]`;
    },
  },
  getPackageNumber: function (Number) {
    return `//p[normalize-space()='${Number}']`;
  },
  getInputByDatacy: function (Name) {
    return `[data-cy="${Name}"]`;
  },

  getPackageTabByNumber: function (Number) {
    return `(//button[@role="tab"])[${Number}]`
  },

  getPackageByTitle: function (Name) {
    return `[title="${Name}"]`
  },

  getOrderByStatus: function (Name) {
    return `p:contains('${Name}')`
  },

  getTotalAmountByProductName:function (Name,Amount) {
    return `//tr[.//div[text()=${Name}]]//td[contains(text(), ${Amount})]`
  }



}


export const fulfillmentElements =
  [

    "Order Date:",
    "Order Status:",
    "Open",
    "Ship from:",
    "Batch:",
    "N/A",
    "Fulfillment Summary",
    "Ship-To Detail",
    "Shipping Address / recipient:",
    "Address Verified",
    "Shipment",
    "Package",
    "Carrier",
    "Total",
    "Total Shipping Cost",
    "Order Lines",
    "Item",
    "SKU",
    "QTY",
    "Total",
    "Fulfillment",
    "TOTALS",
    "Documents",
    "Fulfillment Details",
    "Package 1",

  ]

export const orderSummaryElements =
  [
    "Order Date:",
    "Order Status:",
    "Open",
    "Ship from:",
    "Batch:",
    "N/A",
    "Order Summary",
    "Overview",
    "store:",
    "products total:",
    "order total:",
    "shipping paid:",
    "tax paid:",
    "ship by:",
    "shipped date:",
    "shipped packages:",
    "shipping cost:",
    "notes:",
    "Pending",
    "Order Lines",
    "Item",
    "SKU",
    "QTY",
    "Total",
    "Fulfillment",
    "TOTALS",
    "Customer Summary",
    "Buyer Detail",
    "Name:",
    "EMAIL:",
    "phone:",
    "Billing Detail",
    "billing address / recipient:",
    "Ship-To Detail",
    "Shipping Address / recipient:",
    "Address Verified",
    "Shipping Summary",
    "Shipment",
    "Package",
    "Carrier",
    "Total",
    "Total Shipping Cost",
    "Fulfillment",
    "Service",
    "Unit",
    "Total",
    "Total Fulfillment Cost",
  ]


export const document =
  [
    "BILLS OF LADING",
    "PALLET PACK LISTS",
    "SHIPMENT PACK LISTS",
    "CARTON PACK LISTS",
    "COMMERCIAL INVOICES",
    "PROOFS OF DELIVERY",
    "ADDITIONAL DOCUMENTS",
  ];

export const file =
  [
    "test_automation/cypress/fixtures/BILLS_OF_LADING.txt",
    "test_automation/cypress/fixtures/PALLET_PACK_LISTS.txt",
    "test_automation/cypress/fixtures/SHIPMENT_PACK_LISTS.txt",
    "test_automation/cypress/fixtures/CARTON_PACK_LISTS.txt",
    "test_automation/cypress/fixtures/COMMERCIAL_INVOICES.txt",
    "test_automation/cypress/fixtures/PROOFS_OF_DELIVERY.txt",
    "test_automation/cypress/fixtures/ADDITIONAL_DOCUMENTS.txt",
  ];

export const uploadedFileName =
  [
    "BILLS_OF_LADING.txt",
    "PALLET_PACK_LISTS.txt",
    "SHIPMENT_PACK_LISTS.txt",
    "CARTON_PACK_LISTS.txt",
    "COMMERCIAL_INVOICES.txt",
    "PROOFS_OF_DELIVERY.txt",
    "ADDITIONAL_DOCUMENTS.txt",
  ];