"use client";
import { checkReuseableData, createNewRecord, saveData } from "@/actions";
import { CustomModal } from "@/components/shared/custom-model";
import { FormItem } from "@/components/shared/form-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { countryList } from "@/constants";
import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const formSchema = z.object({
  visa_to_country: z.string(),
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email." })
    .email("Email không hợp lệ."),
});
export default function Home() {
  const router = useRouter();
  const { setOpen } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visa_to_country: countryList[0],
      email: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const rs = await createNewRecord(data);
    rs
      ? router.push(`/thong-tin-ca-nhan?id=${rs.id}`)
      : toast.error("Lỗi hệ thống, vui lòng thử lại sau!");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className="w-[90%] max-w-[400px] flex flex-col gap-4 justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Image
          src={"/logo-visa.png"}
          alt="logo"
          width={150}
          height={150}
          className="h-auto"
        />
        <FormItem label="Quốc gia bạn muốn xin visa">
          <select className="form-select" {...register("visa_to_country")}>
            {countryList.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </FormItem>
        <FormItem label="Nhập email của bạn">
          <Input type="email" id="email" {...register("email")} />
        </FormItem>
        <Button className="text-white capitalize bg-primary hover:bg-primary-hover rounded-xl">
          Tiếp tục
        </Button>
      </form>
    </div>
  );
}
