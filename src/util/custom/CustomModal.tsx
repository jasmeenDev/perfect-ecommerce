import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // Import Yup for validation

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

// Define Yup validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  description: Yup.string().required("Description is required").min(5, "Description must be at least 5 characters"),
  price: Yup.number().required("Price is required").positive("Price must be a positive number").min(0.01, "Price must be greater than 0"),
  image: Yup.string().required("Image URL is required").url("Invalid URL format"),
});

const CustomModal: React.FC<CustomModalProps> = ({ viewedProduct, handleCloseView, addToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // State to track mode (view or edit)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleCloseView();
    setIsEditMode(false); // Reset to view mode when closing
  };

  useEffect(() => {
    if (viewedProduct) openModal();
  }, [viewedProduct]);

  const handleUpdateProduct = (updatedProduct: Product) => {
    console.log("Updated Product:", updatedProduct); // Log the updated product
    setIsEditMode(false); // Switch back to view mode
  };

  const modalContent = (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 ${
        isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative transform transition-all duration-500"
        style={{
          width: "90%",
          maxWidth: "400px",
          height: "70vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 absolute top-2 right-2 text-2xl">
          &times;
        </button>

        {isEditMode ? (
          // Update Mode: Formik Form
          <Formik
            initialValues={{
              title: viewedProduct?.title || "",
              description: viewedProduct?.description || "",
              price: viewedProduct?.price || 0,
              image: viewedProduct?.image || "",
            }}
            validationSchema={validationSchema} // Integrating Yup validation schema
            onSubmit={(values) => handleUpdateProduct(values as Product)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-700">Title</label>
                  <Field name="title" className="border border-gray-300 p-2 w-full rounded" placeholder="Product Title" />
                  {errors.title && touched.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <Field name="description" as="textarea" className="border border-gray-300 p-2 w-full rounded" placeholder="Product Description" />
                  {errors.description && touched.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Price</label>
                  <Field name="price" type="number" className="border border-gray-300 p-2 w-full rounded" placeholder="Product Price" />
                  {errors.price && touched.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Image URL</label>
                  <Field name="image" className="border border-gray-300 p-2 w-full rounded" placeholder="Image URL" />
                  {errors.image && touched.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          // View Mode
          <>
            <div className="flex justify-center mb-4">
              <img src={viewedProduct?.image} alt={viewedProduct?.title} className="object-contain" style={{ width: "80px", maxHeight: "100px" }} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">{viewedProduct?.title}</h2>
            <p className="text-sm text-gray-600 mb-4 text-center">{viewedProduct?.description}</p>
            <p className="text-green-600 font-bold text-lg text-center">${viewedProduct?.price?.toFixed(2)}</p>

            {/* Action Buttons */}
            <div className="mt-4 text-center">
              {/* <button onClick={() => addToCart(viewedProduct!)} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>  */}
              <button
                onClick={() => setIsEditMode(true)} // Switch to edit mode
                className="bg-blue-500 text-white px-6 py-2 rounded ml-4 hover:bg-yellow-600"
              >
                Update
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return viewedProduct ? ReactDOM.createPortal(modalContent, document.getElementById("modal-root")!) : null;
};

export default CustomModal;
