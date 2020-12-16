export const date = () => {
  const zeroFill = (n) => (`0${n}`).slice(-2);

  const now = new Date();

  return `${zeroFill(now.getUTCDate())}/${zeroFill((now.getMonth() + 1))}/${now.getFullYear()}`;
};

export const handle = () => {};

export const numbersToCurrency = (numbers, precision) => {
  const exp = 10 ** precision;

  const float = parseFloat(numbers) / exp;

  const fixed = Math.max(0, Math.min(precision, 20));

  return float.toFixed(fixed);
};

export const onlyNumbers = (value) => {
  if (!value) {
    return '';
  }

  return value.toString().replace(/\D+/g, '') || '0';
};

export const unformat = (value, precision = 2) => {
  const negative = value.indexOf('-') >= 0
    ? -1
    : 1;

  const numbers = onlyNumbers(value);

  const currency = numbersToCurrency(numbers, precision);

  return parseFloat(currency) * negative;
};

export const dateTime = () => {
  const zeroFill = (n) => (`0${n}`).slice(-2);
  const now = new Date();
  return `${date()} | ${zeroFill((now.getHours()))}:${zeroFill(now.getMinutes())}`;
};

export const strMaximumLetters = (str, limit, endString = '...') => {
  if (!str) {
    return '';
  }
  if (str.length > limit) {
    return str.substr(0, limit) + endString;
  }
  return str;
};
