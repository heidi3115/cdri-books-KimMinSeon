import { useQuery } from '@tanstack/react-query';
import { kakaoApi } from '../api/api.ts';

export const useBookSearch = (query: string, page = 1, size = 10) => {
    console.log(query);

    return useQuery({
        queryKey: ['books', query, page, size],
        queryFn: async () => {
            const res = await kakaoApi.get('/book', {
                params: { query, page, size },
            });
            return res.data;
        },
        enabled: !!query,
    });
};
