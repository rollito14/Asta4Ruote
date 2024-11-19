"use client";
import React, { useEffect, useState } from "react";
import AuctionCard from "@/app/auctions/AuctionCard";
import AppPagination from "@/app/components/AppPagination";
import { Auction, PagedResult } from "@/types";
import { getData } from "@/app/actions/auctionActions";
import Filters from "@/app/auctions/Filters";
import { useParamsStore } from "@/app/hooks/useParamsStore";
import { useShallow } from "zustand/react/shallow";
import qs from "query-string";
import EmptyFilter from "@/app/components/EmptyFilter";
const Listings = () => {
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    })),
  );
  const setParams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });
  const setPageNumber = (pageNumber: number) => {
    setParams({ pageNumber });
  };
  useEffect(() => {
    console.log("Fetching data with URL:", url);
    getData(url).then((data) => {
      console.log("Fetched data:", data);
      setData(data);
    });
  }, [url]);

  if (!data) return <h3>loading...</h3>;
  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          {" "}
          <div className={"grid grid-cols-4 gap-6"}>
            {data.results.map((auction) => (
              <AuctionCard auction={auction} key={auction.id} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <AppPagination
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
              pageChanged={setPageNumber}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Listings;
