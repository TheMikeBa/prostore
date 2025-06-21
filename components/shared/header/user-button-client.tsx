"use client"; // Add this line to make it a client component

import Link from "next/link";
import { useTransition } from "react"; // Import useTransition
// import { auth } from "@/auth"; // auth() can't be used in client components directly
// We'll need to pass session data as a prop or fetch it differently if still needed here
// For now, let's assume session data might be passed as a prop or handled by a parent server component
// If UserButton needs to be async to fetch session, it cannot be a client component directly with useTransition in the same file.
// A common pattern is to have a server component wrapper that fetches session and passes it to a client component.
// For simplicity in this step, I'll remove the direct auth() call and assume session is passed if needed.

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";

// Assuming session is passed as a prop if UserButton remains a client component
// Or, this component could be simplified if it only handles sign-out
// and the display logic based on session is in a parent server component.

interface UserButtonProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  } | null;
}

const UserButton = ({ user }: UserButtonProps) => {
  const [isPending, startTransition] = useTransition();

  if (!user) {
    return (
      <Link href="/api/auth/signin">
        <Button>Sign In</Button>
      </Link>
    );
  }

  const firstInitial = user.name?.charAt(0).toUpperCase() ?? "";

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutUser();
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-300"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/user/profile" className="w-full">
              User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/user/orders" className="w-full">
              Order History
            </Link>
          </DropdownMenuItem>
          {user.role === "admin" && (
            <DropdownMenuItem>
              <Link className="w-full" href="/admin/overview">
                Admin
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onSelect={(event) => event.preventDefault()} // Prevent default closing behavior
            onClick={handleSignOut}
            disabled={isPending}
            className="p-0 mb-1 cursor-pointer"
          >
            <Button
              className="w-full py-4 px-2 h-4 justify-start"
              variant="ghost"
              disabled={isPending}
            >
              {isPending ? "Signing Out..." : "Sign Out"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default UserButton;
