import { MAX_TAGS, MAX_TAG_LENGTH } from '@/constants/Hashtag';

export const validateTag = (tag: string, tags: string[]): string => {
  const trimmed = tag.trim();

  if (!trimmed) return '해시태그를 입력해주세요.';

  if (tags.length >= MAX_TAGS) return `최대 ${MAX_TAGS}개까지만 추가할 수 있습니다.`;

  if (trimmed.length > MAX_TAG_LENGTH)
    return `해시태그는 ${MAX_TAG_LENGTH}자 이하로 입력해주세요.`;

  if (tags.includes(trimmed)) return '이미 추가된 해시태그입니다.';

  const validPattern = /^[가-힣a-zA-Z0-9]+$/;
  if (!validPattern.test(trimmed)) return '한글(초성만 사용은 불가), 영어, 숫자만 입력 가능합니다.';

  return ''; 
};
