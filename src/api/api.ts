import axios from 'axios';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

export const kakaoApi = axios.create({
    baseURL: 'https://dapi.kakao.com/v3/search',
    headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        KA: 'sdk/1.39.18 os/javascript lang/ko origin/http://localhost:5173',
    },
});
