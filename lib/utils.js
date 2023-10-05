export function calculateExchange(amount, exchangeRate, direction) {
    if (direction === 'base-to-target') {
      return amount * exchangeRate;
    } else if (direction === 'target-to-base') {
      return amount / exchangeRate;
    }
    return '';
}