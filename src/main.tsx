import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import PrivateRoutes from "./Pages/PrivateRoute/privateRoutes.tsx";
import LoginPage from "./Pages/Login/LoginPage.tsx";
import Details from "./Pages/Details/details.tsx";
import NavBar from "./Pages/NavBar/NavBar.tsx";
import FavMovies from "./Pages/FavMovies/favMovies.tsx";
import AddFavMovies from "./Pages/AddFavMovie/AddFavMovie.tsx";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />, // Public login page
  },
  {
    path: "/", // All routes under "/" are private
    element: (
      <>
        <NavBar /> {/* NavBar displayed for all authenticated pages */}
        <PrivateRoutes />
      </>
    ),
    children: [
      { path: "/", element: <App /> },
      { path: "details", element: <Details /> },
      { path: "favorites", element: <FavMovies /> },
      { path: "/add-favorite", element: <AddFavMovies /> },

    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routes} />
);
