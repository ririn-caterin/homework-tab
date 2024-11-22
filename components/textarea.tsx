import { ChangeEventHandler } from "react";

type Props = {
  name: string;
  placeholder?: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  rows: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

export const Textarea = ({
  name,
  placeholder,
  value,
  defaultValue,
  rows,
  onChange,
}: Props) => {
  return (
    <textarea
      className="flex items-center px-3 py-2 rounded-lg border border-neutral-400 hover:border-blue-700 focus-within:border-blue-800 focus-within:outline focus-within:outline-blue-200"
      name={name}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      rows={rows}
    ></textarea>
  );
};
