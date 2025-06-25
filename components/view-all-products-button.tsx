"use client";

import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";
import Link from "next/link";

const ViewAllProductsButton = () => {
  //   const router = useRouter();

  return (
    <div className="flex justify-center items-center my-8">
      {/* <Button
        onClick={() => router.push("/search")}
        className="px-8 py-4 text-lg font-semibold"
      >
        View All Products
      </Button> */}
      <Button asChild className="px-8 py-4 text-lg font-semibold">
        <Link href="/search">View All Products</Link>
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
