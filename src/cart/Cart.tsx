import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { productlistType } from "../types/productlist-type";
import { remove } from "../store/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  console.log(cartItems);
  const removeToCart = (id: any) => {
    console.log("Removing item with id:", id); // Debugging log
    dispatch(remove(id));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">Cart Items</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty!</p>
      ) : (
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product: productlistType) => (
                  <tr key={product.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">
                      <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />
                    </td>
                    <td className="px-4 py-2 border font-medium">{product.title}</td>
                    <td className="px-4 py-2 border text-sm text-gray-600">{product.description}</td>
                    <td className="px-4 py-2 border font-bold text-green-600">${product.price}</td>
                    <td className="px-4 py-2 border text-center">
                      <button onClick={() => removeToCart(product.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        Remove item
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
