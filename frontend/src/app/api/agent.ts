import axios, {AxiosError, AxiosResponse} from 'axios';
import { University } from '../models/university';
import { toast } from 'react-toastify';
import { router } from '../router/Router';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL= 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {

        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch(status){
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401: 
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('Forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(Error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url:string) => axios.get<T>(url).then(responseBody),
    post: <T>(url:string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url:string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url:string) => axios.delete<T>(url).then(responseBody)
}


const Universities ={
    list: () => requests.get<University[]>('/universities'),
    details: (id: string) => requests.get<University>(`/universities/${id}`),
    create: (university: University) => axios.post<void>('/universities', university),
    update: (university: University) => axios.put<void>(`/universities/${university.id}`, university),
    delete: (id: string) => axios.delete<void>(`/universities/${id}`)
}

const agent = {
    Universities
}

export default agent;

