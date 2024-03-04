import React from "react";
import { Button } from "./button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface NavProps {
  className?: string;
}

const Nav: React.FC<NavProps> = () => {
  const location = useLocation();
  const isLoggedIn =
    location.pathname === "/profile" || location.pathname === "/dashboard"; // Check if on profile/dashboard page

  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login"); // Navigate to the "/login" page
  };

  return (
    <div
      className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4`}
    >
      <div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Coursequery
      </div>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse items-center">
          {isLoggedIn ? (
            <>
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Profile
                </a>
              </li>
              <li>
                <Button>Logout</Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <Button onClick={handleSignInClick}>Login</Button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
