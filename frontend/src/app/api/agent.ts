import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { University } from '../models/university';
import { toast } from 'react-toastify';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';
import { Faculty } from '../models/faculty';
import { router } from '../Routes/router';
import { Subject } from '../models/subject';
import { StudyHall } from '../models/studyhalls';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {

    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
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
            toast.error('forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/not-found');
            break;
    }
    return Promise.reject(error);
})



const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}


const Universities = {
    list: () => requests.get<University[]>('/universities'),
    details: (id: string) => requests.get<University>(`/universities/${id}`),
    create: (university: University) => axios.post<void>('/universities', university),
    update: (university: University) => axios.put<void>(`/universities/${university.id}`, university),
    delete: (id: string) => axios.delete<void>(`/universities/${id}`)
}

const Faculties = {
    list: () => requests.get<Faculty[]>('/faculties'),
    details: (id: string) => requests.get<Faculty>(`/faculties/${id}`),
    create: (faculty: Faculty) => axios.post<void>('/faculties', faculty),
    update: (faculty: Faculty) => axios.put<void>(`/faculties/${faculty.id}`, faculty),
    delete: (id: string) => axios.delete<void>(`/faculties/${id}`)
}

const Subjects = {
    list: () => requests.get<Subject[]>('/subjects'),
    details: (id: string) => requests.get<Subject>(`/subjects/${id}`),
    create: (subject: Subject) => axios.post<void>('/subjects', subject),
    update: (subject: Subject) => axios.put<void>(`/subjects/${subject.id}`, subject),
    delete: (id: string) => axios.delete<void>(`/subjects/${id}`)
}

const StudyHalls = {
    list: () => requests.get<StudyHall[]>('/studyhalls'),
    details: (id: string) => requests.get<StudyHall>(`/studyhalls/${id}`),
    create: (studyHall: StudyHall) => axios.post<void>('/studyhalls', studyHall),
    update: (studyHall: StudyHall) => axios.put<void>(`/studyhalls/${studyHall.id}`, studyHall),
    delete: (id: string) => axios.delete<void>(`/studyhalls/${id}`)
}

const Account = {
    current: (): Promise<User> => requests.get('/account'),
    login: (user: UserFormValues): Promise<User> => requests.post('/account/login', user),
    register: (user: UserFormValues): Promise<User> => requests.post('/account/register', user)
}


const agent = {
    Universities,
    Account,
    Faculties,
    Subjects,
    StudyHalls
}

export default agent;

