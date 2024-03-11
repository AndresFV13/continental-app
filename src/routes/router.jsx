import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";

import { Alumnos } from "../pages/Alumnos";
import { Instructores } from "../pages/Instructores";
import { Vehiculos } from "../pages/Vehiculos";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: < Alumnos />,
                index: true
            },
            {
                path: '/instructores',
                element: < Instructores />,
            },
            {
                path: '/vehiculos',
                element: < Vehiculos />,
            }
        ]
    },
]);

export default router;