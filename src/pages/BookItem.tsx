import useToggle from '../hooks/useToggle.ts';
import styled from '@emotion/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { BookList } from '../types/SearchDataTypes.ts';

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
`;

const Left = styled.li`
    display: flex;
    gap: 10px;
    align-items: center;
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

const Right = styled.li`
    display: flex;
    gap: 8px;
    align-items: center;

    button {
        color: #6d7582;
        padding: 13px 20px;
        display: flex;
        min-width: 115px;
        align-items: center;
        justify-content: center;
        height: 48px;
        //gap: 4px;
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

const ItemImg = styled.img<{ isClicked: boolean }>`
    background: red;
    width: ${(props) => (props.isClicked ? '148px' : '48px')};
    height: ${(props) => (props.isClicked ? '148px' : '68px')};
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

const BookItem = ({ book }: { book: BookList }) => {
    const [value, toggle] = useToggle(false);

    return (
        <Item>
            {!value ? (
                <ul>
                    <Left>
                        <ItemImg src={book.thumbnail} isClicked={false} />
                        <TextWrapper>
                            <ItemTitle>{book.title}</ItemTitle>
                            <ItemAuthors>{book.authors.join(', ')}</ItemAuthors>
                        </TextWrapper>
                    </Left>
                    <Right>
                        <ItemTitle>{book.price.toLocaleString()}원</ItemTitle>
                        <button className="text-white">구매하기</button>
                        <button onClick={toggle}>
                            <span>상세보기</span>
                            <KeyboardArrowDownIcon />
                        </button>
                    </Right>
                </ul>
            ) : (
                <ul>
                    <Left>
                        <ItemImg src={book.thumbnail} isClicked={true} />
                        <TextWrapper>
                            <ItemTitle>{book.title}</ItemTitle>
                            <ItemAuthors>{book.authors.join(', ')}</ItemAuthors>
                        </TextWrapper>
                    </Left>
                    <Right>
                        <ItemTitle>{book.price.toLocaleString()}원</ItemTitle>
                        <button className="text-white">구매하기</button>
                        <button onClick={toggle}>
                            <span>상세보기</span>
                            <KeyboardArrowUpIcon />
                        </button>
                    </Right>
                </ul>
            )}
        </Item>
    );
};

export default BookItem;
