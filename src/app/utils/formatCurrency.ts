const currencyFormatter = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}
