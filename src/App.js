import logo from "./logo.svg";
import "./App.css";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import MainLayout from "./SideNavigation/MainLayout";
import Dash from "./Pases/Dash";
import NotFoundPages from "./Pases/NotFoundPages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "",
          element: <Dash></Dash>,
        },
        {
          path: "*",
          element: <NotFoundPages></NotFoundPages>,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPages></NotFoundPages>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
}

export default App;
