import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Applayout";
import LandingPage from "./Pages/LandingPage";


function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
      },
    ],
  },
]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
