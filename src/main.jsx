import { StrictMode } from 'react'
import './index.css'
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from './Router/Router.jsx';



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(

  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


