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
    flex: 0 0 25%;
`;

const Right = styled.div`
    flex: 0 0 50%;
`;

const Blank = styled.div`
    flex: 0 0 25%;
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

const TabGroup = styled.div`
    align-content: center;
`;

const Button = styled.button<{ isClicked: boolean }>`
    background: none;
    border-radius: 0;
    border: none;
    > span {
        padding-bottom: 5px;
        border-bottom: ${(props) => (props.isClicked ? '1px solid #4880EE' : 'none')};
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
                    <TabGroup>
                        <Button isClicked={tab === 'search'} onClick={() => setTab('search')}>
                            <span>도서검색</span>
                        </Button>
                        <Button isClicked={tab === 'favorites'} onClick={() => setTab('favorites')}>
                            <span>내가 찜한 책</span>
                        </Button>
                    </TabGroup>
                </Top>
                <Bottom>{tab === 'search' ? <SearchPage /> : <FavoritesPage />}</Bottom>
            </Right>
            <Blank />
        </Wrapper>
    );
};

export default MyComponent;
