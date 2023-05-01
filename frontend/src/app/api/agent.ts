import axios, {AxiosResponse} from 'axios';
import { University } from '../models/university';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL= 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
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

