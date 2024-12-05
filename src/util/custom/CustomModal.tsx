import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Define types for the product and the props
interface Product {
  title: string;
  description: string;
  price: number;
  image: string;
}

interface CustomModalProps {
  viewedProduct: Product | null; // viewedProduct can be null initially
  handleCloseView: () => void; // Callback to close the product view
  addToCart: (product: Product) => void; // Function to add the product to the cart
}

const CustomModal: React.FC<CustomModalProps> = ({ viewedProduct, handleCloseView, addToCart }) => {
  // Define local state for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal when the product is viewed
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    handleCloseView(); // Call the close callback
  };

  // Trigger the modal opening when viewedProduct is available
  useEffect(() => {
    if (viewedProduct) openModal();
  }, [viewedProduct]);

  // Modal content to render
  const modalContent = (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 ${
        isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal(); // Close when clicking outside
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative transform transition-all duration-500"
        style={{
          width: "90%",
          maxWidth: "400px", // Maximum size for larger screens
          height: "70vh",
          overflowY: "auto", // Adds scroll if content overflows
        }}
      >
        {/* Close Button */}
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 absolute top-2 right-2 text-2xl">
          &times;
        </button>

        {/* Product Details */}
        <div className="flex justify-center mb-4">
          <img
            src={viewedProduct?.image}
            alt={viewedProduct?.title}
            className="object-contain"
            style={{
              width: "80px", // Flexible width for different screen sizes
              maxHeight: "100px", // Prevents the image from becoming too large
            }}
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">{viewedProduct?.title}</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">{viewedProduct?.description}</p>
        <p className="text-green-600 font-bold text-lg text-center">${viewedProduct?.price?.toFixed(2)}</p>

        {/* Action Buttons */}
        <div className="mt-4 text-center">
          <button
            onClick={() => addToCart(viewedProduct!)} // We assume the product is not null here
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  // Use React Portal to render the modal outside the main app
  return viewedProduct ? ReactDOM.createPortal(modalContent, document.getElementById("modal-root")!) : null;
};

export default CustomModal;
