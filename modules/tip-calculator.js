export function handleTipInput(selectedTipOption, customTipInput) {
  // Extract tip percentage
  return parseFloat(selectedTipOption.value === "C" ? customTipInput.value : selectedTipOption.value);
}

export function updateCustomInputDisplay(selectedTipOption, customTipInput){
  // Update the custom input display
  customTipInput.style.display =
    selectedTipOption.value === "C" ? "inline" : "none";
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


