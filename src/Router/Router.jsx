import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import HomeLayout from "../Layout/HomeLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:
    [
        {
        index:true,
       Component: HomeLayout,
    },
    {
        }
    ]}])