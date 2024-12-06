import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../store/addProductSlice";
import { string } from "yup";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
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

    if (!values.title) {
      errors.title = "Title is required";
    }

    if (!values.price) {
      errors.price = "Price is required";
    } else if (isNaN(Number(values.price))) {
      errors.price = "Price must be a number";
    }

    if (!values.description) {
      errors.description = "Description is required";
    }

    setFormErrors(errors);
    return errors;
  };

  // Form Submission Handler
  const handleSubmit = (values: typeof initialValues) => {
    // debugger;
    console.log("New Product Data:", values);
    const data = {
      title: values.title,
      price: parseFloat(values.price), // Ensure price is a number
      description: values.description,
      image: "about1.jpeg", // You can use a placeholder or dynamic image
    };

    dispatch(addProductAsync(data));
  };

  return (
    <div className="w-full h-full py-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
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
};

export default AddProduct;
