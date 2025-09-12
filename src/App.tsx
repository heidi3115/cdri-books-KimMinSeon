import Main from './pages/Main.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function App() {
    const queryClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Main />
            </QueryClientProvider>
        </>
    );
}

export default App;
