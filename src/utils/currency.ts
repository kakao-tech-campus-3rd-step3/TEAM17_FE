export type CurrencyCode = 'KRW' | 'USD' | 'JPY' | (string & {});

type Options = {
  locale?: string;
  currency?: CurrencyCode;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  useGrouping?: boolean;
};

/* 통화별 기본 소수 자릿수 규칙 */
const digitRules: Record<string, { min: number; max: number }> = {
  KRW: { min: 0, max: 0 },
  JPY: { min: 0, max: 0 },
  DEFAULT: { min: 2, max: 2 },
};

function resolveDigits(currency: CurrencyCode, opts: Options) {
  const rule = digitRules[currency] ?? digitRules.DEFAULT;
  return {
    minimumFractionDigits: opts.minimumFractionDigits ?? rule.min,
    maximumFractionDigits: opts.maximumFractionDigits ?? rule.max,
  };
}

export function formatCurrency(
  value: number | bigint | null | undefined,
  opts: Options = {}
): string {
  const v = typeof value === 'bigint' ? Number(value) : value ?? 0;

  const locale = opts.locale ?? 'ko-KR';
  const currency = opts.currency ?? ('KRW' as CurrencyCode);
  const digits = resolveDigits(currency, opts);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: opts.currencyDisplay ?? 'symbol',
    useGrouping: opts.useGrouping ?? true,
    ...digits,
  }).format(v);
}

export function formatCurrencyParts(value: number, opts: Options = {}) {
  const locale = opts.locale ?? 'ko-KR';
  const currency = opts.currency ?? ('KRW' as CurrencyCode);
  const digits = resolveDigits(currency, opts);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: opts.currencyDisplay ?? 'symbol',
    useGrouping: opts.useGrouping ?? true,
    ...digits,
  }).formatToParts(value);
}
