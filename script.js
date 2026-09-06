/**
 * SkillCraft Technology Internship - Task 01: Temperature Converter
 * Vanilla JavaScript (ES6) logic for temperature conversions and DOM interactions.
 */

// DOM Element references
const tempInput = document.getElementById('temp-input');
const fromUnitSelect = document.getElementById('from-unit');
const toUnitSelect = document.getElementById('to-unit');
const swapBtn = document.getElementById('swap-btn');
const convertBtn = document.getElementById('convert-btn');
const clearBtn = document.getElementById('clear-btn');
const resultContainer = document.getElementById('result-container');
const presetChips = document.querySelectorAll('.chip');

/**
 * Returns the appropriate unit symbol for display.
 * @param {string} unit - Unit name ("Celsius", "Fahrenheit", or "Kelvin")
 * @returns {string} - Symbol string ("°C", "°F", or "K")
 */
function getUnitSymbol(unit) {
  if (unit === 'Celsius') {
    return '°C';
  } else if (unit === 'Fahrenheit') {
    return '°F';
  } else if (unit === 'Kelvin') {
    return 'K';
  }
  return '';
}

/**
 * Generates a human-readable formula breakdown string for the conversion.
 * @param {number} value - Input temperature
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @param {number} result - Converted temperature
 * @returns {string} - Formatted formula text
 */
function getFormulaBreakdown(value, fromUnit, toUnit, result) {
  const targetSymbol = getUnitSymbol(toUnit);
  const formattedResult = result.toFixed(2);

  if (fromUnit === toUnit) {
    return `${value.toFixed(2)} ${targetSymbol} = ${formattedResult} ${targetSymbol}`;
  }

  if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
    return `Formula: (${value} × 9/5) + 32 = ${formattedResult} ${targetSymbol}`;
  }
  if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
    return `Formula: (${value} − 32) × 5/9 = ${formattedResult} ${targetSymbol}`;
  }
  if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
    return `Formula: ${value} + 273.15 = ${formattedResult} ${targetSymbol}`;
  }
  if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
    return `Formula: ${value} − 273.15 = ${formattedResult} ${targetSymbol}`;
  }
  if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
    return `Formula: (${value} − 32) × 5/9 + 273.15 = ${formattedResult} ${targetSymbol}`;
  }
  if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
    return `Formula: (${value} − 273.15) × 9/5 + 32 = ${formattedResult} ${targetSymbol}`;
  }

  return `Formula: ${formattedResult} ${targetSymbol}`;
}

/**
 * Validates the user's raw input against empty, non-numeric, and physical limits.
 * @param {string} rawValue - Raw value from the number input field
 * @param {string} fromUnit - Selected source unit
 * @returns {string|null} - Error message string if invalid, or null if valid
 */
function validateInput(rawValue, fromUnit) {
  // Check for empty or whitespace-only input
  if (rawValue === null || rawValue === undefined || rawValue.trim() === '') {
    return 'Please enter a temperature.';
  }

  // Parse string into a number
  const numValue = Number(rawValue);

  // Check if value is not a valid number
  if (isNaN(numValue)) {
    return 'Please enter a valid temperature.';
  }

  // Absolute zero physical limit validation for selected "From" unit
  if (fromUnit === 'Celsius' && numValue < -273.15) {
    return 'Temperature cannot be below absolute zero.';
  }

  if (fromUnit === 'Fahrenheit' && numValue < -459.67) {
    return 'Temperature cannot be below absolute zero.';
  }

  if (fromUnit === 'Kelvin' && numValue < 0) {
    return 'Temperature cannot be below absolute zero.';
  }

  // Input is valid
  return null;
}

/**
 * Converts a numeric temperature value between Celsius, Fahrenheit, and Kelvin.
 * @param {number} value - Numeric temperature input
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} - Converted numeric value
 */
function convertTemperature(value, fromUnit, toUnit) {
  // Same-unit conversion returns value as-is
  if (fromUnit === toUnit) {
    return value;
  }

  // Conversion calculations
  if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
    return (value * 9 / 5) + 32;
  }
  if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
    return (value - 32) * 5 / 9;
  }
  if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
    return value + 273.15;
  }
  if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
    return value - 273.15;
  }
  if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
    return (value - 32) * 5 / 9 + 273.15;
  }
  if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
    return (value - 273.15) * 9 / 5 + 32;
  }

  return value;
}

/**
 * Renders the successful conversion result and formula breakdown to the DOM.
 * @param {number} value - Calculated target temperature
 * @param {string} fromUnit - Source unit name
 * @param {string} toUnit - Target unit name
 * @param {number} inputValue - Initial input numeric value
 */
function displayResult(value, fromUnit, toUnit, inputValue) {
  const symbol = getUnitSymbol(toUnit);
  const formattedValue = value.toFixed(2);
  const formula = getFormulaBreakdown(inputValue, fromUnit, toUnit, value);
  
  resultContainer.innerHTML = `
    <div class="result-card">
      <span class="result-label">Converted Result</span>
      <span class="result-value">Result: ${formattedValue} ${symbol}</span>
      <span class="result-formula">${formula}</span>
    </div>
  `;
}

/**
 * Renders an error message to the DOM.
 * @param {string} message - Validation error text
 */
function displayError(message) {
  resultContainer.innerHTML = `
    <div class="error-card">
      <span class="error-text">${message}</span>
    </div>
  `;
}

/**
 * Handles the main conversion flow on user action.
 */
function handleConvert() {
  const rawValue = tempInput.value;
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;

  // Perform validation
  const error = validateInput(rawValue, fromUnit);

  if (error) {
    displayError(error);
  } else {
    const numValue = Number(rawValue);
    const result = convertTemperature(numValue, fromUnit, toUnit);
    displayResult(result, fromUnit, toUnit, numValue);
  }
}

/**
 * Swaps the selected "From" and "To" units and re-triggers conversion if input is present.
 */
function swapUnits() {
  const tempFrom = fromUnitSelect.value;
  fromUnitSelect.value = toUnitSelect.value;
  toUnitSelect.value = tempFrom;

  // Re-run conversion if user already entered a value
  if (tempInput.value.trim() !== '') {
    handleConvert();
  }
}

/**
 * Resets form controls, clears messages, and focuses input field.
 */
function clearForm() {
  tempInput.value = '';
  fromUnitSelect.value = 'Celsius';
  toUnitSelect.value = 'Fahrenheit';
  resultContainer.innerHTML = '';
  tempInput.focus();
}

// Event Listeners
convertBtn.addEventListener('click', handleConvert);
clearBtn.addEventListener('click', clearForm);
swapBtn.addEventListener('click', swapUnits);

// Preset Chips Event Listeners
presetChips.forEach(chip => {
  chip.addEventListener('click', () => {
    tempInput.value = chip.getAttribute('data-temp');
    fromUnitSelect.value = chip.getAttribute('data-unit');
    handleConvert();
  });
});

// Allow triggering conversion by pressing Enter while focused on input
tempInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleConvert();
  }
});
