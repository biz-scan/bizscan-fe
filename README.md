# Bizscan Frontend

비즈스캔 프론트엔드 프로젝트입니다.

## 기술 스택

| 카테고리 | 기술 | 버전 | 설명 |
|---------|------|------|------|
| **프레임워크** | React | 19.2.0 | UI 라이브러리 |
| **언어** | TypeScript | 5.9.3 | 타입 안정성 |
| **번들러** | Vite | 7.2.4 | 빠른 개발 서버 & 빌드 |
| **라우팅** | React Router DOM | 7.12.0 | SPA 라우팅 |
| **상태 관리** | Zustand | 5.0.9 | 클라이언트 상태 관리 |
| **서버 상태** | TanStack React Query | 5.90.16 | API 데이터 캐싱 & 동기화 |
| **폼** | React Hook Form | 7.70.0 | 폼 상태 관리 |
| **HTTP** | Axios | 1.13.2 | API 통신 |
| **스타일링** | TailwindCSS | 4.1.18 | 유틸리티 기반 CSS |
| **알림** | Sonner | 2.0.7 | 토스트 알림 |

---

## 시작하기

### 1. 패키지 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하세요:

```env
VITE_API_URL=http://localhost:3000
```

### 3. 개발 서버 실행

```bash
pnpm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

---

## 스크립트 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm run dev` | 개발 서버 실행 (HMR 지원) |
| `pnpm run build` | 프로덕션 빌드 생성 |
| `pnpm run preview` | 빌드된 결과물 미리보기 |
| `pnpm run lint` | ESLint 코드 검사 |
| `pnpm run lint:fix` | ESLint 자동 수정 |

---

## 프로젝트 구조

```
src/
├── apis/                    # API 통신 관련
│   ├── auth/               # 인증 관련 API
│   │   └── auth.ts         # login, signup, logout, getMe 함수
│   ├── axiosInstance.ts    # Axios 설정 (인터셉터, 토큰 자동 주입)
│   ├── query.ts            # useAppQuery, useAppMutation 커스텀 훅
│   └── queryClient.ts      # React Query 클라이언트 설정
│
├── components/              # 재사용 가능한 컴포넌트
│   ├── Button.tsx          # 버튼 컴포넌트
│   └── HomePage/           # 페이지별 컴포넌트 폴더
│       └── HomeInput.tsx   # Input 컴포넌트
│
├── hooks/                   # 커스텀 훅
│   ├── queries/            # 데이터 조회 훅 (useQuery 기반)
│   │   └── useAuthQueries.ts   # useMe()
│   └── mutations/          # 데이터 변경 훅 (useMutation 기반)
│       └── useAuthMutations.ts # useLogin(), useSignup(), useLogout()
│
├── pages/                   # 페이지 컴포넌트
│   ├── HomePage.tsx        # 홈페이지 (/)
│   └── LoginPage.tsx       # 로그인 페이지 (/login)
│
├── layouts/                 # 레이아웃 컴포넌트
│   └── MainLayout.tsx      # Header/Footer 포함 레이아웃
│
├── routes/                  # 라우팅 설정
│   └── index.tsx           # React Router 설정
│
├── types/                   # TypeScript 타입 정의
│   ├── auth.type.ts        # 인증 관련 타입
│   └── query.type.ts       # React Query 관련 타입
│
├── styles/                  # 전역 스타일
│   └── theme.css           # CSS 변수 (색상, 폰트, 간격 등)
│
├── assets/                  # 정적 파일 (이미지, 아이콘 등)
├── constants/               # 상수 정의
├── utils/                   # 유틸리티 함수
│
├── main.tsx                 # 앱 진입점
└── index.css                # 전역 CSS (Tailwind import)
```

---

## 주요 설정 파일 설명

### `eslint.config.mjs` - 코드 품질 검사

ESLint 설정 파일입니다. 다음 규칙들이 적용되어 있습니다:

- **Import 자동 정렬**: `simple-import-sort` 플러그인 사용
  ```
  1순위: react, react-dom
  2순위: @로 시작하는 외부 패키지
  3순위: @/로 시작하는 내부 경로 (절대 경로)
  4순위: ./나 ../로 시작하는 상대 경로
  5순위: CSS 파일
  ```
- **미사용 import 자동 제거**: `unused-imports` 플러그인
- **타입 import 강제**: `import type { ... }` 형식 사용
- **Prettier 통합**: 코드 포맷팅과 린팅 통합

### `.prettierrc` - 코드 포맷팅

```json
{
  "semi": true,           // 세미콜론 사용
  "singleQuote": true,    // 작은따옴표 사용
  "tabWidth": 2,          // 들여쓰기 2칸
  "trailingComma": "es5", // 후행 쉼표
  "printWidth": 100       // 한 줄 최대 100자
}
```

### `tsconfig.json` - TypeScript 설정

- **경로 별칭**: `@/`를 `src/`로 매핑
  ```typescript
  // 사용 예시
  import { Button } from '@/components/Button';
  import { useLogin } from '@/hooks/mutations/useAuthMutations';
  ```
- **엄격 모드**: `strict: true`로 타입 안정성 강화

### `vite.config.ts` - 빌드 설정

- **React 플러그인**: Fast Refresh 지원
- **SVGR 플러그인**: SVG를 React 컴포넌트로 import 가능
  ```typescript
  import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
  // 또는
  import Logo from '@/assets/icons/logo.svg?react';
  ```

### `postcss.config.js` - CSS 처리

- **TailwindCSS v4**: 새로운 엔진 사용 (`@tailwindcss/postcss`)
- **Autoprefixer**: 브라우저 호환성 자동 처리

---

## 아키텍처 가이드

### API 통신 구조

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   컴포넌트       │ -> │  Custom Hook     │ -> │   API 함수      │
│ (LoginPage)     │    │ (useLogin)       │    │ (auth.ts)       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │                        │
                              v                        v
                       ┌──────────────────┐    ┌─────────────────┐
                       │  React Query     │    │  Axios Instance │
                       │ (캐싱 & 상태)    │    │ (인터셉터)       │
                       └──────────────────┘    └─────────────────┘
```

**사용 예시:**

```typescript
// 페이지에서 훅 사용
const { mutate: login, isPending } = useLogin();

login({ email: 'test@test.com', password: '1234' });
```

### Axios 인터셉터

`apis/axiosInstance.ts`에서 다음 기능을 자동 처리합니다:

1. **요청 인터셉터**: localStorage에서 토큰을 읽어 Authorization 헤더에 자동 추가
2. **응답 인터셉터**: 401 에러 시 자동으로 로그인 페이지로 리다이렉트

### React Query 설정

`apis/queryClient.ts`에서 기본 설정:

- `staleTime: 5분` - 데이터가 5분간 fresh 상태 유지
- 에러 발생 시 Sonner 토스트로 자동 알림

---

## CSS 테마 변수

`styles/theme.css`에 정의된 CSS 변수들입니다. Tailwind와 함께 사용하세요.

```css
/* 색상 */
--color-primary: #3B82F6;      /* 메인 컬러 */
--color-secondary: #6B7280;    /* 보조 컬러 */
--color-success: #22C55E;      /* 성공 */
--color-warning: #F59E0B;      /* 경고 */
--color-error: #EF4444;        /* 에러 */

/* 폰트 크기 */
--font-size-xs ~ --font-size-4xl

/* 간격 */
--spacing-1 ~ --spacing-20

/* 테두리 반경 */
--radius-sm ~ --radius-full
```

---

## GitHub 템플릿

### PR 템플릿

PR 생성 시 자동으로 체크리스트가 제공됩니다:
- 버그 수정
- 크로스 브라우징 테스트
- 디자인/마크업
- 기능 추가
- 리팩토링 등

### Issue 템플릿

두 가지 이슈 타입이 준비되어 있습니다:
- **Feature**: 새로운 기능 요청
- **Fix**: 버그 리포트

---

## 개발 컨벤션

### 파일/폴더 네이밍

- **컴포넌트**: PascalCase (`Button.tsx`, `HomePage.tsx`)
- **훅**: camelCase + use 접두사 (`useLogin.ts`, `useAuthQueries.ts`)
- **타입**: camelCase + .type 접미사 (`auth.type.ts`)
- **유틸**: camelCase (`formatDate.ts`)

### Import 순서 (자동 정렬)

```typescript
// 1. React
import { useState } from 'react';

// 2. 외부 라이브러리
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 3. 내부 절대 경로 (@/)
import { Button } from '@/components/Button';
import { useLogin } from '@/hooks/mutations/useAuthMutations';

// 4. 상대 경로
import { HomeInput } from './HomeInput';

// 5. CSS
import './styles.css';
```

### 타입 Import

```typescript
// 타입만 import할 때는 반드시 type 키워드 사용
import type { User, LoginRequest } from '@/types/auth.type';

// 값과 타입을 함께 import할 때
import { login, type LoginResponse } from '@/apis/auth/auth';
```

---

## 문제 해결

### `@/` 경로가 인식되지 않아요

IDE에서 `tsconfig.json`을 다시 로드하세요:
- VSCode: `Cmd/Ctrl + Shift + P` -> `TypeScript: Restart TS Server`

### ESLint 에러가 자동으로 안 고쳐져요

```bash
npm run lint:fix
```

또는 VSCode 설정에서 저장 시 자동 수정 활성화:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```



