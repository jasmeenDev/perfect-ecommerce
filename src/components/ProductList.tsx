import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store"; // Import RootState to type your selectors
import { getProducts } from "../store/productSlice";

import { CartItem } from "../types/productlist-type";
import { AppDispatch } from "../store/store";
import { add } from "../store/cartSlice";
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
        <div className="w-full h-full bg-gray-200 shadow-md">
          <div className="container mx-auto">
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white">
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
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => handleView(product)}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-green-600 active:bg-green-700 transition duration-300 mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-300"
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
            {viewedProduct && (
              <div
                className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
                onClick={(e) => {
                  if (e.target === e.currentTarget) handleCloseView(); // Close when clicking outside
                }}
              >
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative" id="cartModal">
                  {/* Close Button */}
                  <button onClick={handleCloseView} className="text-gray-500 hover:text-gray-800 absolute top-2 right-2 text-2xl">
                    &times;
                  </button>

                  {/* Product Details */}
                  <div className="flex justify-center mb-4">
                    <img src={viewedProduct.image} alt={viewedProduct.title} className="w-48 h-48 object-contain" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{viewedProduct.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">{viewedProduct.description}</p>
                  <p className="text-green-600 font-bold text-lg">${viewedProduct.price.toFixed(2)}</p>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => addToCart(viewedProduct)}
                      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
