﻿"use client";
import { useState } from "react";
import { updateAuctionTest } from "@/app/actions/auctionActions";
import { Button } from "flowbite-react";

const AuthTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();
  function doUpdate() {
    setResult(undefined);
    setLoading(true);
    updateAuctionTest()
      .then((r) => setResult(r))
      .catch((e) => setResult(e))
      .finally(() => setLoading(false));
  }
  return (
    <div className="flex items-center gap-4">
      <Button outline isProcessing={loading} onClick={doUpdate}>
        Test auth
      </Button>
      <div>{JSON.stringify(result, null, 2)}</div>
    </div>
  );
};

export default AuthTest;
