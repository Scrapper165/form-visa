"use client";

import { saveData } from "@/actions";
import { Input } from "@/components/ui/input";
import { countryList } from "@/constants";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfo } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker2 } from "../shared/date-picker2";
import { FormItem } from "../shared/form-item";
import { Button } from "../ui/button";

export const Step8Form = () => {
  return (
    <div className="wrapper">
      <div className="header flex justify-between ">
        <div className="header-left w-80">
          <Input style={{ width: '100%' }} placeholder="All Types" />
        </div>
        <div className="header-right w-auto flex items-center gap-4">
          <Input placeholder="Search" />
          <select name="" id="" className="border rounded">
            <option value="">Column</option>
            <option value="">Rows</option>
          </select>
          <Button>Filter</Button>
          <Button></Button>
        </div>
        
      </div>
      <div className="body-content mt-6 overflow-x-auto" style={{background:"#FFFFFF"}}>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Column 1</th>
              <th className="border p-2">Column 2</th>
              <th className="border p-2">Column 3</th>
              <th className="border p-2">Column 3</th>
              <th className="border p-2">Column 3</th>
              <th className="border p-2">Column 3</th>
              <th className="border p-2">Column 3</th>
              <th className="border p-2">Column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Data 1</td>
              <td className="border p-2">Data 2</td>
              <td className="border p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border p-2">Data 4</td>
              <td className="border p-2">Data 5</td>
              <td className="border p-2">Data 6</td>
            </tr>
            <tr>
              <td className="border p-2">Data 7</td>
              <td className="border p-2">Data 8</td>
              <td className="border p-2">Data 9</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};