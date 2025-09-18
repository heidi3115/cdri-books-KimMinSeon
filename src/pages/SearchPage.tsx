import { useBookSearch } from '../hooks/useBookSearch.ts';
import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import type { BookList } from '../types/SearchDataTypes.ts';
import bookIcon from '../assets/icon_book.png';
import SearchIcon from '../assets/SearchIcon.tsx';
import BookItem from '../components/BookItem.tsx';
import { Pagination, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
    addSearchHistory,
    getSearchHistory,
    deleteSearchHistory,
} from '../utils/searchHistoryStorage.ts';
import CommonPopOver from '../components/CommonPopOver.tsx';
import { PAGE_SIZE } from '../constants/commonConstants.ts';
import LoadingCircle from '../components/LoadingCircle.tsx';

type ReturnFunctionProps = {
    selectedTarget: string;
    searchText: string;
};

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
    align-items: baseline;
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
        font-size: 16px;
        background: #f2f4f6;
        padding: 0 10px 0 50px;
    }
    > svg {
        position: absolute;
        top: 10px;
        left: 10px;
    }
`;

const DetailSearchButton = styled.button`
    color: #8d94a0;
    border: 1px solid #8d94a0;
    padding: 5px 10px;
    height: 35px;
    line-height: 17px;
    :hover {
        border: 1px solid #8d94a0;
    }
`;

const SearchList = styled.div`
    background: #f2f4f6;
    border-radius: 0 0 20px 20px;
    padding: 20px 20px 5px 50px;
    display: flex;
    color: #8d94a0;
    justify-content: space-between;
    margin-top: -20px;
    cursor: pointer;
    svg {
        color: #222222;
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

const SearchPage = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [searchHistory, setSearchHistory] = useState(getSearchHistory());
    const [isOpenHistory, setIsOpenHistory] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [target, setTarget] = useState<string | undefined>();

    const handleChange = (_: any, value: number) => {
        setPage(value);
    };
    const { data, isLoading, isError } = useBookSearch(search, page, PAGE_SIZE, target);
    const hasResults = data && data.documents.length > 0;

    const onKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setTarget(undefined);
            setSearch(inputValue);
            setIsOpenHistory(false);
            addSearchHistory(inputValue);
            setSearchHistory(getSearchHistory());
        }
    };

    const addHistory = (it: string) => {
        addSearchHistory(it);
        setSearchHistory(getSearchHistory());
    };

    const onClickCloseButton = (it: string) => {
        deleteSearchHistory(it);
        setSearchHistory(getSearchHistory());
    };

    const handleDetailSearch = ({ selectedTarget, searchText }: ReturnFunctionProps) => {
        setTarget(selectedTarget);
        setSearch(searchText);
    };

    const renderContents = () => {
        if (isLoading) return <LoadingCircle />;
        if (isError) return <div>검색 중 오류가 발생했습니다.</div>;
        if (hasResults)
            return (
                <div>
                    {data.documents.map((it: BookList) => {
                        return <BookItem key={it.isbn} book={it} />;
                    })}
                </div>
            );
        return (
            <NoResults>
                <img src={bookIcon} alt="책 아이콘" />
                <span>검색된 결과가 없습니다.</span>
            </NoResults>
        );
    };

    return (
        <Wrapper>
            <Title>도서검색</Title>
            <SearchBar>
                <SearchBarInputWrapper>
                    <SearchIcon />
                    <input
                        ref={inputRef}
                        placeholder="검색어를 입력하세요"
                        onKeyDown={onKeyDown}
                        value={inputValue}
                        onFocus={() => setIsOpenHistory(true)}
                        onBlur={() => setIsOpenHistory(false)}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    {isOpenHistory && (
                        <div>
                            {searchHistory.map((it: string) => (
                                <SearchList key={it}>
                                    <span
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            setInputValue(it);
                                            setSearch(it);
                                            setIsOpenHistory(false);
                                            addHistory(it);

                                            inputRef.current?.blur();
                                        }}
                                    >
                                        {it}
                                    </span>
                                    <span>
                                        <CloseIcon
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                onClickCloseButton(it);
                                            }}
                                        />
                                    </span>
                                </SearchList>
                            ))}
                        </div>
                    )}
                </SearchBarInputWrapper>
                <CommonPopOver
                    target={target}
                    trigger={<DetailSearchButton>상세검색</DetailSearchButton>}
                    returnFunction={handleDetailSearch}
                />
            </SearchBar>
            <BookCount>
                <span>도서 검색 결과</span>
                <span>
                    총<ColoredText>{hasResults ? data.meta.total_count : 0}</ColoredText>건
                </span>
            </BookCount>
            <Contents hasResults={hasResults}>{renderContents()}</Contents>
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
