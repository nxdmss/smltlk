export function rubles(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

export function twoDigits(value: number) {
  return String(value).padStart(2, '0');
}
