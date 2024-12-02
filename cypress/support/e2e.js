// import '@bahmutov/cy-api/support';
import "./commands";
require("cypress-xpath");
// eslint-disable-next-line no-undef
require("@4tw/cypress-drag-drop");
import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";



addMatchImageSnapshotCommand();
