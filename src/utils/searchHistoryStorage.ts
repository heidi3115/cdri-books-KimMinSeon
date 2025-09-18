const MAX_HISTORY = 8;

// 검색 기록 가져오기
export const getSearchHistory = () => {
    try {
        const saved = localStorage.getItem('searchHistory');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error(e, '검색 기록 로드 실패');
        return [];
    }
};

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

// 검색 기록 삭제
export const deleteSearchHistory = (searchText: string) => {
    const history = getSearchHistory();
    const newHistory = history.filter((it: string) => it !== searchText);

    try {
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (e) {
        console.error(e, '검색 기록 삭제 실패');
    }
};
