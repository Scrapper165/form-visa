import { Label } from "../ui/label";

export const FormItem = ({
  children,
  label,
  id,
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="form-item">
      <Label className="">
        <div className="mb-2">{label}</div>
        {children}
      </Label>
    </div>
  );
};
