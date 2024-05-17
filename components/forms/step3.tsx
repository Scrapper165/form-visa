"use client";
import { Input } from "@/components/ui/input";
import { countryList } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfo } from "@prisma/client";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "../shared/date-picker";
import { FormItem } from "../shared/form-item";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { DatePicker2 } from "../shared/date-picker2";
import { saveData } from "@/actions";
import validator from "validator";

const formSchema = z.object({
  current_job: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  current_job_address: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  current_job_start_date: z.date({ message: "Vui lòng nhập trường này" }),
  current_company_phone_number: z
    .string({
      message: "Vui lòng nhập trường này",
    })
    .refine(
      (val) => validator.isMobilePhone(val, "vi-VN"),
      "Số điện thoại không hợp lệ"
    ),
  current_job_title: z
    .string({
      message: "Vui lòng nhập trường này",
    })
    .min(1, "Vui lòng  nhập trường này"),
  current_job_salary: z.number({
    message: "Vui lòng nhập trường này",
  }),
  current_job_detail: z
    .string({
      message: "Vui lòng nhập trường này",
    })
    .min(1, "Vui lòng  nhập trường này"),
});
export const Step3Form = ({ data }: { data: UserInfo }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams.get("country"), searchParams.get("email"));
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
      current_company_phone_number: data.current_company_phone_number ?? "",
      current_job: data.current_job ?? "",
      current_job_address: data.current_job_address ?? "",
      current_job_detail: data.current_job_detail ?? "",
      current_job_salary: data.current_job_salary ?? 0,
      current_job_start_date: data.current_job_start_date ?? new Date(),
      current_job_title: data.current_job_title ?? "",
    },
  });

  
  const watchedValues = watch();

  useEffect(() => {
    localStorage.setItem("step3FormData", JSON.stringify(watchedValues));
  }, [watchedValues]);

  // Để hiển thị dữ liệu từ localStorage ra form
  useEffect(() => {
    const storedData = localStorage.getItem("step3FormData");
    if (storedData) {
      reset(JSON.parse(storedData));
    }
  }, [reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const rs = await saveData({
    //   data,
    // });
    // toast(rs);
    const { ...rest } = values;
    const rs = await saveData({
      ...rest,
      current_job_salary: values.current_job_salary,
      id: data.id,
    });
    if (rs == "ok")
      router.push(`/thong-tin-cong-viec-truoc-day?id=${data?.id}`);
  };
  // watch((data, {name,type} ) => {
  //     if(name === "is_has_other_nationality") {
  //       if(data.is_has_other_nationality == 1) {

  //       }
  //     }
  // })
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
    >
      <div className="grid  gap-4">
        <FormItem label="Bạn là">
          <select className="form-select" {...register("current_job")}>
            <option value="Chủ doanh nghiệp">Chủ doanh nghiệp</option>
            <option value="Cán bộ công nhân viên">Cán bộ công nhân viên</option>
            <option value="Nhân viên văn phòng">Nhân viên văn phòng</option>
            <option value="Nhân viên tự do">Nhân viên tự do</option>
          </select>
          {errors.current_job && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.current_job.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Nơi làm việc">
          <Input {...register("current_job_address")} />
          {errors.current_job_address && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.current_job_address.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Ngày bắt đầu">
          <DatePicker2
            date={watch("current_job_start_date")}
            setDate={(date) => setValue("current_job_start_date", date)}
          />
          {errors.current_job_start_date && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.current_job_start_date.message}
            </p>
          )}
        </FormItem>

        <FormItem
          id="current_company_phone_number"
          label="Số điện thoại công ty"
        >
          <Input
            {...register("current_company_phone_number")}
            onInput={(evt) => {
              var inputValue = evt.currentTarget.value;
              var numericValue = inputValue.replace(/\D/g, "");
              evt.currentTarget.value = numericValue.slice(0, 10);
            }}
          />
          {errors.current_company_phone_number && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.current_company_phone_number.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Chức vụ">
          <Input {...register("current_job_title")} />
          {errors.current_job_title && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.current_job_title.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Mức lương hàng tháng(vnd)">
          <Input
            {...register("current_job_salary", { valueAsNumber: true })}
            onInput={(evt) => {
              var inputValue = evt.currentTarget.value;
              var numericValue = inputValue.replace(/\D/g, "");
              evt.currentTarget.value = numericValue;
            }}
          />
          {errors.current_job_salary && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.current_job_salary.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Mô tả công việc">
          <Textarea
            className="w-full border-black rounded-lg border-2"
            {...register("current_job_detail")}
          />
          {errors.current_job_detail && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.current_job_detail.message}
            </p>
          )}
        </FormItem>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          type="submit"
          className=""
          variant={"ghost"}
          onClick={() => router.push(`/thong-tin-ho-chieu?id=${data.id}`)}
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
