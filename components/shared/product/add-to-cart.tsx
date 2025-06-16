"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast";
import { toast } from "sonner";
import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";
import { Plus, Minus, Loader } from "lucide-react";

const AddToCart = ({
  cart,
  item,
}: {
  cart?: Cart;
  item: Omit<CartItem, "cartId">;
}) => {
  const router = useRouter();
  //   const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
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
      toast.success(res.message, {
        action: (
          <Button
            className="bg-primary text-white hover:bg-gray-600"
            onClick={() => router.push("/cart")}
          >
            Go to cart
          </Button>
        ),
      });
    });
  };

  // Remove item from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      // toast({
      //   variant: res.success ? "default" : "destructive",
      //   description: res.message,
      // });
      if (res.success) {
        toast.success(res.message || "Item removed from cart.");
      } else {
        toast.error(res.message || "Failed to remove item from cart.", {
          unstyled: true,
          classNames: {
            toast: "bg-red-500 text-white",
          },
        });
      }

      return;
    });
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={handleRemoveFromCart}
      >
        {isPending ? (
          <Loader className="w-4 h-4  animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={handleAddToCart}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      type="button"
      disabled={isPending}
      onClick={handleAddToCart}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      Add to cart
    </Button>
  );
};

export default AddToCart;
