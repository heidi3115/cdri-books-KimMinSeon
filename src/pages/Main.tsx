import { useState } from 'react';
import SearchPage from './SearchPage.tsx';
import FavoritesPage from './FavoritesPage.tsx';
import styled from '@emotion/styled';

const Wrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 20px);
    padding-top: 20px;
    margin: 0;
    display: flex;
`;

const Left = styled.div`
    flex-grow: 1;
`;

const Right = styled.div`
    flex-grow: 2;
`;

const Blank = styled.div`
    flex-grow: 1;
`;

const Top = styled.div`
    display: flex;
    justify-content: center;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
    text-align: center;
`;

const ButtonGroup = styled.div`
    align-content: center;
`;

const Button = styled.button<{ isClicked: boolean }>`
    background: none;
    border-radius: 0;
    border-bottom: ${(props) => (props.isClicked ? '1px solid blue' : 'none')};
    :active {
        border-style: none;
    }
    :hover {
        border-style: none;
    }
`;

const Bottom = styled.div``;

const MyComponent = () => {
    const [tab, setTab] = useState('search');

    return (
        <Wrapper>
            <Left>
                <Title>CERTICOS BOOKS</Title>
            </Left>
            <Right>
                <Top>
                    <ButtonGroup>
                        <Button isClicked={tab === 'search'} onClick={() => setTab('search')}>
                            도서검색
                        </Button>
                        <Button isClicked={tab === 'favorites'} onClick={() => setTab('favorites')}>
                            내가 찜한 책
                        </Button>
                    </ButtonGroup>
                </Top>
                <Bottom>{tab === 'search' ? <SearchPage /> : <FavoritesPage />}</Bottom>
            </Right>
            <Blank />
        </Wrapper>
    );
};

export default MyComponent;
