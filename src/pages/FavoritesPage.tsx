import styled from '@emotion/styled';
import bookIcon from '../assets/icon_book.png';
import BookItem from '../components/BookItem.tsx';
import { getFavorites } from '../utils/favoriteStorage.ts';
import type { BookList } from '../types/SearchDataTypes.ts';
import { useEffect, useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import { PAGE_SIZE } from '../constants/commonConstants.ts';

const Wrapper = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Title = styled.div`
    font-size: 22px;
    font-weight: 700;
`;

const Contents = styled.div<{ hasResults: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 500px;
    ${({ hasResults }) =>
        !hasResults &&
        ` 
    justify-content: center;`}
`;

const ColoredText = styled.span`
    color: #4880ee;
`;

const BookCount = styled.div`
    display: flex;
    gap: 10px;
`;

const NoResults = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    > img {
        width: 80px;
        height: 80px;
    }
    align-items: center;
`;

const StyledStack = styled(Stack)`
    margin: 0 auto;
`;

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<BookList[]>([]);
    const [page, setPage] = useState(1);

    // 찜목록을 PAGE_SIZE로 나누어 pagination 처리
    const paginated = favorites.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const hasResults = favorites.length > 0;

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const handleChange = () => {
        setFavorites(getFavorites());
    };
    const handlePageChange = (_: any, value: number) => {
        setPage(value);
    };

    return (
        <Wrapper>
            <Title>내가 찜한 책</Title>
            <BookCount>
                <span>찜한 책 총</span>
                <span>
                    총<ColoredText>{favorites.length}</ColoredText>건
                </span>
            </BookCount>
            <Contents hasResults={hasResults}>
                {hasResults ? (
                    <>
                        {paginated.map((it: BookList) => {
                            return <BookItem book={it} key={it.isbn} handleChange={handleChange} />;
                        })}
                    </>
                ) : (
                    <NoResults>
                        <img src={bookIcon} alt="책 아이콘" />
                        <span>찜한 책이 없습니다.</span>
                    </NoResults>
                )}
            </Contents>
            {favorites.length > 0 && (
                <StyledStack spacing={2}>
                    <Pagination
                        count={Math.ceil(favorites.length / PAGE_SIZE)}
                        page={page}
                        shape="rounded"
                        onChange={handlePageChange}
                    />
                </StyledStack>
            )}
        </Wrapper>
    );
};

export default FavoritesPage;
