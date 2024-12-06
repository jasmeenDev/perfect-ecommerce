import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../store/addProductSlice";

interface AddProductModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Initial Values
  const initialValues = {
    title: "",
    price: "",
    image: "",
    description: "",
  };

  // Validation Logic
  const validate = (values: typeof initialValues) => {
    const errors: Record<string, string> = {};
    if (!values.title) errors.title = "Title is required";
    if (!values.price) errors.price = "Price is required";
    else if (isNaN(Number(values.price))) errors.price = "Price must be a number";
    if (!values.description) errors.description = "Description is required";

    setFormErrors(errors);
    return errors;
  };

  // Form Submission Handler
  const handleSubmit = (values: typeof initialValues) => {
    const data = {
      title: values.title,
      price: parseFloat(values.price),
      description: values.description,
      image: "about1.jpeg", // Placeholder or dynamic image
    };
    dispatch(addProductAsync(data));
    handleClose(); // Close the modal after submission
  };

  // Modal content to render
  const modalContent = (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose(); // Close when clicking outside
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
        <button onClick={handleClose} className="text-gray-500 hover:text-gray-800 absolute top-2 right-2 text-2xl">
          &times;
        </button>

        {/* Form Content */}
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="bg-white p-6 rounded-lg shadow-md">
              {/* Title */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Product Title
                </label>
                <Field type="text" id="title" name="title" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="title">{(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}</ErrorMessage>
              </div>

              {/* Price */}
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                  Product Price
                </label>
                <Field type="text" id="price" name="price" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="price">{(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}</ErrorMessage>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Product Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md h-20 resize-none"
                />
                <ErrorMessage name="description">{(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}</ErrorMessage>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById("modal-root")!);
};

export default AddProductModal;
