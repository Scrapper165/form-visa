import { Step3Form } from "@/components/forms/step3";
import { Step4Form } from "@/components/forms/step4";
import { Step5Form } from "@/components/forms/step5";
import { Step6Form } from "@/components/forms/step6";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { id } = searchParams;
  if (!id) redirect("/");
  const data = await prisma.userInfo.findFirst({ where: { id } });
  if (!data) redirect("/");
  return (
    <div className="p-10 w-[600px] max-w-[90%] flex items-center justify-center">
      <div>
        <h1>Step 6</h1>
        <Step6Form data={data} />
      </div>
    </div>
  );
}
