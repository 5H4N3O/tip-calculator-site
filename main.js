import {
  handleTipInput,
  updateCustomInputDisplay,
  calculateTip,
  validateInputs,
  outputErrors,
  outputData,
} from "./modules/tip-calculator.js";

// Reference HTML elements
const billInput = document.getElementById("bill-input");
const customTipInput = document.getElementById("custom-tip-input");
const tipSelection = document.getElementById("tip-selection");
const splitInput = document.getElementById("split-input");
const calculateBtn = document.getElementById("calculate-button");
const output = document.getElementById("output");

// Reveal or hide the custom tip percentage input based on the user's selection
tipSelection.addEventListener("change", () => {
  updateCustomInputDisplay(tipSelection, customTipInput);
});

// Calculate tip when button is clicked
calculateBtn.addEventListener("click", () => {
  // Get current user inputs (Make seperate function)
  const billAmount = billInput.valueAsNumber;
  const tipPercentage = handleTipInput(tipSelection, customTipInput);
  const splitBetween = splitInput.valueAsNumber;

  // input validation
  const errors = validateInputs(billAmount, tipPercentage, splitBetween);
  if (errors.length > 0) {
    outputErrors(errors, output);
  } else {
    // Calculate and display results
    const processedData = calculateTip(
      billAmount,
      tipPercentage,
      splitBetween,
      output
    );
    console.log(processedData); // test

    outputData(processedData, output);
  }
});
