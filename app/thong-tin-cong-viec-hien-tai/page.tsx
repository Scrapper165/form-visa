import { Step3Form } from "@/components/forms/step3";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  // const { email, country, type } = searchParams;
  // if (!email || !country) return redirect("/");
  // const data =
  //   type == "1"
  //     ? await prisma.userInfo.findFirst({
  //         where: {
  //           email: email,
  //           visa_to_country: country,
  //         },
  //         orderBy: {
  //           id: "desc",
  //         },
  //       })
  //     : null;
  const { id } = searchParams;
  if (!id) redirect("/");
  const data = await prisma.userInfo.findFirst({ where: { id } });
  if (!data) redirect("/");
  return (
    <div className="p-10 w-[600px] max-w-[90%] flex items-center justify-center">
      <div>
        <h1>Step 3</h1>
        <Step3Form data={data} />
      </div>
    </div>
  );
}
