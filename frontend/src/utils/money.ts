export function formatDollarAmount(pennies: number): string {
  // Convert pennies to dollars
  const dollars = pennies / 100;

  // Format the dollar amount with commas and two decimal places
  return '$' + dollars.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}