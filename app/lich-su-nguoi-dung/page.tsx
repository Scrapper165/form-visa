import { Step8Form } from "@/components/forms/step8";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id: string | undefined };
}) {
  return (
    <div className="p-10 w-[1500px] max-w-[100%]  justify-center" style={{background:"#F0F0F0"}}>
      <div>
        <h1>Lịch sử người dùng</h1>
        <Step8Form />
      </div>
    </div>
  );
}
