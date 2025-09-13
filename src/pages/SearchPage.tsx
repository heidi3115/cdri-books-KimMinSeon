import { useBookSearch } from '../hooks/useBookSearch.ts';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { BookList } from '../types/SearchDataTypes.ts';
import bookIcon from '../assets/icon_book.png';
import SearchIcon from '../assets/SearchIcon.tsx';

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
const List = styled.div``;
const Item = styled.div`
    > ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        list-style: none;
        padding-bottom: 5px;
        border-bottom: 1px solid #d2d6da;
    }

    .left {
        display: flex;
        gap: 10px;
        align-items: center;
        overflow: hidden;
        max-width: 600px;
    }
    .text-wrapper {
        display: flex;
        flex: 1;
        min-width: 0;

        > span {
            align-content: center;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .right {
        display: flex;
        gap: 8px;
        align-items: center;
    }
`;

const ItemImg = styled.img`
    width: 48px;
    height: 68px;
`;
const ItemTitle = styled.span`
    font-size: 18px;
    font-weight: bold;
    margin: 0 10px;
`;
const ItemAuthors = styled.span`
    color: #6d7582;
    font-size: 15px;
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

const SearchPage = () => {
    const [search, setSearch] = useState('');
    const { data } = useBookSearch(search);
    const hasResults = data && data.documents.length > 0;

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearch(e.target.value);
        }
    };
    console.log(data);

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
            <Contents hasResults={hasResults}>
                {hasResults ? (
                    <>
                        <span>
                            도서 검색 결과 총 <ColoredText>{data.meta.total_count}</ColoredText>건
                        </span>
                        <List>
                            {data.documents.map((it: BookList) => {
                                return (
                                    <Item>
                                        <ul>
                                            <li className="left">
                                                <ItemImg src={it.thumbnail} />
                                                <div className="text-wrapper">
                                                    <ItemTitle>{it.title}</ItemTitle>
                                                    <ItemAuthors>
                                                        {it.authors.join(', ')}
                                                    </ItemAuthors>
                                                </div>
                                            </li>
                                            <li className="right">
                                                <ItemTitle>{it.price.toLocaleString()}원</ItemTitle>
                                                <button>구매하기</button>
                                                <button>상세 보기</button>
                                            </li>
                                        </ul>
                                    </Item>
                                );
                            })}
                        </List>
                    </>
                ) : (
                    <NoResults>
                        <img src={bookIcon} alt="책 아이콘" />
                        <span>검색된 결과가 없습니다.</span>
                    </NoResults>
                )}
            </Contents>
        </Wrapper>
    );
};

export default SearchPage;
