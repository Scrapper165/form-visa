"use client";
import { Input } from "@/components/ui/input";
import { countryList } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfo } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DatePicker2 } from "../shared/date-picker2";
import { FormItem } from "../shared/form-item";
import { Button } from "../ui/button";
import { useRouter } from "next-nprogress-bar";
import { saveData } from "@/actions";

const formSchema = z.object({
  expected_start_date: z.date({ message: "Vui lòng nhập trường này" }),
  accompanying_person: z.string(),
  traveled_countries: z.string(),
  foreign_languages: z.string(),
  trip_purpose: z.string().min(1, "Vui lòng nhập trường này"),
  trip_payroll_person: z.string().min(1, "Vui lòng nhập trường này"),
  visa_type_owned: z.string(),
  is_lived_in_visa_coutry: z.number(),
  is_lived_in_visa_coutry_date: z.date().optional(),
  is_lived_in_visa_coutry_days_stay: z.number().optional(),
  is_denied_visa: z.number(),
  denied_visa_reason: z.string(),
  denied_visa_number_of_time: z.number(),
  is_had_visa_country_not_used: z.number(),
  visa_country_not_used: z.string(),
  guarantee_documents: z.string(),
  social_network: z.string(),
  is_belong_to_some_tribe_or_party: z.number(),
  party_join_date: z.date().optional(),
  is_work_for_some_charity_organization: z.number(),
  is_weapons_trained: z.number(),
  is_worked_on_army: z.number(),
  is_has_some_sick: z.number(),
  is_had_been_arrested_by_crime: z.number(),
  is_renounce_citizenship: z.number(),
});
export const Step7Form = ({ data }: { data: UserInfo }) => {
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
      accompanying_person: data.accompanying_person ?? "",
      denied_visa_number_of_time: data.denied_visa_number_of_time ?? 0,
      denied_visa_reason: data.denied_visa_reason ?? "",
      expected_start_date: data.expected_start_date ?? new Date(),
      foreign_languages: data.foreign_languages ?? "",
      guarantee_documents: data.guarantee_documents ?? "",
      is_belong_to_some_tribe_or_party: data.is_belong_to_some_tribe_or_party
        ? 1
        : 0,
      is_denied_visa: data.is_denied_visa ? 1 : 0,
      is_had_been_arrested_by_crime: data.is_had_been_arrested_by_crime ? 1 : 0,
      is_had_visa_country_not_used: data.is_had_visa_country_not_used ? 1 : 0,
      is_has_some_sick: data.is_has_some_sick ? 1 : 0,
      is_lived_in_visa_coutry: data.is_lived_in_visa_coutry ? 1 : 0,
      is_lived_in_visa_coutry_date:
        data.is_lived_in_visa_coutry_date ?? new Date(),
      is_lived_in_visa_coutry_days_stay: data.is_lived_in_visa_coutry_days_stay
        ? 1
        : 0,
      is_renounce_citizenship: data.is_renounce_citizenship ? 1 : 0,
      is_weapons_trained: data.is_weapons_trained ? 1 : 0,
      is_work_for_some_charity_organization:
        data.is_work_for_some_charity_organization ? 1 : 0,
      is_worked_on_army: data.is_worked_on_army ? 1 : 0,
      party_join_date: data.party_join_date ?? new Date(),
      social_network: data.social_network ?? "",
      traveled_countries: data.traveled_countries ?? "",
      trip_payroll_person: data.trip_payroll_person ?? "",
      trip_purpose: data.trip_purpose ?? "",
      visa_country_not_used: data.visa_country_not_used ?? "",
      visa_type_owned: data.visa_type_owned ?? "",
    },
  });

  
  const watchedValues = watch();

  useEffect(() => {
    localStorage.setItem("step7FormData", JSON.stringify(watchedValues));
  }, [watchedValues]);

  // Để hiển thị dữ liệu từ localStorage ra form
  useEffect(() => {
    const storedData = localStorage.getItem("step7FormData");
    if (storedData) {
      reset(JSON.parse(storedData));
    }
  }, [reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const rs = await saveData({
      ...values,
      is_lived_in_visa_coutry: values.is_lived_in_visa_coutry ? true : false,
      is_denied_visa: values.is_denied_visa ? true : false,
      is_belong_to_some_tribe_or_party: values.is_belong_to_some_tribe_or_party
        ? true
        : false,
      is_work_for_some_charity_organization:
        values.is_work_for_some_charity_organization ? true : false,
      is_weapons_trained: values.is_weapons_trained ? true : false,
      is_worked_on_army: values.is_worked_on_army ? true : false,
      is_has_some_sick: values.is_has_some_sick ? true : false,
      is_renounce_citizenship: values.is_renounce_citizenship ? true : false,
      is_had_been_arrested_by_crime: values.is_had_been_arrested_by_crime
        ? true
        : false,
      is_had_visa_country_not_used: values.is_had_visa_country_not_used
        ? true
        : false,
      id: data.id,
    });
    if (rs == "ok") {
      toast.success("Lưu thành công");
      router.push("/");
    }
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
    >
      <div className="grid gap-4">
        <FormItem label="Ngày dự tính khởi hành">
          <DatePicker2
            minDate={new Date()}
            date={watch("expected_start_date")}
            setDate={(date) =>
              setValue("expected_start_date", date ?? new Date())
            }
          />
          {errors.expected_start_date && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.expected_start_date.message}
            </p>
          )}
        </FormItem>
        <FormItem
          id="accompanying_person"
          label="Họ tên người đi cùng với đương đơn"
        >
          <Input {...register("accompanying_person")} />
          {errors.accompanying_person && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.accompanying_person.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Liệt kê các quốc gia đương đơn đã từng đến trước đây (cách nhau bởi dấu  ;)">
          <Input {...register("traveled_countries")} />
          {errors.traveled_countries && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.traveled_countries.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Các ngoại ngữ có thể sử dụng để giao tiếp được">
          <Input {...register("foreign_languages")} />
          {errors.foreign_languages && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.foreign_languages.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Mục đích chuyến đi">
          <Input {...register("trip_purpose")} />
          {errors.trip_purpose && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.trip_purpose.message}
            </p>
          )}
        </FormItem>

        <FormItem label="Ai chi trả cho chuyến đi?">
          <select className="form-select" {...register("trip_payroll_person")}>
            <option value="Tự chi trả">Tự chi trả</option>
            <option value="Công ty chi trả">Công ty chi trả</option>
            <option value="Người thân chi trả">Người thân chi trả</option>
          </select>
          {errors.trip_payroll_person && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.trip_payroll_person.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Loại visa đương đơn đã xin">
          <Input {...register("visa_type_owned")} />
          {errors.visa_type_owned && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.visa_type_owned.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Đương đơn đã từng đến đất nước muốn xin visa lần nào chưa? ">
          <select
            className="form-select"
            {...register("is_lived_in_visa_coutry", {
              valueAsNumber: true,
            })}
          >
            <option value="0">Chưa</option>
            <option value="1">Có</option>
          </select>
          {errors.is_lived_in_visa_coutry && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_lived_in_visa_coutry.message}
            </p>
          )}
        </FormItem>
        <p className="text-sm">
          * Nếu CÓ, đương đơn điền vào những thông tin sau:
        </p>
        <FormItem label="Ngày tháng năm từng đến">
          <DatePicker2
            date={watch("is_lived_in_visa_coutry_date")}
            setDate={(date) =>
              setValue("is_lived_in_visa_coutry_date", date ?? new Date())
            }
          />
          {errors.is_lived_in_visa_coutry_date && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_lived_in_visa_coutry_date.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Số ngày ở lại">
          <Input
            defaultValue={0}
            {...register("is_lived_in_visa_coutry_days_stay", {
              valueAsNumber: true,
            })}
            type="number"
            min={0}
          />
          {errors.is_lived_in_visa_coutry_days_stay && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_lived_in_visa_coutry_days_stay.message}
            </p>
          )}
        </FormItem>

        <FormItem label="Đương đơn có từng bị từ chối visa bất kỳ nước nào chưa? ">
          <select
            className="form-select"
            {...register("is_denied_visa", {
              valueAsNumber: true,
            })}
          >
            <option value="0">Chưa</option>
            <option value="1">Có</option>
          </select>
          {errors.is_denied_visa && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_denied_visa.message}
            </p>
          )}
        </FormItem>
        <p className="text-sm">
          * Nếu CÓ, vui lòng ghi rõ lí do từ chối và số lần
        </p>
        <FormItem label="Lí do từ chối">
          <Input {...register("denied_visa_reason")} min={0} />
          {errors.denied_visa_reason && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.denied_visa_reason.message}
            </p>
          )}
        </FormItem>

        <FormItem label="Số lần bị từ chối">
          <Input
            {...register("denied_visa_number_of_time", { valueAsNumber: true })}
            defaultValue={0}
            type="number"
            min={0}
          />
          {errors.denied_visa_number_of_time && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.denied_visa_number_of_time.message}
            </p>
          )}
        </FormItem>

        <FormItem label="Đương đơn đã có visa nước nào chưa sử dụng không ?">
          <select
            className="form-select"
            {...register("is_had_visa_country_not_used", {
              valueAsNumber: true,
            })}
          >
            <option value="0">Chưa</option>
            <option value="1">Có</option>
          </select>
          {errors.is_had_visa_country_not_used && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_had_visa_country_not_used.message}
            </p>
          )}
        </FormItem>
        <p className="text-sm">* Nếu có, vui lòng cung cấp tên quốc gia</p>
        <FormItem label="Tên quốc gia">
          <select
            className="form-select"
            {...register("visa_country_not_used")}
          >
            {countryList.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </FormItem>
        <FormItem label="Đương đơn có mở hồ sơ bảo lãnh định cư tại nước nào không? Nếu có cho biết nước nào, theo diện gì ?">
          <Input {...register("guarantee_documents")} min={0} />
          {errors.guarantee_documents && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.guarantee_documents.message}
            </p>
          )}
        </FormItem>

        <FormItem label="Đương đơn có sử dụng mạng xã hội nào không?">
          <select className="form-select" {...register("social_network")}>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Viber">Viber</option>
            <option value="Youtube">Youtube</option>
            <option value="Twitter">Twitter</option>
            <option value="Không có">Không có</option>
          </select>
          {errors.social_network && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.social_network.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Đương đơn có thuộc về bộ tộc hay đảng phái nào không? ">
          <select
            className="form-select"
            {...register("is_belong_to_some_tribe_or_party", {
              valueAsNumber: true,
            })}
          >
            <option value="0">Chưa</option>
            <option value="1">Có</option>
          </select>
          {errors.is_belong_to_some_tribe_or_party && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_belong_to_some_tribe_or_party.message}
            </p>
          )}
        </FormItem>

        <FormItem label="Nếu là Đảng viên Đảng Cộng Sản VN chọn ngày tháng năm gia nhập">
          <DatePicker2
            date={watch("party_join_date")}
            setDate={(date) => setValue("party_join_date", date ?? new Date())}
          />
          {errors.party_join_date && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.party_join_date.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Đương đơn có tham gia hay làm việc cho tổ chức xã hội, tổ chức từ thiện nào không? ">
          <select
            className="form-select"
            {...register("is_work_for_some_charity_organization", {
              valueAsNumber: true,
            })}
          >
            <option value="0">Không</option>
            <option value="1">Có</option>
          </select>
          {errors.is_work_for_some_charity_organization && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_work_for_some_charity_organization.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Đương đơn có những kỹ năng chuyên dụng nào hay đã từng được huấn luyện để sử dụng các loại binh khí, những chất gây nổ hay có kinh nghiệm gì trong lĩnh vực hạt nhân, sinh học hay hoá học không? ">
          <select
            className="form-select"
            {...register("is_weapons_trained", {
              valueAsNumber: true,
            })}
          >
            <option value="0">Không</option>
            <option value="1">Có</option>
          </select>
          {errors.is_weapons_trained && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_weapons_trained.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Đương đơn có từng phục vụ trong quân đội không? ">
          <select
            className="form-select"
            {...register("is_worked_on_army", {
              valueAsNumber: true,
            })}
          >
            <option value="0">Không</option>
            <option value="1">Có</option>
          </select>
          {errors.is_worked_on_army && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_worked_on_army.message}
            </p>
          )}
        </FormItem>

        <FormItem label="Đương đơn có bị bệnh truyền nhiễm nào gây đến sức khỏe cộng đồng? Các căn bệnh nào qua kiểm tra cho thấy là nguy hiểm hay triệu chứng lối loạn tâm thần, hoặc đã từng lạm dụng và nghiện ma túy không?">
          <select
            className="form-select"
            {...register("is_has_some_sick", {
              valueAsNumber: true,
            })}
          >
            <option value="0">Không</option>
            <option value="1">Có</option>
          </select>
          {errors.is_has_some_sick && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_has_some_sick.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Đương đơn có bao giờ bị bắt hay bị kết án vì bất cứ tội hay án phạm nào dù đã được tha bổng, ân xá hoặc những hành động có liên quan đến pháp lí không?">
          <select
            className="form-select"
            {...register("is_had_been_arrested_by_crime", {
              valueAsNumber: true,
            })}
          >
            <option value="0">Không</option>
            <option value="1">Có</option>
          </select>
          {errors.is_had_been_arrested_by_crime && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_had_been_arrested_by_crime.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Đương đơn có từ bỏ quyền công dân để trốn thuế không?">
          <select
            className="form-select"
            {...register("is_renounce_citizenship", {
              valueAsNumber: true,
            })}
          >
            <option value="0">Không</option>
            <option value="1">Có</option>
          </select>
          {errors.is_renounce_citizenship && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_renounce_citizenship.message}
            </p>
          )}
        </FormItem>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          type="submit"
          className=""
          variant={"ghost"}
          onClick={() => router.push(`/thong-tin-gia-dinh?id=${data.id}`)}
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
