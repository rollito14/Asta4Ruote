﻿import React from "react";
import Search from "@/app/nav/Search";
import Logo from "@/app/nav/Logo";
const Navbar = () => {
  return (
    <header
      className={
        "sticky top-0 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md"
      }
    >
      <Logo />
      <Search />
      <div>Login</div>
    </header>
  );
};

export default Navbar;
