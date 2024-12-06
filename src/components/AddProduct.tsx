import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../store/addProductSlice";

interface AddProductModalProps {
  isOpen: boolean; // Controls modal visibility
  onClose: () => void; // Callback to close the modal
}

const AddProduct: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    price: "",
    description: "",
  };

  const validate = (values: typeof initialValues) => {
    const errors: Record<string, string> = {};
    if (!values.title) errors.title = "Title is required";
    if (!values.price) errors.price = "Price is required";
    else if (isNaN(Number(values.price))) errors.price = "Price must be a number";
    if (!values.description) errors.description = "Description is required";
    return errors;
  };

  const handleSubmit = (values: typeof initialValues) => {
    const data = {
      title: values.title,
      price: parseFloat(values.price),
      description: values.description,
      image: "placeholder.jpg",
    };
    dispatch(addProductAsync(data));
    onClose(); // Close the modal after submission
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
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Product Title
                </label>
                <Field type="text" id="title" name="title" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="title">{(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}</ErrorMessage>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                  Product Price
                </label>
                <Field type="text" id="price" name="price" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="price">{(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}</ErrorMessage>
              </div>
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
