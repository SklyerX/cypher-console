import AuthCard from "@/components/auth/AuthCard";
import BaseLayout from "@/components/layouts/BaseLayout";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getAuthSession();

  if (session) return redirect("/panel");

  return (
    <BaseLayout>
      <div className="h-screen grid place-items-center">
        <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
          <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-700 opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100"></div>
          </div>
        </div>
        <AuthCard />
      </div>
    </BaseLayout>
  );
}
