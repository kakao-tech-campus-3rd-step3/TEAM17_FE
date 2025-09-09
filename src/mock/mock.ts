import type { StarterPack } from '../types/StartPackType';

export const mockStartPacks: StarterPack[] = [
  {
    id: '1',
    name: '홈오피스 완벽 스타터',
    description: '재택근무에 필요한 모든 것을 한번에!',
    mainImage:
      'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=500',
    originalPrice: 450000,
    salePrice: 320000,
    discountRate: 29,
    products: [
      {
        id: '1-1',
        name: '무선 키보드',
        price: 120000,
        image:
          'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '1-2',
        name: '무선 마우스',
        price: 80000,
        image:
          'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '1-3',
        name: '모니터 스탠드',
        price: 150000,
        image:
          'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '1-4',
        name: 'USB 허브',
        price: 100000,
        image:
          'https://images.pexels.com/photos/163141/android-iphone-firewire-connector-163141.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    rating: 4.8,
    reviewCount: 324,
    category: '오피스',
  },
  {
    id: '2',
    name: '게이밍 입문자 세트',
    description: '게이밍 라이프를 시작하세요!',
    mainImage:
      'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=500',
    originalPrice: 800000,
    salePrice: 600000,
    discountRate: 25,
    products: [
      {
        id: '2-1',
        name: '게이밍 키보드',
        price: 200000,
        image:
          'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '2-2',
        name: '게이밍 마우스',
        price: 150000,
        image:
          'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '2-3',
        name: '게이밍 헤드셋',
        price: 250000,
        image:
          'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '2-4',
        name: '마우스패드',
        price: 50000,
        image:
          'https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '2-5',
        name: 'RGB 조명',
        price: 150000,
        image:
          'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    rating: 4.9,
    reviewCount: 567,
    category: '게이밍',
  },
  {
    id: '3',
    name: '카페 창업 스타터',
    description: '나만의 카페를 시작해보세요!',
    mainImage:
      'https://images.pexels.com/photos/2574831/pexels-photo-2574831.jpeg?auto=compress&cs=tinysrgb&w=500',
    originalPrice: 1200000,
    salePrice: 950000,
    discountRate: 21,
    products: [
      {
        id: '3-1',
        name: '에스프레소 머신',
        price: 500000,
        image:
          'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '3-2',
        name: '원두 그라인더',
        price: 200000,
        image:
          'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '3-3',
        name: '바리스타 도구 세트',
        price: 150000,
        image:
          'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '3-4',
        name: '원두 보관통',
        price: 100000,
        image:
          'https://images.pexels.com/photos/4226905/pexels-photo-4226905.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '3-5',
        name: '디지털 저울',
        price: 80000,
        image:
          'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '3-6',
        name: '스팀 피처',
        price: 70000,
        image:
          'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    rating: 4.7,
    reviewCount: 189,
    category: 'F&B',
  },
  {
    id: '4',
    name: '홈트레이닝 기본템',
    description: '집에서 운동하기 위한 필수템들!',
    mainImage:
      'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=500',
    originalPrice: 350000,
    salePrice: 250000,
    discountRate: 29,
    products: [
      {
        id: '4-1',
        name: '요가매트',
        price: 80000,
        image:
          'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '4-2',
        name: '덤벨 세트',
        price: 120000,
        image:
          'https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '4-3',
        name: '저항밴드',
        price: 50000,
        image:
          'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '4-4',
        name: '운동복 세트',
        price: 100000,
        image:
          'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    rating: 4.6,
    reviewCount: 423,
    category: '헬스',
  },
  {
    id: '5',
    name: '아티스트 드로잉 킷',
    description: '창작의 영감을 현실로 만들어보세요!',
    mainImage:
      'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=500',
    originalPrice: 280000,
    salePrice: 210000,
    discountRate: 25,
    products: [
      {
        id: '5-1',
        name: '드로잉 태블릿',
        price: 150000,
        image:
          'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '5-2',
        name: '색연필 세트',
        price: 50000,
        image:
          'https://images.pexels.com/photos/159644/art-supplies-brushes-rulers-scissors-159644.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '5-3',
        name: '스케치북',
        price: 30000,
        image:
          'https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '5-4',
        name: '지우개 & 연필 세트',
        price: 50000,
        image:
          'https://images.pexels.com/photos/207666/pexels-photo-207666.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    rating: 4.8,
    reviewCount: 298,
    category: '아트',
  },
  {
    id: '6',
    name: '캠핑 초보자 패키지',
    description: '자연 속에서의 첫 캠핑을 준비하세요!',
    mainImage:
      'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=500',
    originalPrice: 600000,
    salePrice: 450000,
    discountRate: 25,
    products: [
      {
        id: '6-1',
        name: '2인용 텐트',
        price: 200000,
        image:
          'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '6-2',
        name: '침낭 세트',
        price: 120000,
        image:
          'https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '6-3',
        name: '랜턴',
        price: 80000,
        image:
          'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '6-4',
        name: '휴대용 버너',
        price: 100000,
        image:
          'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        id: '6-5',
        name: '캠핑 의자',
        price: 100000,
        image:
          'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    rating: 4.5,
    reviewCount: 234,
    category: '아웃도어',
  },
];
