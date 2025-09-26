// 지원하는 통화 코드
export type CurrencyCode = 'KRW' | 'USD' | 'JPY' | 'EUR' | 'GBP' | 'CNY' | 'VND';

// 로케일 정책
export type SupportedLocale = 'ko-KR' | 'en-US' | 'ja-JP' | 'zh-CN';

interface CurrencyFormatOptions {
  locale?: SupportedLocale;
  currency?: CurrencyCode;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  useGrouping?: boolean;
}

const CURRENCY_DIGIT_RULES: Record<CurrencyCode, { min: number; max: number }> = {
  KRW: { min: 0, max: 0 },
  JPY: { min: 0, max: 0 },
  VND: { min: 0, max: 0 },

  // 서구 통화들: 소수점 2자리
  USD: { min: 2, max: 2 },
  EUR: { min: 2, max: 2 },
  GBP: { min: 2, max: 2 },
  CNY: { min: 2, max: 2 },
} as const;

// 기본값 상수 (한국 기준으로 통일)
const DEFAULT_LOCALE: SupportedLocale = 'ko-KR';
const DEFAULT_CURRENCY: CurrencyCode = 'KRW';

function resolveFractionDigits(currency: CurrencyCode, options: CurrencyFormatOptions) {
  const rule = CURRENCY_DIGIT_RULES[currency];
  return {
    minimumFractionDigits: options.minimumFractionDigits ?? rule.min,
    maximumFractionDigits: options.maximumFractionDigits ?? rule.max,
  };
}

export function formatCurrency(value: number, options: CurrencyFormatOptions = {}): string {
  const locale = options.locale ?? DEFAULT_LOCALE;
  const currency = options.currency ?? DEFAULT_CURRENCY;
  const fractionDigits = resolveFractionDigits(currency, options);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: options.currencyDisplay ?? 'symbol',
    useGrouping: options.useGrouping ?? true,
    ...fractionDigits,
  }).format(value);
}

export function formatCurrencyParts(
  value: number,
  options: CurrencyFormatOptions = {}
): Intl.NumberFormatPart[] {
  const locale = options.locale ?? DEFAULT_LOCALE;
  const currency = options.currency ?? DEFAULT_CURRENCY;
  const fractionDigits = resolveFractionDigits(currency, options);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: options.currencyDisplay ?? 'symbol',
    useGrouping: options.useGrouping ?? true,
    ...fractionDigits,
  }).formatToParts(value);
}

export function isSupportedCurrency(code: string): code is CurrencyCode {
  return code in CURRENCY_DIGIT_RULES;
}

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  const supportedLocales: SupportedLocale[] = ['ko-KR', 'en-US', 'ja-JP', 'zh-CN'];
  return supportedLocales.includes(locale as SupportedLocale);
}

export function getCurrencyDigitRules(currency: CurrencyCode): { min: number; max: number } {
  return CURRENCY_DIGIT_RULES[currency];
}
