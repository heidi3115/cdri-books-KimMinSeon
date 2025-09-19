# cdri-books-KimMinSeon

## 프로젝트 개요
- Kakao Book Search API 활용 도서 검색 웹사이트
- React, TypeScript, Vite
- LocalStorage: 찜하기 및 검색기록 저장
- 사용자 검색어에 따른 도서 조회 및 결과 페이징
- 상세 검색 옵션 제공 (저자, 출판사 등)
- 찜하기 기능을 통한 목록 관리

## 실행 방법 및 환경 설정
1. Node.js v20 이상 사용 (nvm use 20)
2. 의존성 설치
```bash
   npm install
```
3. 개발 서버 실행 
```bash
   npm run dev
```
4. 브라우저에서 http://localhost:5173 접속

## 폴더 구조 및 설명
```bash
├── src
│   ├── api
│   │    └─ api.ts                  # Kakao Book Search API 호출
│   ├── assets
│   │    └─ icon_book.png             # 결과 없을 시 책 아이콘
│   ├── components
│   │    ├─ Icons                     # 아이콘 디렉토리
│   │    ├─ BookItem.tsx              # 검색 결과 개별 도서 컴포넌트
│   │    ├─ CommonPopOver.tsx         # 상세 검색 팝오버 컴포넌트
│   │    └─ LoadingCircle.tsx         # 로딩 표시 컴포넌트
│   ├── constants
│   │    └─ commonConstants.ts        # 공통 상수 정의(PAGE_SIZE)
│   ├── hooks
│   │    ├─ useBookSearch.ts          # 도서 검색 커스텀 훅 (Tanstack-query)
│   │    └─ useToggle.ts              # 토글 커스텀 훅
│   ├── pages
│   │    ├─ FavoritesPage.tsx         # 찜한 도서 페이지
│   │    ├─ Main.tsx                  # 메인 페이지 (FavoritesPage와 SearchPage를 조건부 호출하는 역할)
│   │    └─ SearchPage.tsx            # 검색 페이지(첫화면)
│   ├── types
│   │    └─ SearchDataTypes.ts        # API 데이터 타입 정의
│   └── utils
│   │    ├─ favoriteStorage.ts        # 찜 목록 관리
│        └─ searchHistoryStorage.ts   # 검색 기록 관리
├── App.tsx
```

## 라이브러리 (선택 이유)
1. Emotion: Css-in-JS로 컴포넌트 단위 스타일 관리
2. Vite: 빠른 개발 환경
3. MUI: Pagination, Icon 등 기본 제공 컴포넌트 외 일관된 디자인 시스템을 통해 빠르게 UI 구축
4. Eslint: 코드 스타일 및 규칙 검증, 일관된 코드 품질 유지
5. Prettier: 자동 코드 포맷팅으로 코드 가독성과 유지보수성 향상

## 강조하고 싶은 기능
1. Pagination 처리 방식
  - 도서 검색 페이지(ServerSide Pagination): kakao book search API에서 페이지 단위로 데이터가 제공, 페이지 변경 시 API 재호출을 통해 필요 데이터만 받아옴
  - 내가 찜한 책 페이지(ClientSide Pagination): 브라우저 localStorage에 저장된 찜 목록을 기준으로 페이지 단위로 나누어 보여줌
```javascript
// FavoritesPage.tsx

// 찜목록을 PAGE_SIZE로 나누어 pagination 처리
const paginated = favorites.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
const hasResults = favorites.length > 0;
```
2. Search History(검색 기록) 관리
- Localstorage 기반 처리
- 검색어 추가, 이전 검색어 삭제, 불필요한 중복 제거 및 최신 검색어 우선 정렬
- 구현 예시
```javascript
// searchHistoryStorage.ts

const MAX_HISTORY = 8;

// 검색 기록 추가
export const addSearchHistory = (searchText: string) => {
    // 빈 문자열 체크하기
    if (!searchText.trim()) {
        return;
    }

    const historyList = getSearchHistory();
    const filteredHistory = historyList.filter((it: string) => it !== searchText);
    const newHistory = [searchText, ...filteredHistory];
    const maxHistory = newHistory.slice(0, MAX_HISTORY);

    try {
        localStorage.setItem('searchHistory', JSON.stringify(maxHistory));
    } catch (e) {
        console.error(e, '검색 기록 추가 실패');
    }
};
```