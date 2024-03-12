import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";

// Pages
import { Alumnos } from "../pages/Alumnos";
import { Instructores } from "../pages/Instructores";
import { Vehiculos } from "../pages/Vehiculos";
import { Login } from "../pages/Login";

const router = createBrowserRouter([
    {
        path: "login",
        element: <Login />
    },
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
            },
        ]
    },
]);

export default router;