"use client";
import React from "react";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import Link from "next/link";
import { User } from "next-auth";
import { HiCog, HiUser } from "react-icons/hi2";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";

interface Props {
  user: User;
}
const UserAction = ({ user }: Props) => {
  return (
    <Dropdown inline label={`Welcome ${user.name}`}>
      <DropdownItem icon={HiUser}>
        <Link href="/session">My Auctions</Link>
      </DropdownItem>
      <DropdownItem icon={AiFillTrophy}>
        <Link href="/">Auctions Won</Link>
      </DropdownItem>
      <DropdownItem icon={AiFillCar}>
        <Link href="/">Sell my car</Link>
      </DropdownItem>
      <DropdownItem icon={HiCog}>
        <Link href="/session">Session (dev only!)</Link>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem
        icon={AiOutlineLogout}
        onClick={() => signOut({ redirectTo: "/" })}
      >
        Sign out
      </DropdownItem>
    </Dropdown>
  );
};

export default UserAction;
