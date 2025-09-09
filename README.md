# Team17\_FE

> 

---

## 👥 팀 소개

|                                 프로필                                |    이름    |    역할    |                  GitHub                 |
| :----------------------------------------------------------------: | :------: | :------: | :-------------------------------------: |
| <img src="https://github.com/ppre1ude.png?size=100" width="100" /> | ppre1ude | Frontend (Team Leader) | [ppre1ude](https://github.com/ppre1ude) |
|  <img src="https://github.com/s_sumin.png?size=100" width="100" /> | s\_sumin | Frontend (Tech Leader) |  [s\_sumin](https://github.com/s_sumin) |


---

## 🚀 시작하기

```bash
# 레포지토리 클론 (SSH)
git clone git@github.com:kakao-tech-campus-3rd-step3/Team17_FE.git

# 또는 HTTPS
# git clone https://github.com/kakao-tech-campus-3rd-step3/Team17_FE.git

# 프로젝트 폴더로 이동
cd Team17_FE

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

> 빌드: `npm run build` · 프리뷰: `npm run preview`

---

## 🌿 브랜치 구조

* **main** : 항상 배포 가능한 상태
* **develop** : 통합 브랜치 (모든 기능이 머지되는 곳)
* **닉네임/기능설명** : 개인 작업 브랜치

  * 예: `ppre1ude/signup`

---

## 🧰 기술 스택

### UI / 프레임워크

* React
* React DOM
* React Router DOM

### 스타일링

* `@emotion/react`, `@emotion/styled` (필요 시 `@emotion/babel-plugin` 사용)
* `styled-components` (페이지/컴포넌트 단위로 병행 사용 가능)
* `pretendard` (웹 폰트)

### 유틸리티 & 아이콘

* `lucide-react`

### 개발 환경 & 품질

* Vite, `@vitejs/plugin-react`
* TypeScript
* ESLint(`@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`), `globals`
* 타입 정의: `@types/react`, `@types/react-dom`, `@types/node`

---

## 🧱 프로젝트 구조 (FSD: Feature‑Sliced Design)

본 프로젝트는 **Feature‑Sliced Design (FSD)** 철학을 따릅니다. 라우팅 단위–도메인 단위–공유 단위로 점진적 모듈화를 지향합니다.

### 상위 계층

* **app/** – 전역 설정(Providers, Router, 전역 스타일 등)
* **pages/** – 라우팅 기준의 화면 단위(여러 feature의 조합)
* **widgets/** – 두 개 이상의 feature/entity를 묶은 UI 블록(헤더, 사이드바 등)
* **features/** – 사용자 가치 중심의 독립 기능(로그인, 댓글 작성 등)
* **entities/** – 도메인 모델(예: User, Post, Mission)
* **shared/** – 범용 컴포넌트, hooks, lib, utils 등 재사용 자원

### 하위 계층(예시)

각 slice 내부는 기술적 분리에 따라 다음 segment로 구성됩니다.

* **api/** – HTTP 클라이언트(axios/fetch), schema-aware 요청 등
* **config/** – 상수와 설정값
* **model/** – 스토어, 검증 스키마, 비즈니스 로직, 타입/인터페이스
* **lib/** – 목적이 명확한 내부 유틸(날짜·색상·텍스트 등 세분화)
* **ui/** – 순수 UI 컴포넌트

> 규칙: 상위 레이어가 하위 레이어에 의존하지 않게, import 경계를 명확히 유지합니다.

---

## 🧪 개발자 패널 (DevPanel)

개발/QA 편의 기능을 화면에 상시 고정 제공합니다.

* **라우팅 패널** – 버튼 하나로 지정 경로로 이동(`react-router-dom`)
* **색상 패널** – 등록된 테마 컬러 미리보기·클립보드 복사
* **글씨 크기 패널** – 디자인 토큰/폰트 사이즈 미리보기 · 실제 px 값 복사

> 스크린샷은 이슈/위키에 추가 예정입니다.

---

## 🔧 환경 변수 & 실행 설정

### 1) 환경 파일 구성

프로젝트 루트에 환경별 `.env` 파일을 생성합니다.

```
.env                 # 공통
.env.development     # 개발 환경
.env.production      # 배포 환경
```

**예시**

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK=true

# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_USE_MOCK=false
```

* `VITE_` 접두사는 **Vite**에서 환경 변수를 노출하기 위해 필수입니다.
* `VITE_USE_MOCK` – MSW(Mock Service Worker) 사용 여부.
* `VITE_API_BASE_URL` – API 기본 엔드포인트.

### 2) 환경값 사용 가이드 (TypeScript)

```ts
const toBool = (v: unknown) => String(v) === 'true';

export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  useMock: toBool(import.meta.env.VITE_USE_MOCK),
} as const;

export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;
```

* `import.meta.env.MODE` → `"development" | "production" | "test"`
* 가독성 향상을 위해 `isDev`, `isProd` 헬퍼를 함께 제공합니다.

---

## ✅ PR 체크리스트 (권장)

* [ ] 기능/수정에 대한 설명이 포함되어 있다
* [ ] 스크린샷/동영상(시각적 변화가 있을 경우)
* [ ] 테스트/빌드 통과
* [ ] 관련 이슈 연결(`#123`)
* [ ] 셀프리뷰 후 린트/포맷 적용(`npm run lint`, `npm run format` 등 팀 스크립트 기준)

---

## 📄 라이선스

사내/학습 프로젝트 성격에 맞게 추후 결정합니다. 오픈소스 공개 시에는 `MIT` 또는 `Apache-2.0`을 고려하세요.

---

### 메모

* 본 문서는 기존 레퍼런스를 참고해 **표현과 구성**을 재정리했습니다. 필요 시 팀 컨텍스트에 맞게 더 간결하게 다듬어도 좋습니다.
