import React from "react";
import Footer from "../../components/user/Footer";
import ContactForm from "../../components/user/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r bg-indigo-500 shadow-md fixed w-full z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-white">
            <Link
              to="/"
              className="text-white hover:text-white/80 transition-colors flex items-center"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-white/60" />
            <span className="font-medium">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-20 flex flex-wrap justify-between items-center">
        {/* Left section: Text */}
        <div className="w-full md:w-1/2 text-center md:text-center mb-10 md:mb-0">
          <p className="font-extrabold text-4xl dark:text-lightText">
            <span className="text-primary block">Hi there....</span>
          </p>
          <p className="font-extrabold text-4xl dark:text-lightText">
            How can we <span className="text-primary block">Help</span> you
          </p>
        </div>

        {/* Right section: Form */}
        <div className="w-full md:w-1/2 flex justify-center">
          <ContactForm />
        </div>
      </div>

      {/* Profile Section */}
      <div className="mt-20 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-lightText">
          Contact Rashin KP
        </h2>
        <div className="max-w-3xl mx-auto mt-6 bg-white dark:bg-darkBackground shadow-lg rounded-lg p-6">
          <p className="text-lg text-gray-700 dark:text-lightText mb-4">
            I’m always happy to hear from you. Feel free to reach out to me
            through the following channels:
          </p>
          <ul className="text-lg text-gray-800 dark:text-lightText space-y-4">
            <li>
              <strong>Full Name:</strong> Rashin KP
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:rashinkpofficial@gmail.com"
                className="text-primary hover:underline"
              >
                rashinkpofficial@gmail.com
              </a>
            </li>
            <li>
              <strong>Social Links:</strong>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://www.facebook.com/rashin.kp.9/"
                  className="text-gray-600 hover:text-primary transition-colors duration-300"
                >
                  <FontAwesomeIcon
                    icon="fa-brands fa-facebook"
                    className="dark:text-lightText"
                  />
                </a>
                <a
                  href="https://x.com/rashin_kp"
                  className="text-gray-600 hover:text-primary transition-colors duration-300"
                >
                  <FontAwesomeIcon
                    icon="fa-brands fa-twitter"
                    className="dark:text-lightText"
                  />
                </a>
                <a
                  href="https://www.instagram.com/rash.e_/?next=%2F"
                  className="text-gray-600 hover:text-primary transition-colors duration-300"
                >
                  <FontAwesomeIcon
                    icon="fa-brands fa-instagram"
                    className="dark:text-lightText"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/rashin-kp-6a66b62a1/"
                  className="text-gray-600 hover:text-primary transition-colors duration-300"
                >
                  <FontAwesomeIcon
                    icon="fa-brands fa-linkedin"
                    className="dark:text-lightText"
                  />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center w-full px-4 mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
