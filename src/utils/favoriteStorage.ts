import type { BookList } from '../types/SearchDataTypes.ts';

export const getFavorites = () => {
    try {
        const saved = localStorage.getItem('favoriteBooks');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error(e, '찜목록 로드 실패');
        return [];
    }
};

export const updateFavorites = (list: BookList) => {
    try {
        localStorage.setItem('favoriteBooks', JSON.stringify(list));
    } catch (e) {
        console.error(e, '찜목록 업데이트 실패');
    }
};

export const isFavorite = (isbn: string) => {
    const favorites = getFavorites();
    return favorites.some((book) => book.isbn === isbn);
};

export const toggleFavorite = (bookData) => {
    const favorites = getFavorites();

    if (favorites.some((book) => book.isbn === bookData.isbn)) {
        const newFavorites = favorites.filter((book) => book.isbn !== bookData.isbn);
        updateFavorites(newFavorites);
        return false;
    } else {
        const newFavorites = [...favorites, bookData];

        updateFavorites(newFavorites);
        return true;
    }
};
