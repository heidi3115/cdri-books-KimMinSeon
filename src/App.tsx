import Main from './pages/Main.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { css, Global } from '@emotion/react';

const GlobalStyles = css`
    input:focus,
    button:focus,
    textarea:focus {
        outline: none;
    }
`;

function App() {
    const queryClient = new QueryClient();
    return (
        <>
            <Global styles={GlobalStyles} />
            <QueryClientProvider client={queryClient}>
                <Main />
            </QueryClientProvider>
        </>
    );
}

export default App;
