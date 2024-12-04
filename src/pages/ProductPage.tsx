import { useLoaderData } from "react-router-dom";
import ProductList from "../components/ProductList";

const ProductPage: React.FC = () => {
  const prod = useLoaderData();
  return (
    <>
      <ProductList products={prod} />
    </>
  );
};

export default ProductPage;
