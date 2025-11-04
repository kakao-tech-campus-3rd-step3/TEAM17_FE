import type { StarterPack } from '@/types/StarterPack';

export const mockStartPacks: StarterPack[] = [
  {
    id: 1,
    name: '홈오피스 완벽 스타터',
    description: '재택근무에 필요한 모든 것을 한번에!',
    categoryId: 1,
    categoryName: '오피스',
    price: 320000,
    mainImageUrl:
      'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=500',
    items: [
      {
        name: '무선 키보드',
        linkUrl: 'https://example.com/keyboard',
        description: '무선 키보드',
        imageUrl:
          'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: '무선 마우스',
        linkUrl: 'https://example.com/mouse',
        description: '무선 마우스',
        imageUrl:
          'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: '모니터 스탠드',
        linkUrl: 'https://example.com/stand',
        description: '모니터 스탠드',
        imageUrl:
          'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: 'USB 허브',
        linkUrl: 'https://example.com/hub',
        description: 'USB 허브',
        imageUrl:
          'https://images.pexels.com/photos/163141/android-iphone-firewire-connector-163141.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    hashtags: [],
    likeCount: 150,
    bookmarkCount: 45,
    commentCount: 324,
    authorNickname: '오피스마스터',
    memberId: 1,
  },
  {
    id: 2,
    name: '게이밍 입문자 세트',
    description: '게이밍 라이프를 시작하세요!',
    categoryId: 2,
    categoryName: '게이밍',
    price: 650000,
    mainImageUrl:
      'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=500',
    items: [
      {
        name: '게이밍 키보드',
        linkUrl: 'https://example.com/gaming-keyboard',
        description: '게이밍 키보드',
        imageUrl:
          'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: '게이밍 마우스',
        linkUrl: 'https://example.com/gaming-mouse',
        description: '게이밍 마우스',
        imageUrl:
          'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: '게이밍 헤드셋',
        linkUrl: 'https://example.com/gaming-headset',
        description: '게이밍 헤드셋',
        imageUrl:
          'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    hashtags: [],
    likeCount: 89,
    bookmarkCount: 32,
    commentCount: 156,
    authorNickname: '게이머',
    memberId: 2,
  },
  {
    id: 3,
    name: '프리미엄 홈데코 세트',
    description: '집을 더 아름답게 만들어보세요',
    categoryId: 3,
    categoryName: '홈데코',
    price: 450000,
    mainImageUrl:
      'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=500',
    items: [
      {
        name: '인테리어 소품',
        linkUrl: 'https://example.com/decor',
        description: '인테리어 소품',
        imageUrl:
          'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: '조명',
        linkUrl: 'https://example.com/lighting',
        description: '조명',
        imageUrl:
          'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: '식물',
        linkUrl: 'https://example.com/plant',
        description: '식물',
        imageUrl:
          'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    hashtags: [],
    likeCount: 203,
    bookmarkCount: 89,
    commentCount: 89,
    authorNickname: '인테리어러버',
    memberId: 3,
  },
];
