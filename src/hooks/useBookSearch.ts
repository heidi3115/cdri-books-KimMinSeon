import { useQuery } from '@tanstack/react-query';
import { kakaoApi } from '../api/api.ts';

export const useBookSearch = (query: string, page = 1, size = 10, target = '') => {
    return useQuery({
        queryKey: ['books', query, page, size],
        queryFn: async () => {
            const res = await kakaoApi.get('/v3/search/book', {
                params: { query, page, size, target },
            });
            return res.data;
        },
        enabled: !!query,
    });
};
