import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store"; // Import RootState to type your selectors
import { getProducts } from "../store/productSlice";

import { CartItem } from "../types/productlist-type";
import { AppDispatch } from "../store/store";
import { add } from "../store/cartSlice";
import CustomModal from "../util/custom/CustomModal";
const ProductList: React.FC = () => {
  const [viewedProduct, setViewedProduct] = useState<CartItem | null>(null);

  const dispatch = useDispatch<AppDispatch>(); // Use the useDispatch hook to dispatch actions
  const { data: products, loading } = useSelector(
    (state: RootState) => state.products // Use "products" instead of "product"
  );

  useEffect(() => {
    dispatch(getProducts()); // Fetch products when the component mounts
  }, [dispatch]);

  const addToCart = (product: CartItem) => {
    console.log(product);
    dispatch(add(product)); // Dispatch the action correctly
  };
  const handleView = (product: CartItem) => {
    setViewedProduct(product); // Set the selected product to be viewed
  };

  const handleCloseView = () => {
    setViewedProduct(null); // Close the view mode by resetting to null
  };

  return (
    <>
      {loading && <p>Loading</p>}
      {!loading && (
        <div className="w-full h-full  py-5">
          <div className="container mx-auto">
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300 bg-white">
                    {/* Product Image */}
                    <div className="flex justify-center mb-4">
                      <img src={product.image} alt={product.title} className="w-32 h-32 object-contain" />
                    </div>

                    {/* Product Info */}
                    <div className="text-center">
                      <h2
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          fontSize: "1.125rem",
                          fontWeight: "600",
                          color: "#4b5563",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {product.title}
                      </h2>
                      <p className="text-green-600 font-bold text-lg">${product.price.toFixed(2)}</p>
                    </div>

                    {/* View and Add to Cart Buttons */}
                    <div className="mb-4 text-center ">
                      <button
                        onClick={() => handleView(product)}
                        className="bg-blue-500 mb-6 text-white px-6 py-2 rounded-md hover:bg-green-600 active:bg-green-700 transition duration-300 mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 text-white   px-6 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center py-6 text-gray-500 font-medium">
                  No products available.
                </div>
              )}
            </div>

            {/* Product View Modal */}
            <div>
              <CustomModal viewedProduct={viewedProduct} handleCloseView={handleCloseView} addToCart={addToCart} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
