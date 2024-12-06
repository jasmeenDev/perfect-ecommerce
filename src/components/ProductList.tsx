import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getProducts } from "../store/productSlice";
import { AppDispatch } from "../store/store";
import { add } from "../store/cartSlice";
import CustomModal from "../util/custom/CustomModal";
import AddProduct from "../components/AddProduct"; // Import the modal component
import { CartItem } from "../types/productlist-type";
const ProductList: React.FC = () => {
  const [viewedProduct, setViewedProduct] = useState<CartItem | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false); // AddProductModal state
  const dispatch = useDispatch<AppDispatch>();
  const { data: products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const addToCart = (product: CartItem) => {
    dispatch(add(product));
  };

  const handleView = (product: CartItem) => {
    setViewedProduct(product);
  };

  const handleCloseView = () => {
    setViewedProduct(null);
  };

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true); // Open AddProductModal
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false); // Close AddProductModal
  };

  return (
    <>
      {loading && <p>Loading</p>}
      {!loading && (
        <div className="w-full h-full py-5">
          <div className="container mx-auto">
            <div className="flex justify-end mb-4">
              <button onClick={handleAddProduct} className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300">
                + Add Product
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="p-6 rounded-lg shadow-md border hover:shadow-lg transition duration-300 bg-white">
                    <div className="flex justify-center mb-4">
                      <img src={product.image} alt={product.title} className="w-32 h-32 object-contain" />
                    </div>
                    <div className="text-center">
                      <h2 className="truncate text-lg font-semibold text-gray-800">{product.title}</h2>
                      <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={() => handleView(product)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No products available.</div>
              )}
            </div>

            {/* Product View Modal */}
            <CustomModal viewedProduct={viewedProduct} handleCloseView={handleCloseView} addToCart={addToCart} />

            {/* Add Product Modal */}
            <AddProduct isOpen={isAddProductModalOpen} onClose={closeAddProductModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
