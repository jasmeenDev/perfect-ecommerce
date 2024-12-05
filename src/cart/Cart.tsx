import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { productlistType } from "../types/productlist-type";
import { remove } from "../store/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  // Calculate total price
  const totalPrice: number = cartItems.reduce((sum: number, item: productlistType): number => {
    return sum + item.price;
  }, 0);

  const removeToCart = (id: any) => {
    dispatch(remove(id));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty!</p>
      ) : (
        <div className="w-full h-full py-5">
          <div className="container mx-auto">
            {/* Cart Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cartItems.map((product: productlistType) => (
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
                    {/* <p className="text-gray-600 text-sm mb-2">{product.description}</p> */}
                    <p className="text-green-600 font-bold text-lg">${product.price.toFixed(2)}</p>
                  </div>

                  {/* Remove Button */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => removeToCart(product.id)}
                      className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 active:bg-red-700 transition duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price Section */}
            <div className="mt-6 flex justify-center items-center">
              <span className="text-lg font-bold">Total Price:</span>
              <span className="text-lg font-bold text-green-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
