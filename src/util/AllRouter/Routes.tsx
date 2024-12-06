import { createBrowserRouter } from "react-router-dom";
import Rootlayout from "../../pages/Rootlayout";
import Home from "../../components/Home";
import About from "../../components/About";
// import { productListLoader } from "../Get";
import ProductPage from "../../pages/ProductPage";
import Cart from "../../cart/Cart";
import AddProduct from "../../components/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <ProductPage />,
        // loader: productListLoader,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
]);
export default router;
