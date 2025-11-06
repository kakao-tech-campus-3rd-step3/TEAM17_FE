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

/**
 * 피드 게시물 날짜 포맷팅 (오늘: "11시 38분", 어제 이전: "n일 전")
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export const formatFeedDate = (dateString: string): string => {
  const now = new Date();
  const postDate = new Date(dateString);

  // 오늘인지 확인 (년, 월, 일 비교)
  const isToday =
    now.getFullYear() === postDate.getFullYear() &&
    now.getMonth() === postDate.getMonth() &&
    now.getDate() === postDate.getDate();

  if (isToday) {
    // 오늘 작성된 게시물: "11시 38분" 형식
    const hours = postDate.getHours();
    const minutes = postDate.getMinutes();
    return `${hours}시 ${minutes.toString().padStart(2, '0')}분`;
  }

  // 어제 이전: "n일 전" 형식
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  const diffInDays = Math.floor(diffInSeconds / 86400);

  if (diffInDays === 1) {
    return '어제';
  }

  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks}주 전`;
  }

  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months}개월 전`;
  }

  const years = Math.floor(diffInDays / 365);
  return `${years}년 전`;
};
