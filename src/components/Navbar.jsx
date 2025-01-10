import React, { useState, useEffect, useRef } from "react";
import IconMain from "../assets/Icon_Main.svg";
import IconMainWhite from "../assets/Icon_Main_white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice.js";
import { Link, useLocation, useNavigate } from "react-router";
import {
  useGetUserQuery,
  useLogoutMutation,
} from "../redux/slices/userApiSlices.js";
import { userLogout } from "../redux/slices/authUser.js";
import { successToast } from "./toast/index.js";
import { googleLogout } from "@react-oauth/google";
import { RotatingLines } from "react-loader-spinner";
import noImage from "../assets/noImage.png";
import { Heart, ShoppingCart, SunMoon } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const profileButtonRef = useRef(null);
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.userAuth);
  const cartCount = useSelector((state) => state.cart.count);
  const { data, isLoading, isError, error } = useGetUserQuery(undefined, {
    skip: !userInfo,
  });

  const { user } = data || {};
  const { picture } = user || {};

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();

  const icons = {
    light: IconMain,
    dark: IconMainWhite,
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleProfileToggle = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setDropdownOpen(false);
      await logoutApiCall().unwrap();
      dispatch(userLogout());
      googleLogout();
      successToast("Logout Successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const profile = {
    list: [
      { text: "Profile", path: "/profile" },
      { text: "Orders", path: "/orders" },
      { text: "Wishlist", path: "/wishlist" },
      { text: "Wallet", path: "/wallet" },
    ],
  };

  const links = [
    { text: "home", path: "/" },
    { text: "products", path: "/products" },
    { text: "contact", path: "/contact" },
    { text: "about us", path: "/about" },
  ];

  // Handle click outside for mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !toggleRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle click outside for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profileButtonRef.current?.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isError) return <div>Error: {error.message}</div>;

  if (isLoading) {
    return (
      <div>
        <div className="h-screen w-full absolute top-0 z-50 left-0 backdrop-blur-sm bg-black/30 flex justify-center items-center">
          <RotatingLines
            visible={true}
            height="50"
            width="50"
            color="grey"
            strokeColor="#fff"
            strokeWidth="2"
            animationDuration="8"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed z-40 top-0 left-0 right-0 flex items-center justify-between px-8 py-4 lg:px-16 lg:py-5 font-medium bg-lightBackground dark:bg-darkBackground h-20">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-4">
        <img
          src={theme === "light" ? icons.light : icons.dark}
          alt="Logo"
          className=""
        />
      </div>

      {/* Middle Section - Navigation Links */}
      <div className="hidden lg:flex items-center justify-center flex-grow gap-8 lg:gap-12">
        <ul className="flex gap-8 lg:gap-12">
          {links.map((link, i) => (
            <Link key={i} to={link.path}>
              <li
                className={`cursor-pointer hover:text-primary ${
                  location.pathname === link.path
                    ? "text-darkText font-bold dark:text-lightText dark:font-bold"
                    : "text-secondary dark:text-secondary"
                } dark:hover:text-primary`}
              >
                {link.text.toUpperCase()}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Right Section - User Actions */}
      {userInfo ? (
        <div className="hidden lg:flex items-center gap-4 lg:gap-6">
          <div className="flex space-x-4 items-center">
            <Link to="/wishlist" className="relative">
              <Heart className="text-black dark:text-white" size={30} />
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="text-black dark:text-white" size={30} />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 cursor-pointer relative">
            <div
              ref={profileButtonRef}
              onClick={handleProfileToggle}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-lightBackground rounded-full overflow-hidden">
                <img
                  src={picture?.secure_url || noImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="sm"
                className="text-darkText dark:text-lightText"
              />
            </div>

            {/* Profile Dropdown */}
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-full right-0 mt-2 bg-lightBackground shadow-lg shadow-darkBackground dark:border dark:border-lightBackground dark:bg-darkBackground dark:text-lightText rounded-md w-52 flex justify-center py-4 z-50"
              >
                <ul className="flex flex-col items-center gap-4 px-4 py-3 w-full">
                  {profile.list.map((item, index) => (
                    <Link key={index} to={item.path}>
                      <li
                        onClick={() => setDropdownOpen(false)}
                        className="cursor-pointer hover:text-primary w-full"
                      >
                        {item.text.toUpperCase()}
                      </li>
                    </Link>
                  ))}
                  <li
                    onClick={handleLogout}
                    className="cursor-pointer text-center hover:text-red-800 text-red-600 w-full"
                  >
                    LOGOUT
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <ul className="flex flex-row gap-7 items-center px-4 dark:text-lightText">
            <Link to="/login">
              <li className="cursor-pointer hover:text-purple-700">LOGIN</li>
            </Link>
            <li className="cursor-pointer hover:text-purple-700">
              <div className="bg-indigo-600 text-lightText py-2 px-5 rounded-full flex gap-4 items-center dark:bg-inherit dark:border dark:border-lightBackground">
                <Link to="/signup">
                  <button>SIGN UP</button>
                </Link>
                <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Menu Toggle */}
      <div className="block lg:hidden" ref={toggleRef}>
        <FontAwesomeIcon
          icon={faBars}
          size="2x"
          className="cursor-pointer hover:text-indigo-600 dark:text-lightText"
          onClick={handleMenuToggle}
        />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute flex top-full right-0 bg-lightBackground shadow-lg rounded-md w-full py-7 z-50 justify-center dark:bg-darkBackground dark:border dark:border-lightText dark:text-lightText"
        >
          <ul className="flex flex-col gap-6 px-4">
            {links.map((link, i) => (
              <Link key={i} to={link.path} onClick={() => setMenuOpen(false)}>
                <li className="cursor-pointer hover:text-primary">
                  {link.text.toUpperCase()}
                </li>
              </Link>
            ))}
            {userInfo ? (
              <div className="flex flex-col gap-6 mt-2">
                {profile.list.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Link to={item.path} onClick={() => setMenuOpen(false)}>
                      <li>{item.text.toUpperCase()}</li>
                    </Link>
                  </div>
                ))}
                <div className="flex items-center gap-2 cursor-pointer">
                  <Link to="/cart" onClick={() => setMenuOpen(false)}>
                    <li>MY CART</li>
                  </Link>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-800"
                  onClick={handleLogout}
                >
                  <li>LOGOUT</li>
                </div>
              </div>
            ) : (
              <div>
                <ul className="flex flex-col gap-7 dark:text-lightText">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <li className="cursor-pointer hover:text-purple-700">
                      LOGIN
                    </li>
                  </Link>
                  <li className="cursor-pointer hover:text-purple-700">
                    <div className="bg-indigo-600 text-lightText py-2 px-5 rounded-full flex gap-4 items-center dark:bg-inherit dark:border dark:border-lightBackground">
                      <Link to="/signup" onClick={() => setMenuOpen(false)}>
                        <button>SIGN UP</button>
                      </Link>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
