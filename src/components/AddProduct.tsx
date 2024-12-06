import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../store/addProductSlice";
import { initialProductValues, productValidationSchema, productFields } from "../data/productData";

interface AddProductModalProps {
  isOpen: boolean; // Controls modal visibility
  onClose: () => void; // Callback to close the modal
}

const AddProduct: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = (values: typeof initialProductValues) => {
    const data = {
      ...values,
      price: parseFloat(values.price),
      image: "placeholder.jpg", // Placeholder for now
    };
    dispatch(addProductAsync(data));
    onClose(); // Close modal after submission
  };

  // Render modal only when `isOpen` is true
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

        {/* Formik Integration */}
        <Formik initialValues={initialProductValues} validationSchema={productValidationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              {productFields.map((field) => (
                <div className="mb-4" key={field.id}>
                  <label htmlFor={field.id} className="block text-gray-700 font-medium mb-2">
                    {field.label}
                  </label>
                  <Field
                    as={field.type === "textarea" ? "textarea" : "input"}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name={field.name}>{(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}</ErrorMessage>
                </div>
              ))}
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
    </div>,
    document.getElementById("modal-root")! // Portal to `modal-root`
  );
};

export default AddProduct;
