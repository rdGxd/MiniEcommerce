export interface CurrencyFormatOptions {
  amount: number | bigint | string;
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * Helper para formatar valores monetários de acordo com locale e moeda.
 *
 * @example
 * formatCurrency({ amount: 1234.56 }) // "R$ 1.234,56"
 * formatCurrency({ amount: 1234.56, locale: 'en-US', currency: 'USD' }) // "$1,234.56"
 */
export const formatCurrency = (options: CurrencyFormatOptions): string => {
  const {
    amount,
    locale = 'pt-BR',
    currency = 'BRL',
    minimumFractionDigits,
    maximumFractionDigits,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(Number(amount));
};
