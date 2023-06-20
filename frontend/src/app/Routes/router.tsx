import { Navigate, Route, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import UniversityDashboard from "../../features/universities/dashboard/UniversityDashboard";
import UniversityForm from "../../features/universities/form/UniversityForm";
import UniversityDetails from "../../features/universities/details/UniversityDetails";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import FacultyForm from "../../features/faculties/form/FacultyForm";
import FacultyDashboard from "../../features/faculties/dashboard/FacultyDashboard";
import FacultyDetails from "../../features/faculties/details/FacultyDetails";
import SubjectDashboard from "../../features/subjects/dashboard/SubjectDashboard";
import SubjectDetails from "../../features/subjects/details/SubjectDetails";
import SubjectForm from "../../features/subjects/form/SubjectForm";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'universities', element: <UniversityDashboard /> },
            { path: 'universities/:id', element: <UniversityDetails /> },
            { path: 'createUniversity', element: <UniversityForm key='create' /> },
            { path: 'manage/:id', element: <UniversityForm key='manage' /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
            { path: 'homepage', element: <HomePage /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
            { path: 'faculties', element: <FacultyDashboard /> },
            { path: 'faculties/:id', element: <FacultyDetails /> },
            { path: 'createFaculty', element: <FacultyForm key="create" /> },
            { path: 'manageFaculty/:id', element: <FacultyForm key="manage" /> },
            { path: 'subjects', element: <SubjectDashboard /> },
            { path: 'subjects/:id', element: <SubjectDetails /> },
            { path: 'createSubject', element: <SubjectForm key="create" /> },
            { path: 'manageSubject/:id', element: <SubjectForm key="manage" /> }
        ]

    }
]

export const router = createBrowserRouter(routes);