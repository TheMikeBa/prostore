"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  //   const { toast } = useToast();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      // toast({
      //     variant: "destructive",
      //     description: res.message,
      //   });
      toast.error(res.message || "Failed to add item to cart.", {
        classNames: {
          toast: "!bg-red-500 !text-white",
        },
      });
      return;
    }

    // toast({
    //     description: `${item.name} added to the cart`,
    //     action: (
    //       <ToastAction
    //         className="bg-primary text-white hover:bg-gray-800"
    //         onClick={() => router.push("/cart")}
    //         altText="Go to cart"
    //       >
    //         Go to cart
    //       </ToastAction>
    //     ),
    //   });
    toast.success(`${item.name} added to the cart`, {
      action: (
        <Button
          className="bg-primary text-white hover:bg-gray-600"
          onClick={() => router.push("/cart")}
        >
          Go to cart
        </Button>
      ),
    });
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  );
};

export default AddToCart;
