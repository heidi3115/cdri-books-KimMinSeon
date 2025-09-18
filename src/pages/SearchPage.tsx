import { useBookSearch } from '../hooks/useBookSearch.ts';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { BookList } from '../types/SearchDataTypes.ts';
import bookIcon from '../assets/icon_book.png';
import SearchIcon from '../assets/SearchIcon.tsx';
import BookItem from './BookItem.tsx';
import { Pagination, Stack } from '@mui/material';

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

const SearchBar = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    > button {
        background: none;
        border: 1px solid #8d94a0;
        color: #8d94a0;
        padding: 5px;
        width: 72px;
        height: 35px;
        font-size: 14px;
    }
`;

const BookCount = styled.div`
    display: flex;
    gap: 10px;
`;

const SearchBarInputWrapper = styled.div`
    position: relative;
    input {
        width: 420px;
        height: 50px;
        border-radius: 50px;
        border: none;
        background: #f2f4f6;
        padding: 0 10px 0 50px;
    }
    svg {
        position: absolute;
        top: 10px;
        left: 10px;
    }
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

const PAGE_SIZE = 10;

const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const handleChange = (_, value: number) => {
        setPage(value);
    };
    const { data } = useBookSearch(search, page, PAGE_SIZE);
    const hasResults = data && data.documents.length > 0;

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearch(e.target.value);
        }
    };

    return (
        <Wrapper>
            <Title>도서검색</Title>
            <SearchBar>
                <SearchBarInputWrapper>
                    <SearchIcon />
                    <input placeholder="검색어를 입력하세요" onKeyDown={onKeyDown} />
                </SearchBarInputWrapper>
                <button>상세검색</button>
            </SearchBar>
            <BookCount>
                <span>도서 검색 결과</span>
                <span>
                    총<ColoredText>{hasResults ? data.meta.total_count : 0}</ColoredText>건
                </span>
            </BookCount>
            <Contents hasResults={hasResults}>
                {hasResults ? (
                    <div>
                        {data.documents.map((it: BookList) => {
                            return <BookItem key={it.isbn} book={it} />;
                        })}
                    </div>
                ) : (
                    <NoResults>
                        <img src={bookIcon} alt="책 아이콘" />
                        <span>검색된 결과가 없습니다.</span>
                    </NoResults>
                )}
            </Contents>
            {data && data.meta.total_count > 0 && (
                <StyledStack spacing={2}>
                    <Pagination
                        count={Math.ceil(data.meta.total_count / PAGE_SIZE)}
                        page={page}
                        shape="rounded"
                        onChange={handleChange}
                    />
                </StyledStack>
            )}
        </Wrapper>
    );
};

export default SearchPage;
