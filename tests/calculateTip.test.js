import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  handleTipInput,
  updateCustomInputDisplay,
  calculateTip,
  outputErrors,
  outputData,
  normalizeTipInput,
  validateInputs,
} from "../modules/tip-calculator.js";

// handleTipInput======================================================================
describe("handleTipInput", () => {
  it("returns preset tip value when not custom", () => {
    const selectedTipOption = { value: "15" }; // 15% selected in dropdown
    const customTipInput = { value: "25" };
    expect(handleTipInput(selectedTipOption, customTipInput)).toBe(0.15);
  });

  it("returns custom tip value when custom selected", () => {
    const selectedTipOption = { value: "C" }; // Custom selected in dropdown
    const customTipInput = { value: "25" };
    expect(handleTipInput(selectedTipOption, customTipInput)).toBe(0.25);
  });

  it("handles percentage strings like '25%'", () => {
    const selectedTipOption = { value: "C" };
    const customTipInput = { value: "25%" };
    expect(handleTipInput(selectedTipOption, customTipInput)).toBeCloseTo(0.25);
  });
});
// ===================================================================================

// updateCustomInputDisplay===========================================================
describe("updateCustomInputDisplay", () => {
  let selectMock;
  let customInputMock;

  beforeEach(() => {
    // Reset mock elements before each test
    selectMock = { value: "", classList: { add: vi.fn(), remove: vi.fn() } };
    customInputMock = { classList: { add: vi.fn(), remove: vi.fn() } };
  });

  it("should add 'show' class when selectedTipOption value is 'C'", () => {
    selectMock.value = "C";

    updateCustomInputDisplay(selectMock, customInputMock);

    expect(customInputMock.classList.add).toHaveBeenCalledWith("show");
    expect(customInputMock.classList.remove).not.toHaveBeenCalled();
  });

  it("should remove 'show' class when selectedTipOption value is not 'C'", () => {
    selectMock.value = "10";

    updateCustomInputDisplay(selectMock, customInputMock);

    expect(customInputMock.classList.remove).toHaveBeenCalledWith("show");
    expect(customInputMock.classList.add).not.toHaveBeenCalled();
  });
});
// ===================================================================================

// calculateTip=======================================================================
describe("calculateTip", () => {
  it("calculates correct tip, split, and total", () => {
    const result = calculateTip(100, 0.2, 4);
    expect(result.tipAmount).toBeCloseTo(20);
    expect(result.splitTip).toBeCloseTo(5);
    expect(result.totalAmount).toBeCloseTo(120);
  });
});
// ===================================================================================

// outputData=========================================================================
describe("outputData", () => {
  it("outputs correct HTML when splitting between multiple people", () => {
    const mockOutput = {
      classList: { add: () => {}, remove: () => {} },
      innerHTML: "",
    };
    const data = {
      billAmount: 100,
      tipPercentage: 0.2,
      tipAmount: 20,
      splitTip: 5,
      splitBetween: 4,
      totalAmount: 120,
    };

    outputData(data, mockOutput);

    expect(mockOutput.innerHTML).toContain("Tip Amount: $20.00");
    expect(mockOutput.innerHTML).toContain("Total: $120.00");
    expect(mockOutput.innerHTML).toContain("Splitting tip between 4 people");
    expect(mockOutput.innerHTML).toContain("Tip per person: $5.00");
  });

  it("outputs correct HTML when splitBetween is 1", () => {
    const mockOutput = {
      classList: { add: () => {}, remove: () => {} },
      innerHTML: "",
    };
    const data = {
      billAmount: 50,
      tipPercentage: 0.1,
      tipAmount: 5,
      splitTip: 5,
      splitBetween: 1,
      totalAmount: 55,
    };

    outputData(data, mockOutput);

    expect(mockOutput.innerHTML).toContain("Tip Amount: $5.00");
    expect(mockOutput.innerHTML).toContain("Total: $55.00");
    expect(mockOutput.innerHTML).not.toContain("Tip per person");
    expect(mockOutput.innerHTML).not.toContain("Splitting tip");
  });
});
// ===================================================================================

// outputErrors=======================================================================
describe("outputErrors", () => {
  it("renders errors as <p> elements", () => {
    const mockOutput = {
      classList: { add: () => {}, remove: () => {} },
      innerHTML: "",
    };

    outputErrors(["Error 1", "Error 2"], mockOutput);

    expect(mockOutput.innerHTML).toContain("<p>Error 1<p>");
    expect(mockOutput.innerHTML).toContain("<p>Error 2<p>");
  });
});
// ===================================================================================

// normalizeTipInput==================================================================
describe("normalizeTipInput", () => {
  it("handles number input", () => {
    expect(normalizeTipInput(0.3)).toBe(0.003);
  });

  it("handles whole percentage number", () => {
    expect(normalizeTipInput(25)).toBe(0.25);
  });

  it("handles string with percent sign", () => {
    expect(normalizeTipInput("25%")).toBe(0.25);
  });

  it("returns 0 for invalid input", () => {
    expect(normalizeTipInput("abc")).toBe(0);
  });
});
// ===================================================================================

// validateInputs=====================================================================
describe("validateInputs", () => {
  it("returns no errors for valid inputs", () => {
    expect(validateInputs(100, 0.2, 2)).toEqual([]);
  });

  it("detects bill amount <= 0", () => {
    expect(validateInputs(0, 0.2, 2)).toContain(
      "Bill amount must be greater than 0"
    );
  });

  it("detects tip percentage out of range", () => {
    expect(validateInputs(100, 150, 2)).toContain(
      "Tip % must be between 0 and 100"
    );
    expect(validateInputs(100, -1, 2)).toContain(
      "Tip % must be between 0 and 100"
    );
  });

  it("detects split less than 1", () => {
    expect(validateInputs(100, 0.2, 0)).toContain("Split must be at least 1");
  });
});
// ===================================================================================
