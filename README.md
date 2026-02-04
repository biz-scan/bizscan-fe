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

> **Note**: 이 프로젝트는 **pnpm**을 패키지 매니저로 사용합니다.

### 0. pnpm 설치 (없는 경우)

```bash
npm install -g pnpm
```

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
│   │   └── auth.ts         # login, signup, logout, getMe, refreshToken 함수
│   ├── axiosInstance.ts    # Axios 설정 (인터셉터, 토큰 자동 갱신)
│   ├── apiHooks.ts         # useAppQuery, useAppMutation 커스텀 훅
│   └── queryClient.ts      # React Query 클라이언트 설정
│
├── components/              # 재사용 가능한 컴포넌트
│   ├── Button.tsx          # 버튼 컴포넌트
│   └── HomePage/           # 페이지별 컴포넌트 폴더
│       └── HomeInput.tsx   # Input 컴포넌트
│
├── hooks/                   # 커스텀 훅
│   └── auth/               # 인증 관련 훅
│       ├── index.ts        # barrel export
│       ├── useLogin.ts     # 로그인
│       ├── useSignup.ts    # 회원가입
│       ├── useLogout.ts    # 로그아웃
│       ├── useMe.ts        # 내 정보 조회
│       └── useUpdateMe.ts  # 내 정보 수정
│
├── lib/                     # 유틸리티 라이브러리
│   ├── tokenStorage.ts     # 토큰 저장소 (localStorage/sessionStorage)
│   └── utils.ts            # 공통 유틸리티 함수
│
├── providers/               # React Provider 컴포넌트
│   └── AuthProvider.tsx    # 인증 상태 초기화 (앱 시작 시 토큰 검증)
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
├── store/                   # Zustand 상태 관리
│   └── useAuthStore.ts     # 인증 상태 (user, isAuthenticated)
│
├── types/                   # TypeScript 타입 정의
│   └── auth.type.ts        # 인증 관련 타입
│
├── styles/                  # 전역 스타일
│   └── theme.css           # CSS 변수 (색상, 폰트, 간격 등)
│
├── assets/                  # 정적 파일 (이미지, 아이콘 등)
├── constants/               # 상수 정의
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
  import { useLogin, useMe } from '@/hooks/auth';
  import { tokenStorage } from '@/lib/tokenStorage';
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

### 인증 시스템 구조

```
┌─────────────────────────────────────────────────────────────────────┐
│                           앱 시작 (main.tsx)                         │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    v
┌─────────────────────────────────────────────────────────────────────┐
│                         AuthProvider                                 │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ 1. tokenStorage.get() → 저장된 토큰 확인                      │    │
│  │ 2. getMe() → 토큰 유효성 검증                                 │    │
│  │ 3. 실패 시 → refreshToken() → 토큰 갱신 시도                  │    │
│  │ 4. 성공 → useAuthStore에 user 정보 저장                       │    │
│  │ 5. 실패 → logout() 처리                                       │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  isInitialized = false 동안 로딩 스피너 표시                         │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    v
┌─────────────────────────────────────────────────────────────────────┐
│                         RouterProvider                               │
│                      (페이지 렌더링 시작)                             │
└─────────────────────────────────────────────────────────────────────┘
```

### API 통신 구조

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  컴포넌트    │ -> │ Custom Hook │ -> │  API 함수   │ -> │   Axios     │
│ (LoginPage) │    │ (useLogin)  │    │ (auth.ts)   │    │ Instance    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                          │                                     │
                          v                                     v
                   ┌─────────────┐                      ┌─────────────┐
                   │ React Query │                      │ Interceptor │
                   │ (캐싱/상태) │                      │ (토큰 처리) │
                   └─────────────┘                      └─────────────┘
```

**사용 예시:**

```typescript
// 페이지에서 훅 사용
import { useLogin } from '@/hooks/auth';

const { mutate: login, isPending } = useLogin({ rememberMe: true });

login({ email: 'test@test.com', password: '1234' });
```

### Axios 인터셉터 (토큰 자동 갱신)

`apis/axiosInstance.ts`에서 다음 기능을 자동 처리합니다:

**1. 요청 인터셉터**
```
모든 요청 → tokenStorage에서 토큰 조회 → Authorization 헤더에 자동 추가
```

**2. 응답 인터셉터 (401 자동 처리)**
```
API 요청 실패 (401 Unauthorized)
        │
        v
refresh 요청 자체가 401? ──Yes──> 로그아웃 → /auth로 이동
        │
        No
        v
이미 refresh 중? ──Yes──> 대기열(Queue)에 추가 → refresh 완료 후 재시도
        │
        No
        v
refresh 토큰으로 새 access 토큰 발급
        │
        v
원래 요청 재시도 (새 토큰 사용)
```

**동시 요청 처리:**
```
요청1 ─── 401 ─── refresh 시작 ════════ 성공! ─── 재시도 ─── 완료
요청2 ─── 401 ─── 대기열 추가 ── 대기중... ─── 재시도 ─── 완료
요청3 ─── 401 ─── 대기열 추가 ── 대기중... ─── 재시도 ─── 완료
                                    ↑
                              processQueue()가
                              대기열 전부 깨움
```

### 토큰 저장소 (tokenStorage)

`lib/tokenStorage.ts`에서 토큰을 관리합니다:

| 옵션 | 저장소 | 설명 |
|------|--------|------|
| `persist: true` | localStorage | 브라우저 닫아도 유지 (로그인 유지 O) |
| `persist: false` | sessionStorage | 탭 닫으면 삭제 (로그인 유지 X) |

```typescript
// 로그인 시
tokenStorage.set(accessToken, rememberMe);  // rememberMe 체크 여부에 따라 저장소 결정

// 조회
tokenStorage.get();  // 자동으로 올바른 저장소에서 조회

// 로그아웃 시
tokenStorage.remove();  // 모든 저장소에서 삭제
```

### Zustand 상태 관리

`store/useAuthStore.ts`에서 인증 상태를 관리합니다:

```typescript
interface AuthState {
  user: User | null;           // 사용자 정보
  isAuthenticated: boolean;    // 로그인 여부
  isInitialized: boolean;      // 앱 초기화 완료 여부

  setAuth: (user, token, persist?) => void;  // 로그인 처리
  setUser: (user) => void;                   // 유저 정보 업데이트
  logout: () => void;                        // 로그아웃 처리
}
```

**zustand persist 사용 시 주의:**
```typescript
// 불필요한 리렌더링 방지를 위해 useShallow 사용 권장
import { useShallow } from 'zustand/react/shallow';

const { user, isAuthenticated } = useAuthStore(
  useShallow((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }))
);
```

### React Query 설정

`apis/queryClient.ts`에서 기본 설정:

- `staleTime: 5분` - 데이터가 5분간 fresh 상태 유지
- 에러 발생 시 Sonner 토스트로 자동 알림
- **React Query Devtools**: 개발 환경에서 우측 하단 버튼으로 캐시 상태 확인 가능

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

### Commit 컨벤션

```
[타입] : 커밋 메시지
```

| 타입 | 설명 |
|------|------|
| `[Feat]` | 새로운 기능 추가 |
| `[Fix]` | 버그 수정 |
| `[Refactor]` | 코드 리팩토링 (기능 변경 없음) |
| `[Style]` | 코드 포맷팅, 세미콜론 누락 등 |
| `[Design]` | UI/UX 디자인 변경 |
| `[Chore]` | 빌드, 설정 파일 수정 |
| `[Docs]` | 문서 수정 |
| `[Test]` | 테스트 코드 추가/수정 |

**예시:**
```
[Feat] : 로그인 페이지 구현
[Fix] : 토큰 만료 시 리다이렉트 오류 수정
[Refactor] : API 호출 로직 분리
[Chore] : ESLint 설정 추가
```

### 파일/폴더 네이밍

- **컴포넌트**: PascalCase (`Button.tsx`, `HomePage.tsx`)
- **훅**: use + camelCase  (`useLogin.ts`, `useAuthQueries.ts`)
- **zustand 스토어**: use + camelCase + Store (`useAuthStore.ts`)
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
import { useLogin, useMe } from '@/hooks/auth';
import { tokenStorage } from '@/lib/tokenStorage';
import useAuthStore from '@/store/useAuthStore';

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



