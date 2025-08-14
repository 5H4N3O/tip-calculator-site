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
  const tipAmount = (billAmount * tipPercentage) / splitBetween;
  const totalAmount = billAmount + tipAmount;

  const processedData = {
    billAmount: billAmount,
    tipPercentage: tipPercentage,
    tipAmount: tipAmount,
    splitBetween: splitBetween,
    totalAmount: totalAmount
  };

  return processedData;
}
