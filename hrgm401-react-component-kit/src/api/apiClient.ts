import axios, { AxiosHeaders } from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
});

api.interceptors.request.use(config => {
    if (!config.headers) config.headers = new AxiosHeaders();
    return config;
})

const handleErr = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        console.log(err.response)
        if (err.response) {
            throw {
                status: err.response.status,
                message: err.response.data?.message || '不明なエラーが発生しました。',
                data: err.response.data,
            };
        }
        else if (err.request) {
            throw { message: 'サーバーに接続できませんでした。' };
        } else {
            throw { message: err.message || '通信時にエラーが発生しました' };
        }
    } else {
        throw { message: '予期せぬエラーが発生しました' };
    }
};

export const apiClient = {
    get<T>(url: string, params: any, config = {}) {
        return api.get<T>(url, {...config, params}).catch(handleErr);
    },
    post<T>(url: string, data: any, config = {}) {
        return api.post<T>(url, data, config).catch(handleErr);
    },
    put<T>(url: string, data: any, config = {}) {
        return api.put<T>(url, data, config).catch(handleErr);
    },
    patch<T>(url: string, data: any, config = {}) {
        return api.patch<T>(url, data, config).catch(handleErr);
    },
};