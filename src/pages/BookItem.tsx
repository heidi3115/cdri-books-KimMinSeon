import useToggle from '../hooks/useToggle.ts';
import styled from '@emotion/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { BookList } from '../types/SearchDataTypes.ts';

const Item = styled.div`
    > ul {
        display: flex;
        justify-content: space-between;
        list-style: none;
    }
`;

const Left = styled.li`
    display: flex;
    gap: 10px;
    overflow: hidden;
    max-width: 600px;
`;

const TextWrapper = styled.div`
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
`;

const BookText = styled.div`
    margin: 0 10px;
`;

const Right = styled.li<{ isClicked?: boolean }>`
    display: flex;
    flex-direction: ${(props) => (props.isClicked ? 'column' : 'row')};
    gap: 8px;
    align-items: ${(props) => (props.isClicked ? 'flex-end' : 'center')};
    button {
        color: #6d7582;
        padding: 13px 20px;
        display: flex;
        min-width: 115px;
        align-items: center;
        justify-content: center;
        height: 48px;
        gap: 4px;
        border: none;
    }

    .text-white {
        color: #fff;
        background: #4880ee;
    }

    svg {
        fill: #b1b8c0;
    }
`;

const ItemImg = styled.img<{ isClicked?: boolean }>`
    width: ${(props) => (props.isClicked ? '210px' : '48px')};
    height: ${(props) => (props.isClicked ? '280px' : '68px')};
`;

const ItemTitle = styled.span<{ isCanceled?: boolean }>`
    font-size: 18px;
    font-weight: ${(props) => (props.isCanceled ? '500' : '700')};
    text-decoration: ${(props) => (props.isCanceled ? 'line-through' : 'none')};
    color: ${(props) => props.isCanceled && '#353C49'};
    margin: 0 10px;
`;

const ItemAuthors = styled.span`
    color: #6d7582;
    font-size: 15px;
`;

const PriceDataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: auto;
    gap: 5px;
`;

const PriceText = styled.span`
    display: inline-block;
    font-size: 10px;
    color: #8d94a0;
    width: 37px;
    text-align: right;
`;

const BuyingButton = styled.button`
    width: 240px;
    margin-top: 20px;
`;

const DividerLine = styled.div`
    border: 1px solid #d2d6da;
`;

const BookItem = ({ book }: { book: BookList }) => {
    const [value, toggle] = useToggle(false);

    console.log(book, '북');

    return (
        <Item>
            {!value ? (
                <>
                    <ul>
                        <Left>
                            <ItemImg src={book.thumbnail} />
                            <TextWrapper>
                                <ItemTitle>{book.title}</ItemTitle>
                                <ItemAuthors>{book.authors.join(', ')}</ItemAuthors>
                            </TextWrapper>
                        </Left>
                        <Right>
                            <ItemTitle>{book.price.toLocaleString()}원</ItemTitle>
                            <button className="text-white" onClick={() => window.open(book.url)}>
                                구매하기
                            </button>
                            <button onClick={toggle}>
                                <span>상세보기</span>
                                <KeyboardArrowDownIcon />
                            </button>
                        </Right>
                    </ul>
                    <DividerLine />
                </>
            ) : (
                <>
                    <ul>
                        <Left>
                            <ItemImg src={book.thumbnail} isClicked />
                            <div>
                                <TextWrapper>
                                    <ItemTitle>{book.title}</ItemTitle>
                                    <ItemAuthors>{book.authors.join(', ')}</ItemAuthors>
                                </TextWrapper>
                                <BookText>
                                    <p>책 소개</p>
                                    <span>{book.contents}</span>
                                </BookText>
                            </div>
                        </Left>
                        <Right isClicked>
                            <button onClick={toggle}>
                                <span>상세보기</span>
                                <KeyboardArrowUpIcon />
                            </button>
                            <PriceDataWrapper>
                                <div>
                                    <PriceText>원가</PriceText>
                                    <ItemTitle isCanceled={book.sale_price > 0}>
                                        {book.price.toLocaleString()}원
                                    </ItemTitle>
                                </div>
                                {book.sale_price > 0 && (
                                    <div>
                                        <PriceText>할인가</PriceText>
                                        <ItemTitle>{book.sale_price.toLocaleString()}원</ItemTitle>
                                    </div>
                                )}
                                <BuyingButton
                                    className="text-white"
                                    onClick={() => window.open(book.url)}
                                >
                                    구매하기
                                </BuyingButton>
                            </PriceDataWrapper>
                        </Right>
                    </ul>
                    <DividerLine />
                </>
            )}
        </Item>
    );
};

export default BookItem;
