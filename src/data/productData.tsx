// data/productData.ts
import * as Yup from "yup";

// Initial values for the form
export const initialProductValues = {
  title: "",
  price: "",
  description: "",
};

// Validation schema for the form
export const productValidationSchema = Yup.object().shape({
  title: Yup.string().min(2, "Title is too short!").max(100, "Title is too long!").required("Title is required"),
  price: Yup.number().typeError("Price must be a number").positive("Price must be positive").required("Price is required"),
  description: Yup.string().min(10, "Description is too short!").max(500, "Description is too long!").required("Description is required"),
});

// Input field configuration
export const productFields = [
  {
    id: "title",
    name: "title",
    label: "Product Title",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    id: "price",
    name: "price",
    label: "Product Price",
    type: "text",
    placeholder: "Enter product price",
  },
  {
    id: "description",
    name: "description",
    label: "Product Description",
    type: "textarea",
    placeholder: "Enter product description",
  },
];
