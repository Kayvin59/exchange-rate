import { Decimal } from 'decimal.js';

export function calculateExchange(amount, exchangeRate, direction) {
    if (direction === 'base-to-target') {
      return amount * exchangeRate;
    } else if (direction === 'target-to-base') {
      return amount / exchangeRate;
    }
    return '';
}

export function convertToUINT256(inputValue) {
    // Create a new decimals.js object with the result value.
    const decimalsValue = new Decimal(inputValue);
    console.log("inputValue:", inputValue);
    console.log("decimalsValue:", decimalsValue);
  let precisionLength = 6;
    // Multiply the decimals value by the precision length of the token.
    const uint256Value = decimalsValue.mul(10 ** 6);
  console.log("uint256Value:", uint256Value);
  console.log("uintString:", uint256Value.toString());
  console.log("fixed:", uint256Value.toFixed(6));
    // Return the uint256 value as a string.
    return uint256Value.toString();
  }