"use client";
import React, { useEffect, useState } from "react";
import { User } from "next-auth";
import { Auction, Bid } from "@/types";
import { useBidStore } from "@/app/hooks/useBidStore";
import { getBidsForAuction } from "@/app/actions/auctionActions";
import toast from "react-hot-toast";
import Heading from "@/app/components/Heading";
import BidItem from "@/app/auctions/details/[id]/BidItem";
import { numberWithCommas } from "@/lib/numberWithCommas";
import EmptyFilter from "@/app/components/EmptyFilter";
import BidForm from "@/app/auctions/details/[id]/BidForm";

type Props = {
  user: User | null;
  auction: Auction;
};
function BidList({ user, auction }: Props) {
  const bids = useBidStore((state) => state.bids);
  const open = useBidStore((state) => state.open);
  const setOpen = useBidStore((state) => state.setOpen);
  const setBids = useBidStore((state) => state.setBids);
  const openForBids = new Date(auction.auctionEnd) > new Date();

  const [loading, setLoading] = useState(true);

  const highBid = bids.reduce(
    (prev, current) =>
      prev > current.amount
        ? prev
        : current.bidStatus.includes("Accepted")
          ? current.amount
          : prev,
    0,
  );
  useEffect(() => {
    getBidsForAuction(auction.id)
      .then((res: any) => {
        if (res.error) {
          throw res.error;
        }
        setBids(res as Bid[]);
      })
      .catch((err: any) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [auction.id, setLoading, setBids]);

  useEffect(() => {
    setOpen(openForBids);
  }, [setOpen, openForBids]);

  if (loading) return <span>...</span>;
  return (
    <div>
      {" "}
      <div className="rounded-lg p-2 shadow-md">
        <div className="py-2 px-4 bg-white">
          <div className="sticky top-0 bg-white p-2">
            <Heading
              title={`Current high bid is $${numberWithCommas(highBid)}`}
            />
          </div>
        </div>

        <div className="overflow-auto h-[400px] flex flex-col-reverse px-2">
          {bids.length === 0 ? (
            <EmptyFilter
              title="No bids for this item"
              subtitle="Please place your bid if you'd like"
            />
          ) : (
            <>
              {bids.map((bid: Bid) => (
                <BidItem key={bid.id} bid={bid}></BidItem>
              ))}
            </>
          )}
        </div>
        <div className="px-2 pb-2 text-gray-500">
          {!open ? (
            <div className="flex items-center justify-center p-2 text-lg font-bold">
              This auction has ended{" "}
            </div>
          ) : !user ? (
            <div className="flex items-center justify-center p-2 text-lg font-bold">
              Please login to make a bid{" "}
            </div>
          ) : user && user.username === auction.seller ? (
            <div className="flex items-center justify-center p-2 text-lg font-bold">
              You cannot bid on your own auction
            </div>
          ) : (
            <BidForm auctionId={auction.id} highBid={highBid} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BidList;
