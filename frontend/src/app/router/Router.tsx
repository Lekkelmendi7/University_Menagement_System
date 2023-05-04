import { Route, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import UniversityDashboard from "../../features/universities/dashboard/UniversityDashboard";
import UniversityForm from "../../features/universities/form/UniversityForm";
import UniversityDetails from "../../features/universities/details/UniversityDetails";


export const routes: RouteObject[]= [
    {
        path: '/',
        element: <App />,
        children: [ 
            {path: 'universities', element:<UniversityDashboard />},
            {path: 'universities/:id', element:<UniversityDetails />},
            {path: 'createUniversity', element:<UniversityForm key='create' />},
            {path: 'manage/:id', element:<UniversityForm key='manage'/>},
        ]

    }
]

export const router= createBrowserRouter(routes);