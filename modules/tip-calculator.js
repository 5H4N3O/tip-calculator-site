export function handleTipInput(selectedTipOption, customTipInput) {
  // Extract tip percentage
  const tipInput = (
    selectedTipOption.value === "C"
      ? customTipInput.value
      : selectedTipOption.value
  );
  return normalizeTipInput(tipInput);
}

export function updateCustomInputDisplay(selectedTipOption, customTipInput){
  // Update the custom input display
  customTipInput.style.display =
    selectedTipOption.value === "C" ? "inline" : "none";
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
    totalAmount: totalAmount
  };

  return processedData;
}

export function outputData(data, output) {
  output.innerHTML = `
    <p>This is a test of outputting the calculated tip<p>
    <p>Bill: $${data.billAmount.toFixed(2)}<p>
    <p>Tip(${data.tipPercentage.toFixed(2)}) amount (${data.tipAmount.toFixed(2)}) split between
    ${data.splitBetween} people: $${data.splitTip.toFixed(2)}<p>
    <p>Total: $${data.totalAmount.toFixed(2)}<p>
    `;
}

export function outputErrors(errors, output) {
  //output.style.display = "block";
  output.innerHTML = `
    <ul>
      ${errors.map((err) => `<li>${err}</li>`).join("")}
    </ul>
  `;
}

export function normalizeTipInput(input) {
  if (typeof input == 'string') {
    input = input.trim(); //remove any whitespace

    if (input.endsWith('%')) {
      input = input.slice(0,-1); // Remove percent sign if user input, say, 25%
    }
  }

  let num = parseFloat(input);

  // If input still didnt convert to number
  if (isNaN(num)) return 0;

  // If user input their percentage as whole percent (input: 25 -> 0.25)
  if (num > 1) {
    num = num / 100;
  }

  return num;
}

export function validateInputs(billAmount, tipPercentage, splitBetween) {
  const errors = [];

  if (billAmount <= 0) errors.push("Bill amount must be greater than 0");
  if (tipPercentage < 0 || tipPercentage > 1)
    errors.push("Tip percentage must be between 0 and 1");
  if (splitBetween < 1) errors.push("Split must be at least 1");

  return errors;
}
