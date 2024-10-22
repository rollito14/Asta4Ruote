﻿"use client";
import React from "react";
import { Pagination } from "flowbite-react";

interface Props {
  currentPage: number;
  pageCount: number;
  pageChanged: (page: number) => void;
}
const AppPagination = ({ currentPage, pageCount, pageChanged }: Props) => {
  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={(e) => pageChanged(e)}
      totalPages={pageCount}
      layout="pagination"
      showIcons={true}
      className="text-blue-500 mb-5"
    />
  );
};

export default AppPagination;
