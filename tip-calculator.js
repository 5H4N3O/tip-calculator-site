//let billAmount = null;
//let tipPercentage = null;
let splitBetween = 1;

const customTipInput = document.getElementById("custom-tip-input");
const selectedTipOption = document.getElementById("tip-selection");

function extractBillAmount() {
  const billInput = document.getElementById("bill-input").value;
  const billAmount = parseFloat(billInput);
  return billAmount;
}

function extractTipPercentage() {
  const tipInput =
    selectedTipOption.value === "C"
      ? document.getElementById("custom-tip-input").value // if true
      : document.getElementById("tip-selection").value; // if false

  const tipPercentage = parseFloat(tipInput);
  return tipPercentage;
}

function extractSplitBetween() {
  const splitBetweenInput = document.getElementById("split-input").value;
  const splitBetween = parseInt(splitBetweenInput);
  return splitBetween;
}

function updateCustomInputDisplay() {
  customTipInput.style.display =
    selectedTipOption.value === "C" ? "inline" : "none";
}

function calculateTip() {
  const billAmount = extractBillAmount();
  const tipPercentage = extractTipPercentage();
  const splitBetween = extractSplitBetween();

  const tipAmount = (billAmount * tipPercentage) / splitBetween;

  const totalAmount = billAmount + tipAmount;

  document.getElementById("output").innerHTML = `
    <p>This is a test of outputting the calculated tip<p>
    <p>Bill: $${billAmount.toFixed(2)}<p>
    <p>Tip(${tipPercentage}) amount split between 
    ${splitBetween} people: $${tipAmount.toFixed(2)}<p>
    <p>Total: $${totalAmount.toFixed(2)}<p>
    `;
}
