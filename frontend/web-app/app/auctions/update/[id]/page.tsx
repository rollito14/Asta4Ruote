import Heading from "@/app/components/Heading";
import React from "react";
import { AuctionForm } from "@/app/auctions/AuctionForm";
import { getDetailedViewData } from "@/app/actions/auctionActions";

export default async function Update({ params }: { params: Promise<{ id: string }> }) {
  const data = await getDetailedViewData((await params).id);
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Update your auction"
        subtitle="Please update the details of your car"
      />
      <AuctionForm auction={data} />
    </div>
  );
}
