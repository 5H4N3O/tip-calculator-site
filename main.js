import { handleTipInput, updateCustomInputDisplay, calculateTip, outputData } from './modules/tip-calculator.js';

// Reference HTML elements
const billInput = document.getElementById("bill-input");
const customTipInput = document.getElementById("custom-tip-input");
const tipSelection = document.getElementById("tip-selection");
const splitInput = document.getElementById("split-input");
const calculateBtn = document.getElementById("calculate-button");
const output = document.getElementById("output");
