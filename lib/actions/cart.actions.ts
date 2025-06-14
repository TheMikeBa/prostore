"use server";

import { CartItem } from "@/types";

// added return-type annotation
interface AddToCartResult {
  success: boolean;
  message?: string;
}

export async function addItemToCart(data: CartItem): Promise<AddToCartResult> {
  return {
    success: true,
    message: "Item added to the cart",
  };
}
