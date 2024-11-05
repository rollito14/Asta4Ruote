"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { deleteAuction } from "@/app/actions/auctionActions";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

const DeleteButton = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function doDelete() {
    setLoading(true);
    deleteAuction(id)
      .then((res) => {
        console.log("Delete response:", res);
        if (res.error) throw res.error;
        console.log("Navigating to home page");
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => setLoading(false));
  }
  return (
    <Button color="failure" isProcessing={loading} onClick={doDelete}>
      Delete Auction
    </Button>
  );
};

export default DeleteButton;
