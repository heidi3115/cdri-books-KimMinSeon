import { useBookSearch } from '../hooks/useBookSearch.ts';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { BookList } from '../types/SearchDataTypes.ts';

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
    > input {
        width: 480px;
        border-radius: 50px;
        border: none;
        background: #f2f4f6;
        padding: 10px 20px;
    }
    > button {
        background: none;
        border: 1px solid #000;
    }
`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const ColoredText = styled.span`
    color: #4880ee;
`;
const List = styled.div``;
const Item = styled.div`
    > ul {
        display: flex;
        gap: 10px;
        align-items: center;
        border-bottom: 1px solid #d2d6da;
        list-style: none;
        flex-grow: 1;
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

const MyComponent = () => {
    const [search, setSearch] = useState('');
    const { data } = useBookSearch(search);

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
                <input placeholder="검색어를 입력하세요" onKeyDown={onKeyDown} />
                <button>상세 검색</button>
            </SearchBar>
            {data && (
                <Contents>
                    {data.documents.length > 0 ? (
                        <>
                            <span>
                                도서 검색 결과 총 <ColoredText>{data.meta.total_count}</ColoredText>
                                건
                            </span>
                            <List>
                                {data.documents.map((it: BookList) => {
                                    return (
                                        <Item>
                                            <ul>
                                                <li>
                                                    <ItemImg src={it.thumbnail} />
                                                </li>
                                                <li>
                                                    <ItemTitle>{it.title}</ItemTitle>
                                                    <ItemAuthors>
                                                        {it.authors.join(', ')}
                                                    </ItemAuthors>
                                                </li>
                                                <li>
                                                    <ItemTitle>
                                                        {it.price.toLocaleString()}원
                                                    </ItemTitle>
                                                </li>
                                            </ul>
                                        </Item>
                                    );
                                })}
                            </List>
                        </>
                    ) : (
                        <div>검색된 결과가 없습니다.</div>
                    )}
                </Contents>
            )}
        </Wrapper>
    );
};

export default MyComponent;
