import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Product {
  title: string;
  description: string;
  price: number;
  image: string;
}

interface CustomModalProps {
  viewedProduct: Product | null; // Product to view or edit
  handleCloseView: () => void; // Callback to close the modal
  updateProduct: (updatedProduct: Product) => void; // Callback to update the product
}

const CustomModal: React.FC<CustomModalProps> = ({ viewedProduct, handleCloseView, updateProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Controls whether we are in edit mode

  useEffect(() => {
    if (viewedProduct) {
      setIsModalOpen(true); // Open the modal when a product is passed
    }
  }, [viewedProduct]);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false); // Exit edit mode on modal close
    handleCloseView(); // Notify parent to close the modal
  };

  const formik = useFormik({
    initialValues: viewedProduct || {
      title: "",
      description: "",
      price: 0,
      image: "",
    },
    enableReinitialize: true, // Update form values when viewedProduct changes
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required").min(0, "Price must be positive"),
    }),
    onSubmit: (values) => {
      updateProduct(values); // Send updated product to parent
      closeModal(); // Close the modal
    },
  });

  const modalContent = (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal(); // Close modal on outside click
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative"
        style={{
          width: "90%",
          maxWidth: "400px",
          height: "70vh",
          overflowY: "auto",
        }}
      >
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          &times;
        </button>

        {/* Conditional Rendering */}
        {isEditing ? (
          // Render the Formik Form when in editing mode
          <form onSubmit={formik.handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-3 py-2 rounded focus:outline-none"
              />
              {formik.touched.title && formik.errors.title && <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
                className="w-full border px-3 py-2 rounded focus:outline-none"
              ></textarea>
              {formik.touched.description && formik.errors.description && <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>}
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-3 py-2 rounded focus:outline-none"
              />
              {formik.touched.price && formik.errors.price && <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>}
            </div>

            {/* Buttons */}
            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={() => setIsEditing(false)} // Exit editing mode
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Update
              </button>
            </div>
          </form>
        ) : (
          // Render simple view when not editing
          <div>
            <h2 className="text-lg font-bold mb-4">{viewedProduct?.title}</h2>
            <p className="mb-2">
              <strong>Description:</strong> {viewedProduct?.description}
            </p>
            <p className="mb-4">
              <strong>Price:</strong> ${viewedProduct?.price}
            </p>
            <div className="text-right">
              <button
                onClick={() => setIsEditing(true)} // Enter editing mode
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return isModalOpen ? ReactDOM.createPortal(modalContent, document.getElementById("modal-root")!) : null;
};

export default CustomModal;
