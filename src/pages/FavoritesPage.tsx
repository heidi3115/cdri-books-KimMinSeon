import styled from '@emotion/styled';
import bookIcon from '../assets/icon_book.png';

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

const FavoritesPage = () => {
    const hasResults = false;

    return (
        <Wrapper>
            <Title>내가 찜한 책</Title>
            <BookCount>
                <span>찜한 책 총</span>
                <span>
                    총<ColoredText>0</ColoredText>건
                </span>
            </BookCount>
            <Contents hasResults={hasResults}>
                {hasResults ? (
                    <>
                        <div></div>
                    </>
                ) : (
                    <NoResults>
                        <img src={bookIcon} alt="책 아이콘" />
                        <span>찜한 책이 없습니다.</span>
                    </NoResults>
                )}
            </Contents>
        </Wrapper>
    );
};

export default FavoritesPage;
