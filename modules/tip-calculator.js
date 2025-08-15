// Handles extracting the tip percentage based on user selection
// If "Custom %" is selected, uses the customTipInput value; otherwise, uses the selected option
export function handleTipInput(selectedTipOption, customTipInput) {
  const tipInput =
    selectedTipOption.value === "C"
      ? customTipInput.value
      : selectedTipOption.value;

  // Normalize input (remove %, convert to decimal)
  return normalizeTipInput(tipInput);
}

// Shows or hides the custom tip input field based on user selection
export function updateCustomInputDisplay(selectedTipOption, customTipInput) {
  if (selectedTipOption.value === "C") {
    customTipInput.classList.add("show");
  } else {
    customTipInput.classList.remove("show");
  }
}

// Calculates tip amounts and totals
export function calculateTip(billAmount, tipPercentage, splitBetween, output) {
  const tipAmount = billAmount * tipPercentage; // Total tip
  const splitTip = tipAmount / splitBetween; // Tip due per person
  const totalAmount = billAmount + tipAmount; // Total bill including tip

  // Return all calculated values
  const processedData = {
    billAmount: billAmount,
    tipPercentage: tipPercentage,
    tipAmount: tipAmount,
    splitTip: splitTip,
    splitBetween: splitBetween,
    totalAmount: totalAmount,
  };

  return processedData;
}

// Outputs calculated data to the page
export function outputData(data, output) {
  // Toggle between error and show
  output.classList.remove("error"); // Removes "error" styling if present
  output.classList.add("show"); // Show the ouput box with "show" styling

  // If splitting between multiple people, show per-person tip
  if (data.splitBetween > 1) {
    output.innerHTML = `
    <p>Tip Amount: $${data.tipAmount.toFixed(2)}</p>
    <p>Total: $${data.totalAmount.toFixed(2)}</p>
    <p>Splitting tip between ${data.splitBetween} people...</p>
    <p>Tip per person: $${data.splitTip.toFixed(2)}</p>
    `;
    // Only show total and tip if not splitting
  } else {
    output.innerHTML = `
    <p>Tip Amount: $${data.tipAmount.toFixed(2)}</p>
    <p>Total: $${data.totalAmount.toFixed(2)}</p>
    `;
  }
}

// Outputs error messages to the page
export function outputErrors(errors, output) {
  // Toggle between error and show
  output.classList.remove("show"); // Removes "show" styling if present
  output.classList.add("error"); // Show the ouput box with "error" styling

  // Join all errors into paragraphs
  output.innerHTML = `
    
    ${errors.map((err) => `<p>${err}<p>`).join("")}
    
  `;
}

// Normalize user input for tip percentages
export function normalizeTipInput(input) {
  if (typeof input == "string") {
    input = input.trim(); //remove any whitespace

    if (input.endsWith("%")) {
      input = input.slice(0, -1); // Remove percent sign if user input, say, 25%
    }
  }

  let num = parseFloat(input);

  // If input still didnt convert to number
  if (isNaN(num) || num <= 0) return 0;

  // Convert percentage to a decimal
  return num / 100;
}

// Validates all user inputs before calculation
export function validateInputs(billAmount, tipPercentage, splitBetween) {
  const errors = [];

  if (billAmount <= 0) errors.push("Bill amount must be greater than 0");
  if (isNaN(billAmount)) errors.push("Please enter a bill amount");
  if (tipPercentage <= 0 || tipPercentage > 1)
    errors.push("Tip % must be between 0 and 100");
  if (splitBetween < 1) errors.push("Split must be at least 1");

  return errors;
}
