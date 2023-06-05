import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import Search from "../components/Search/Search";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Movies", href: "/movies", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function debounceFn(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default function Home() {
  // useEffect(() => {
  //   window.addEventListener("scroll", debounceFn(isSticky, 100));
  //   return () => {
  //     window.removeEventListener("scroll", debounceFn(isSticky, 100));
  //   };
  // });

  // const isSticky = (e) => {
  //   const header = document.querySelector(".header-section");
  //   const headerHeight = header && header.offsetHeight;
  //   const scrollY = window.pageYOffset;

  //   if (scrollY >= headerHeight) {
  //     header && header.classList.add("is-fixed");
  //     document.body.style.paddingTop = `${headerHeight}px`;
  //   } else {
  //     header.classList.remove("is-fixed");
  //     document.body.style.paddingTop = 0;
  //   }
  // };

  const login = JSON.parse(localStorage.getItem("login"))
    ? JSON.parse(localStorage.getItem("login"))
    : "";
  return (
    <Disclosure
      as="nav"
      className="bg-slate-900 page-container border-b border-slate-800 mb-10 header-section"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink
                    to="/"
                    className="items-center font-bold gap-x-3 hidden xl:block lg:block md:block mr-4"
                  >
                    <div className="relative"></div>
                    <span className="xl:text-2xl lg:text-2xl">Fast Movie</span>
                  </NavLink>
                  <Search></Search>
                </div>
                <div className="flex justify-between">
                  <div className="hidden sm:ml-6 sm:flex">
                    <div className="flex flex-row space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                              : "hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                      {login.username && (
                        <NavLink
                          to="/favourite"
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                              : "hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                          }
                        >
                          Favourite
                        </NavLink>
                      )}
                    </div>
                    <div className="flex-1 flex">
                      {login === "" && (
                        <>
                          <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                              isActive
                                ? "text-primary"
                                : "hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium flex items-center"
                            }
                          >
                            <p className="flex items-center px-6 py-3 font-medium  rounded-lg text-xs xl:text-sm lg:text-sm">
                              Sign up
                            </p>
                          </NavLink>
                          <NavLink
                            to="/login"
                            className={({ isActive }) =>
                              isActive
                                ? "text-white"
                                : "hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium flex items-center"
                            }
                          >
                            <p className="flex items-center px-6 py-3 font-medium rounded-lg bg-gradient-secondary button-effect text-xs xl:text-sm lg:text-sm">
                              Login
                            </p>
                          </NavLink>
                        </>
                      )}
                      {login.username && (
                        <NavLink
                          to="/profile"
                          className={`ml-10 flex items-center`}
                        >
                          <p>
                            <span>Hello, </span>
                            <strong className="ml-1 font-bold text-transparent font-secondary bg-clip-text bg-gradient-primary">
                              {login.username}
                            </strong>
                          </p>
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {login.username && (
                <NavLink
                  to="/favourite"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                      : "hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                  }
                >
                  Favourite
                </NavLink>
              )}
              {login === "" && (
                <>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary"
                        : "hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium flex items-center"
                    }
                  >
                    <p className="flex items-center px-6 py-3 font-medium  rounded-lg text-xs xl:text-sm lg:text-sm">
                      Sign up
                    </p>
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white"
                        : "hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium flex items-center"
                    }
                  >
                    <p className="flex items-center px-6 py-3 font-medium rounded-lg bg-gradient-secondary button-effect text-xs xl:text-sm lg:text-sm">
                      Login
                    </p>
                  </NavLink>
                </>
              )}
              {login.username && (
                <NavLink to="/profile" className={`ml-10 flex items-center`}>
                  <p>
                    <span>Hello, </span>
                    <strong className="ml-1 font-bold text-transparent font-secondary bg-clip-text bg-gradient-primary">
                      {login.username}
                    </strong>
                  </p>
                </NavLink>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

{
  /* <Menu as="div" className="relative ml-3">
                  {login === "" && (
                    <>
                      <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                          isActive ? "text-primary" : ""
                        }
                      >
                        <p className="flex items-center px-6 py-3 font-medium  rounded-lg text-xs xl:text-sm lg:text-sm">
                          Sign up
                        </p>
                      </NavLink>
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          isActive ? "text-white" : ""
                        }
                      >
                        <p className="flex items-center px-6 py-3 font-medium rounded-lg bg-gradient-secondary button-effect text-xs xl:text-sm lg:text-sm">
                          Login
                        </p>
                      </NavLink>
                    </>
                  )}
                  {login.username && (
                    <NavLink to="/profile" className={``}>
                      <p>
                        <span>Hello, </span>
                        <strong className="ml-1 font-bold text-transparent font-secondary bg-clip-text bg-gradient-primary">
                          {login.username}
                        </strong>
                      </p>
                    </NavLink>
                  )}
                </Menu> */
}
