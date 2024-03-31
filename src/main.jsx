import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, } from "react-router-dom";

//Router
import router from './routes/router';

//Styles
import './index.css'
import { AuthProvider } from './AuthContext/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  
)
