// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";

// // Define types for the product and the props
// interface Product {
//   title: string;
//   description: string;
//   price: number;
//   image: string;
// }

// interface CustomModalProps {
//   viewedProduct: Product | null; // viewedProduct can be null initially
//   handleCloseView: () => void; // Callback to close the product view
//   updateProduct: (updatedProduct: Product) => void; // Function to handle product updates
// }

// const CustomModal: React.FC<CustomModalProps> = ({ viewedProduct, handleCloseView, updateProduct }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Local state for the form values
//   const [formValues, setFormValues] = useState<Product | null>(null);

//   // Open the modal and set initial form values
//   const openModal = () => {
//     setIsModalOpen(true);
//     setFormValues(viewedProduct); // Prefill form with viewed product data
//   };

//   // Close the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     handleCloseView(); // Call the close callback
//   };

//   // Trigger modal opening and form population when viewedProduct changes
//   useEffect(() => {
//     if (viewedProduct) openModal();
//   }, [viewedProduct]);

//   // Handle form input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({
//       ...prev!,
//       [name]: name === "price" ? parseFloat(value) || 0 : value, // Handle price as a number
//     }));
//   };

//   // Handle update button click
//   const handleUpdate = () => {
//     if (formValues) {
//       console.log("Updated Product:", formValues);
//       updateProduct(formValues); // Call the update function
//       closeModal(); // Close the modal after updating
//     }
//   };

//   // Modal content
//   const modalContent = (
//     <div
//       className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 ${
//         isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//       onClick={(e) => {
//         if (e.target === e.currentTarget) closeModal(); // Close when clicking outside
//       }}
//     >
//       <div
//         className="bg-white p-6 rounded-lg shadow-lg relative transform transition-all duration-500"
//         style={{
//           width: "90%",
//           maxWidth: "400px",
//           height: "70vh",
//           overflowY: "auto",
//         }}
//       >
//         {/* Close Button */}
//         <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 absolute top-2 right-2 text-2xl">
//           &times;
//         </button>

//         {/* Form */}
//         {formValues && (
//           <form>
//             {/* Product Title */}
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-1">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formValues.title}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
//               />
//             </div>

//             {/* Product Description */}
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-1">Description</label>
//               <textarea
//                 name="description"
//                 value={formValues.description}
//                 onChange={handleInputChange}
//                 rows={3}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
//               ></textarea>
//             </div>

//             {/* Product Price */}
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-1">Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formValues.price}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
//               />
//             </div>

//             {/* Product Image */}
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-1">Image URL</label>
//               <input
//                 type="text"
//                 name="image"
//                 value={formValues.image}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-4 text-center">
//               <button
//                 type="button"
//                 onClick={handleUpdate}
//                 className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-300"
//               >
//                 Update
//               </button>
//             </div>
//           </form>
//         )}
//       {/* </div> */}
//     </div>
//   );

//   // Render modal via React Portal
//   return viewedProduct ? ReactDOM.createPortal(modalContent, document.getElementById("modal-root")!) : null;
// };

// export default CustomModal;
