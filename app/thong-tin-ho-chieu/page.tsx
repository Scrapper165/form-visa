import { Step2Form } from "@/components/forms/step2";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id: string | undefined };
}) {
  const { id } = searchParams;
  if (!id) redirect("/");
  const data = await prisma.userInfo.findFirst({ where: { id } });
  if (!data) redirect("/");
  return (
    <div className="p-10 w-[600px] max-w-[90%] flex items-center justify-center">
      <div>
        <h1>Step 2</h1>
        <Step2Form data={data} />
      </div>
    </div>
  );
}
