"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import useCart from "@/lib/hooks/useCart";
import Flex from "./Flex"
import { navBarList } from "@/lib/constants";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();
  const [query, setQuery] = useState("");
  const [sidenav, setSidenav] = useState(false);

  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
    return () => {
      window.removeEventListener("resize", ResponsiveMenu);
    };
  }, []);

  return (
    <>
      <div className="w-full h-20 bg-white sticky top-0 z-10 border-b-[1px] border-b-gray-200">
        <nav className="h-full px-3 max-w-container mx-auto relative">
          <Flex className="flex items-center justify-between h-full">
            <Link href="/">
              <div className="w-8 md:w-20">
                <Image src="/logo.png" alt="logo" width={50} height={30} />
              </div>
            </Link>

            <div className="flex gap-1 md:border border-grey-3 md:px-4 py-1 items-center justify-between rounded-lg relative">
              <input
                className="flex-1 h-4/5 md:h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px] py-2"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder="Search..."
              />
              <button
                disabled={query === ""}
                onClick={() => router.push(`/search/${query}`)}
              >
                <Search className="cursor-pointer h-4 w-4 hover:text-[#4e84cc] mr-8" />
              </button>
            </div>

            <div>
              {showMenu && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center w-auto z-50 p-0"
                >
                  <>
                    {navBarList.map(({ _id, title, link }, index) => (
                      <Link
                        key={_id}
                        className={`flex font-normal w-10 h-6 justify-center items-center px-8 lg:px-12 text-base ${
                          pathname === link
                            ? "font-extrabold text-lg underline underline-offset-4 decoration-1 text-[#262626]"
                            : "text-[#767676]"
                        } hover:font-extrabold hover:text-lg hover:underline hover:underline-offset-4 hover:decoration-1 hover:text-[#262626] ${
                          index < navBarList.length - 1
                            ? "md:border-r-2 border-r-gray-300"
                            : ""
                        } hoverEffect`}
                        href={link}
                      >
                        {title === "Cart" ? (
                          <li className="relative">
                            <ShoppingCart />
                            {cart.cartItems.length !== 0 && (
                              <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                                {cart.cartItems.length}
                              </span>
                            )}
                          </li>
                        ) : (
                          <li>{title}</li>
                        )}
                      </Link>
                    ))}
                    {user ? (
                      <UserButton afterSignOutUrl="/sign-in" />
                    ) : (
                      <Link href="/sign-in">
                        <CircleUserRound />
                      </Link>
                    )}
                  </>
                </motion.ul>
              )}
              <Menu
                onClick={() => setSidenav(!sidenav)}
                className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
              />
              {sidenav && (
                <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-[80%] h-full relative"
                  >
                    <div className="w-full h-full bg-primeColor p-6">
                      <Image
                        src="/logo.png"
                        alt="logo"
                        width={50}
                        height={30}
                      />
                      <ul className="text-gray-200 flex flex-col gap-8 mt-9">
                        {navBarList.map((item) => (
                          <li
                            className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                            key={item._id}
                          >
                            <Link
                              href={item.link}
                              onClick={() => setSidenav(false)}
                            >
                              {item.title === "Cart" ? (
                                <li className="mt-2">
                                  <p className="text-base-bold">
                                    Cart ({cart.cartItems.length})
                                  </p>
                                </li>
                              ) : (
                                <li>{item.title}</li>
                              )}
                            </Link>
                          </li>
                        ))}
                        {user ? (
                          <UserButton afterSignOutUrl="/sign-in" />
                        ) : (
                          <Link href="/sign-in">
                            <CircleUserRound />
                          </Link>
                        )}
                      </ul>
                    </div>
                    <span
                      onClick={() => setSidenav(false)}
                      className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                    >
                      <X size={24} />
                    </span>
                  </motion.div>
                </div>
              )}
            </div>
          </Flex>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
