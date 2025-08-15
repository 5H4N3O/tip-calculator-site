export function handleTipInput(selectedTipOption, customTipInput) {
  // Extract tip percentage
  const tipInput =
    selectedTipOption.value === "C"
      ? customTipInput.value
      : selectedTipOption.value;
  return normalizeTipInput(tipInput);
}

export function updateCustomInputDisplay(selectedTipOption, customTipInput) {
    if (selectedTipOption.value === "C") {
      customTipInput.classList.add("show");
    } else {
      customTipInput.classList.remove("show");
    }
}

export function calculateTip(billAmount, tipPercentage, splitBetween, output) {
  const tipAmount = billAmount * tipPercentage;
  const splitTip = tipAmount / splitBetween;
  const totalAmount = billAmount + tipAmount;

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

export function outputData(data, output) {
  // Toggle between error and show
  output.classList.remove("error");
  output.classList.add("show");
  if (data.splitBetween > 1){
  output.innerHTML = `
    <p>Tip Amount: $${data.tipAmount.toFixed(2)}</p>
    <p>Total: $${data.totalAmount.toFixed(2)}</p>
    <p>Splitting tip between ${
      data.splitBetween
    } people...</p>
    <p>Tip per person: $${data.splitTip.toFixed(2)}</p>
    `;
  } else {
    output.innerHTML = `
    <p>Tip Amount: $${data.tipAmount.toFixed(2)}</p>
    <p>Total: $${data.totalAmount.toFixed(2)}</p>
    `;
  }
}

export function outputErrors(errors, output) {
  // Toggle between error and show
  output.classList.remove("show");
  output.classList.add("error");
  output.innerHTML = `
    
    ${errors.map((err) => `<p>${err}<p>`).join("")}
    
  `;
}

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

  // If user input their percentage as whole percent (input: 25 -> 0.25)
  // if (num >= 1) {
  //   num = num / 100;
  // }

  return (num/100);
}

export function validateInputs(billAmount, tipPercentage, splitBetween) {
  const errors = [];

  if (billAmount <= 0) errors.push("Bill amount must be greater than 0");
  if (isNaN(billAmount)) errors.push("Please enter a bill amount");
  if (tipPercentage <= 0 || tipPercentage > 1)
    errors.push("Tip % must be between 0 and 100");
  if (splitBetween < 1) errors.push("Split must be at least 1");

  return errors;
}