import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

const StyledBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 25%;
`;

export default function LoadingCircle({ size = 50 }) {
    return (
        <StyledBox>
            <CircularProgress size={size} />
        </StyledBox>
    );
}
