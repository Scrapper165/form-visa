"use client";
import { saveData } from "@/actions";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfo } from "@prisma/client";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker2 } from "../shared/date-picker2";
import { FormItem } from "../shared/form-item";
import { Button } from "../ui/button";
import { useRouter } from "next-nprogress-bar";

const formSchema = z.object({
  old_job: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  old_job_title: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  old_job_start_date: z.date({ message: "Vui lòng nhập trường này" }),
  old_job_end_date: z.date({ message: "Vui lòng nhập trường này" }),
});
export const Step4Form = ({ data }: { data: UserInfo }) => {
  const router = useRouter();
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
      old_job: data.old_job ?? "",
      old_job_end_date: data.old_job_end_date ?? new Date(),
      old_job_start_date: data.old_job_start_date ?? new Date(),
      old_job_title: data.old_job_title ?? "",
    },
  });

  
  const watchedValues = watch();

  useEffect(() => {
    localStorage.setItem("step4FormData", JSON.stringify(watchedValues));
  }, [watchedValues]);

  // Để hiển thị dữ liệu từ localStorage ra form
  useEffect(() => {
    const storedData = localStorage.getItem("step4FormData");
    if (storedData) {
      reset(JSON.parse(storedData));
    }
  }, [reset]);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { ...rest } = values;
    const rs = await saveData({
      ...rest,
      id: data.id,
    });
    if (rs == "ok") router.push(`/trinh-do-hoc-van?id=${data.id}`);
  };
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
    >
      <div className="grid  gap-4">
        <FormItem label="Bạn là">
          <select className="form-select" {...register("old_job")}>
            <option value="Chủ doanh nghiệp">Chủ doanh nghiệp</option>
            <option value="Cán bộ công nhân viên">Cán bộ công nhân viên</option>
            <option value="Nhân viên văn phòng">Nhân viên văn phòng</option>
            <option value="Nhân viên tự do">Nhân viên tự do</option>
          </select>
          {errors.old_job && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.old_job.message}
            </p>
          )}
        </FormItem>

        <FormItem label="Ngày bắt đầu">
          <DatePicker2
            date={watch("old_job_start_date")}
            setDate={(date) => setValue("old_job_start_date", date)}
          />
          {errors.old_job_start_date && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.old_job_start_date.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Ngày kết thúc">
          <DatePicker2
            date={watch("old_job_end_date")}
            setDate={(date) => setValue("old_job_end_date", date)}
          />
          {errors.old_job_end_date && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.old_job_end_date.message}
            </p>
          )}
        </FormItem>

        <FormItem label="Chức vụ">
          <Input {...register("old_job_title")} />
          {errors.old_job_title && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.old_job_title.message}
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
            router.push(`/thong-tin-cong-viec-hien-tai?id=${data.id}`)
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
