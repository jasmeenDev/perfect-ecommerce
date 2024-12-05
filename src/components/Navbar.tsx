import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../store/store";
import { uiSliceActions } from "../store/ui-slice";

const Navbar: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { isOpenSideDrawer } = useSelector((state: RootState) => state.ui);

  const dispatch = store.dispatch;

  const toggleMenu = () => {
    dispatch(uiSliceActions.toggleSideDrawerOpen());
  };

  const closeMenu = () => {
    dispatch(uiSliceActions.onIsSideDrawerClose());
  };

  return (
    <>
      <div className="w-full bg-gray-200 sticky top-0">
        <nav className="container mx-auto flex justify-between items-center w-full  px-2 py-3 ">
          {/* Logo - left side */}
          <div>
            <img src="download.png" className="w-12 h-12" alt="logo" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-blue-500 flex-grow justify-center">
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to="/products">
                Products
              </NavLink>
            </li>
          </ul>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Cart and Login on Desktop */}
          <ul className="hidden md:flex space-x-8 text-blue-500">
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to="/cart">
                Cart ({cartItems.length})
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to="/login">
                Login
              </NavLink>
            </li>
          </ul>

          {/* Mobile Drawer Menu */}
        </nav>
      </div>
      {/* mobile menu */}
      {isOpenSideDrawer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu} // Close the drawer when clicking outside
        ></div>
      )}
      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 transition-transform duration-300 
    ${isOpenSideDrawer ? "translate-x-0 w-[50vw]" : "translate-x-full"} 
    md:hidden`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-800 absolute top-4 right-4 text-2xl">
          &times;
        </button>

        {/* Menu Items */}
        <ul className="mt-12 space-y-6  text-start text-blue-600 p-6 pr-16">
          {" "}
          {/* Added `mt-12` for spacing under the close button */}
          <li>
            <NavLink onClick={closeMenu} className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to="/products">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to="/cart">
              Cart ({cartItems.length})
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} className={({ isActive }) => (isActive ? "text-red-500" : "text-black")} to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
