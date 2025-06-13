import { auth } from "@/auth";
import UserButtonClient from "./user-button-client"; // Import the client component

const UserButton = async () => {
  const session = await auth();
  return <UserButtonClient user={session?.user ?? null} />;
};

export default UserButton;
