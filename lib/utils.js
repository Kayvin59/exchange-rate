import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
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
    const decimalsValue = new Decimal(inputValue);
    console.log("inputValue:", inputValue);
    console.log("decimalsValue:", decimalsValue);
    let precisionLength = 6;
    const uint256Value = decimalsValue.mul(10 ** 6);
    return uint256Value.toString();
}
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
