"use client";
import { saveData } from "@/actions";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfo } from "@prisma/client";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker2 } from "../shared/date-picker2";
import { FormItem } from "../shared/form-item";
import { Button } from "../ui/button";
import { useRouter } from "next-nprogress-bar";

const formSchema = z.object({
  education_level: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  school_name: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  major: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  school_start_date: z.date({ message: "Vui lòng nhập trường này" }),
  school_end_date: z.date({ message: "Vui lòng nhập trường này" }),
});
export const Step5Form = ({ data }: { data: UserInfo }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education_level: data.education_level ?? "",
      major: data.major ?? "",
      school_end_date: data.school_end_date ?? new Date(),
      school_name: data.school_name ?? "",
      school_start_date: data.school_start_date ?? new Date(),
    },
  });

  
  const watchedValues = watch();

  useEffect(() => {
    localStorage.setItem("step5FormData", JSON.stringify(watchedValues));
  }, [watchedValues]);

  // Để hiển thị dữ liệu từ localStorage ra form
  useEffect(() => {
    const storedData = localStorage.getItem("step5FormData");
    if (storedData) {
      reset(JSON.parse(storedData));
    }
  }, [reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const rs = await saveData({
      ...values,
      id: data.id,
    });
    if (rs == "ok") router.push(`/thong-tin-gia-dinh?id=${data.id}`);
  };
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
    >
      <div className="grid gap-4">
        <FormItem label="Trình độ">
          <select className="form-select" {...register("education_level")}>
            <option value="Dưới đại học">Dưới đại học</option>
            <option value="Đại học">Đại học</option>
            <option value="Thạc sĩ">Thạc sĩ</option>
            <option value="Tiến sĩ">Tiến sĩ</option>
          </select>
          {errors.education_level && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.education_level.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Tên trường">
          <Input {...register("school_name")} />
          {errors.school_name && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.school_name.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Ngành học">
          <Input {...register("major")} />
          {errors.major && (
            <p className="text-rose-500 text-sm mt-2">{errors.major.message}</p>
          )}
        </FormItem>
        <FormItem label="Ngày bắt đầu nhập học">
          <DatePicker2
            date={watch("school_start_date")}
            setDate={(date) => setValue("school_start_date", date)}
          />
          {errors.school_start_date && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.school_start_date.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Ngày kết thúc khóa học">
          <DatePicker2
            date={watch("school_end_date")}
            setDate={(date) => setValue("school_end_date", date)}
          />
          {errors.school_end_date && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.school_end_date.message}
            </p>
          )}
        </FormItem>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          type="submit"
          className=""
          variant={"ghost"}
          onClick={() =>
            router.push(`/thong-tin-cong-viec-truoc-day?id=${data.id}`)
          }
        >
          <ArrowLeft />
          Trở về
        </Button>
        <Button type="submit" className="bg-primary">
          Tiếp tục
        </Button>
      </div>
    </form>
  );
};
