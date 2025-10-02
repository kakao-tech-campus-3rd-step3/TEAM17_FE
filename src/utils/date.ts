/**
 * 한국어 형식으로 날짜를 포맷팅
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (예: "2024. 01. 15.")
 */
export const formatKoreanDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * 상대적 시간을 표시 (예: "3시간 전", "2일 전")
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 상대적 시간 문자열
 */
export const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const targetDate = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '방금 전';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}주 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}년 전`;
};

/**
 * 시간까지 포함한 한국어 형식으로 날짜를 포맷팅
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 포맷팅된 날짜시간 문자열 (예: "2024. 01. 15. 오후 2:30")
 */
export const formatKoreanDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * 간단한 날짜 형식으로 포맷팅 (예: "01/15")
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 간단한 날짜 문자열
 */
export const formatSimpleDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
  });
};
