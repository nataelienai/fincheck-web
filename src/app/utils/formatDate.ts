const dateFormatter = new Intl.DateTimeFormat('pt-br');

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}
