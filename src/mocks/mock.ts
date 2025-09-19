import type { StarterPack } from '@/types/StarterPack';

export const mockStartPacks: StarterPack[] = [
  {
    id: 1,
    name: '홈오피스 완벽 스타터',
    description: '재택근무에 필요한 모든 것을 한번에!',
    cost: 320000,
    parts: [
      ['무선 키보드', '무선 마우스'],
      ['모니터 스탠드', 'USB 허브'],
    ],
    likes: 150,
    mainImage:
      'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=500',
    originalPrice: 450000,
    salePrice: 320000,
    discountRate: 29,
    products: [
      {
        id: 1,
        name: '무선 키보드',
        price: 120000,
        image:
          'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: 2,
        name: '무선 마우스',
        price: 80000,
        image:
          'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: 3,
        name: '모니터 스탠드',
        price: 150000,
        image:
          'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: 4,
        name: 'USB 허브',
        price: 100000,
        image:
          'https://images.pexels.com/photos/163141/android-iphone-firewire-connector-163141.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    reviewCount: 324,
    category: '오피스',
  },
  {
    id: 2,
    name: '게이밍 입문자 세트',
    description: '게이밍 라이프를 시작하세요!',
    cost: 650000,
    parts: [
      ['게이밍 키보드', '게이밍 마우스'],
      ['게이밍 헤드셋', '마우스패드'],
    ],
    likes: 89,
    mainImage:
      'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=500',
    originalPrice: 800000,
    salePrice: 650000,
    discountRate: 19,
    products: [
      {
        id: 5,
        name: '게이밍 키보드',
        price: 200000,
        image:
          'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: 6,
        name: '게이밍 마우스',
        price: 150000,
        image:
          'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: 7,
        name: '게이밍 헤드셋',
        price: 300000,
        image:
          'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    reviewCount: 156,
    category: '게이밍',
  },
  {
    id: 3,
    name: '프리미엄 홈데코 세트',
    description: '집을 더 아름답게 만들어보세요',
    cost: 450000,
    parts: [
      ['인테리어 소품', '조명'],
      ['식물', '액자'],
    ],
    likes: 203,
    mainImage:
      'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=500',
    originalPrice: 600000,
    salePrice: 450000,
    discountRate: 25,
    products: [
      {
        id: 8,
        name: '인테리어 소품',
        price: 200000,
        image:
          'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: 9,
        name: '조명',
        price: 150000,
        image:
          'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: 10,
        name: '식물',
        price: 100000,
        image:
          'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    reviewCount: 89,
    category: '홈데코',
  },
];
