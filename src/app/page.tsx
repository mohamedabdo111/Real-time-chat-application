import { ConnectMonogDB } from "@/config/db-config";
import { GetCurrentUserUsingMongoDB } from "@/server-action/GetCurrentUserUsingMongoDB";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
ConnectMonogDB();
export default async function Page() {
  const { user } = await GetCurrentUserUsingMongoDB();
  console.log(user);

  return (
    <div className=" flex flex-col gap-4 text-2xl ">
      <UserButton />
      <span>First name: {user?.name}</span>
      <span>
        Email:{" "}
        {user?.emailAddresses ? user?.emailAddresses[0]?.emailAddress : ""}
      </span>
      <span>User name: {user?.username}</span>
    </div>
  );
}
