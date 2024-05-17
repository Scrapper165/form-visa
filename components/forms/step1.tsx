"use client";
import { Input } from "@/components/ui/input";
import { countryList } from "@/constants";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender, UserInfo } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker2 } from "../shared/date-picker2";
import { FormItem } from "../shared/form-item";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { saveData } from "@/actions";
import validator from "validator";
const formSchema = z.object({
  name: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  gender: z.enum(["Male", "Female", "Other"]),
  name_alias: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  dob: z.date(),
  pob: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  marital_status: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  husband_wife_pob: z.string(),
  is_has_kid: z.number(),
  country: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  nationality: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  is_has_other_nationality: z.number(),
  other_nationality: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này")
    .optional(),
  address_on_paper: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  current_address: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng  nhập trường này"),
  phone_number: z
    .string({ message: "Vui lòng nhập trường này" })
    .refine(
      (val) => validator.isMobilePhone(val, "vi-VN"),
      "Số điện thoại không hợp lệ"
    ),
});
export const Step1Form = ({ data }: { data?: UserInfo }) => {
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
      name: data?.name ?? "",
      name_alias: data?.name_alias ?? "",
      dob: data?.dob ?? new Date(),
      pob: data?.pob ?? "",
      address_on_paper: data?.address_on_paper ?? "",
      country: data?.country ?? "",
      current_address: data?.current_address ?? "",
      husband_wife_pob: data?.husband_wife_pob ?? "",
      nationality: data?.nationality ?? "",
      phone_number: data?.phone_number ?? "",
      is_has_kid: data?.is_has_kid ? 1 : 0,
      is_has_other_nationality: data?.other_nationality ? 1 : 0,
      gender: data?.gender ?? "Male",
      marital_status: data?.marital_status ?? "Độc thân",
      other_nationality: data?.other_nationality ?? undefined,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    localStorage.setItem("step1FormData", JSON.stringify(watchedValues));
  }, [watchedValues]);

  // Để hiển thị dữ liệu từ localStorage ra form
  useEffect(() => {
    const storedData = localStorage.getItem("step1FormData");
    if (storedData) {
      reset(JSON.parse(storedData));
    }
  }, [reset]);

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const { is_has_other_nationality, ...rest } = value;
    const rs = await saveData({
      ...rest,
      id: data?.id,
      is_has_kid: value.is_has_kid ? true : false,
    });
    if (rs == "ok") router.push(`/thong-tin-ho-chieu?id=${data?.id}`);
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
        <FormItem label="Họ và tên theo hộ chiếu">
        <Input
            {...register("name")}
            onChange={(e) => {
              setValue("name", e.target.value); // Cập nhật trạng thái biểu mẫu
              // Cập nhật localStorage
              localStorage.setItem(
                "step1FormData",
                JSON.stringify({
                  ...watchedValues,
                  name: e.target.value,
                })
              );
            }}
          />
          {errors.name && (
            <p className="text-rose-500 text-sm mt-2">{errors.name.message}</p>
          )}
        </FormItem>
        <FormItem label="Giới tính">
          <RadioGroup
            defaultValue={data?.gender ?? "Male"}
            className="flex gap-6"
            onValueChange={(value: Gender) => {
              setValue("gender", value); // Update form state
              // Update localStorage
              localStorage.setItem(
                "step1FormData",
                JSON.stringify({
                  ...watchedValues,
                  gender: value,
                })
              );
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="r1" />
              <Label htmlFor="r1">Name</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="r2" />
              <Label htmlFor="r2">Nữ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Other" id="r3" />
              <Label htmlFor="r3">Khác</Label>
            </div>
          </RadioGroup>
          {errors.gender && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.gender.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Tên khác">
          <Input {...register("name_alias")} />
          {errors.name_alias && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.name_alias.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Ngày tháng năm sinh">
          <DatePicker2
            date={watch("dob")}
            setDate={(date) => setValue("dob", date ?? new Date())}
          />
          {errors.dob && (
            <p className="text-rose-500 text-sm mt-2">{errors.dob.message}</p>
          )}
        </FormItem>
        <FormItem label="Nơi sinh">
          <Input {...register("pob")} />
          {errors.pob && (
            <p className="text-rose-500 text-sm mt-2">{errors.pob.message}</p>
          )}
        </FormItem>
        <FormItem label="Tình trạng hôn nhân">
          <RadioGroup
            defaultValue={data?.marital_status ?? "Độc thân"}
            className="flex gap-6 flex-col"
            onValueChange={(value) => {
              setValue("marital_status", value);
            }}
          >
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Độc thân" id="d1" />
                <Label htmlFor="d1" className="w-[100px]">
                  Độc thân
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Đã kết hôn" id="d2" />
                <Label htmlFor="d2" className="w-[100px]">
                  Đã kết hôn
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Góa chồng/vợ" id="d3" />
                <Label htmlFor="d3" className="w-[100px]">
                  Góa chồng/vợ
                </Label>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Sống chung nhưng không kết hôn"
                  id="d4"
                />
                <Label htmlFor="d4" className="w-[100px]">
                  Sống chung nhưng không kết hôn
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Ly hôn" id="d5" />
                <Label htmlFor="d5" className="w-[100px]">
                  Ly hôn
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Single mom/dad" id="d6" />
                <Label htmlFor="d6" className="w-[100px]">
                  Cha/mẹ đơn thân
                </Label>
              </div>
            </div>
          </RadioGroup>
          {errors.marital_status && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.marital_status.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Nơi sinh của vợ/chồng">
          <Input {...register("husband_wife_pob")} />
          {errors.husband_wife_pob && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.husband_wife_pob.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Đã có con?">
          <select
            className="form-select"
            {...register("is_has_kid", { valueAsNumber: true })}
          >
            <option value="0">Chưa</option>
            <option value="1">Có</option>
          </select>
          {errors.is_has_kid && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_has_kid.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Quốc gia">
          <select className="form-select" {...register("country")}>
            {countryList.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.country && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.country.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Quốc tịch">
          <select className="form-select" {...register("nationality")}>
            {countryList.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.nationality && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.nationality.message}
            </p>
          )}
        </FormItem>
        {/* <FormItem label="Quốc tịch">
        <select className="form-select" {...register("nationality")}>
          {countryList.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {errors.name && (
          <p className="text-rose-500 text-sm mt-2">{errors.name.message}</p>
        )}
      </FormItem> */}
        <FormItem
          id="is_has_other_nationality"
          label="Đương đơn có thêm quốc tịch khác?"
        >
          <select
            className="form-select"
            {...register("is_has_other_nationality", { valueAsNumber: true })}
          >
            <option value="1">Có</option>
            <option value="0">Không</option>
          </select>
          {errors.is_has_other_nationality && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_has_other_nationality.message}
            </p>
          )}
        </FormItem>
        {watch("is_has_other_nationality") == 1 && (
          <FormItem label="Hãy cho biết quốc tịch gì?">
            <select className="form-select" {...register("other_nationality")}>
              {countryList.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {errors.other_nationality && (
              <p className="text-rose-500 text-sm mt-2">
                {errors.other_nationality.message}
              </p>
            )}
          </FormItem>
        )}
        <FormItem label="Địa chỉ ghi trên hộ khẩu?">
          <Input {...register("address_on_paper")} />
          {errors.address_on_paper && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.address_on_paper.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Địa chỉ nơi ở hiện tại?">
          <Input {...register("current_address")} />
          {errors.current_address && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.current_address.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Số điện thoại di động?">
          <Input
            {...register("phone_number")}
            onInput={(evt) => {
              var inputValue = evt.currentTarget.value;
              var numericValue = inputValue.replace(/\D/g, "");
              evt.currentTarget.value = numericValue.slice(0, 10);
            }}
          />
          {errors.phone_number && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.phone_number.message}
            </p>
          )}
        </FormItem>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          type="submit"
          className=""
          variant={"ghost"}
          onClick={() => router.push(`/`)}
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
