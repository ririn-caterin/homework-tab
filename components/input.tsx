"use client";

import { Eye, EyeOff } from "lucide-react";
import { ChangeEventHandler, ReactNode, useState } from "react";

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  renderLeftIcon?: () => ReactNode;
  renderRightIcon?: () => ReactNode;
};

export const Input = ({
  renderLeftIcon,
  renderRightIcon,
  name,
  type,
  placeholder,
  value,
  defaultValue,
  onChange,
}: Props) => {
  return (
    <div className="flex items-center px-3 h-11 rounded-lg border border-neutral-400 hover:border-blue-700 focus-within:border-blue-800 focus-within:outline focus-within:outline-blue-200">
      {renderLeftIcon?.()}
      <input
        className="outline-none text-base w-full"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      {renderRightIcon?.()}
    </div>
  );
};

type PasswordInputProps = {
  name: string;
  placeholder?: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const PasswordInput = ({
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
}: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <Input
      renderRightIcon={() => {
        return (
          <button
            type="button"
            onClick={() => {
              if (visible) hide();
              else show();
            }}
          >
            {visible ? (
              <EyeOff className="text-neutral-700" />
            ) : (
              <Eye className="text-neutral-700" />
            )}
          </button>
        );
      }}
      name={name}
      type={visible ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};
