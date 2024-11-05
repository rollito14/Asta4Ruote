﻿/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CountdownTimer from "@/app/auctions/CountdownTimer";
import CarImage from "@/app/auctions/CarImage";
import { Auction } from "@/types";
import Link from "next/link";

interface AuctionCardProps {
  auction: Auction;
}
const AuctionCard = ({ auction }: AuctionCardProps) => {
  return (
    <Link href={`/auctions/details/${auction.id}`} className="group">
      <div className="relative aw-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden">
        <CarImage imageUrl={auction.imageUrl} />
        <div className="absolute bottom-2 left-2">
          {" "}
          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700">
          {auction.make} {auction.model}{" "}
        </h3>
        <p className="font-semibold text-sm">{auction.year}</p>
      </div>
    </Link>
  );
};

export default AuctionCard;
