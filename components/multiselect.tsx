import { ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEventHandler, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  options: Option[];
  checkedValues: string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
};

export const MultiSelect = ({
  name,
  options,
  checkedValues,
  onChange,
  errorMessage,
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div>
      <div className="relative w-full">
        <div
          className="h-11 flex items-center justify-between border px-3 py-2 border-neutral-400 rounded-lg"
          onClick={toggleDropdown}
        >
          <div>
            <span>Categories: </span>
            <span>
              {checkedValues.length === options.length
                ? "All"
                : checkedValues.length}
            </span>
          </div>
          {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
        {isDropdownOpen && (
          <div className="flex flex-col absolute w-full border border-b-0 z-10 border-neutral-400 rounded-lg bg-white mt-3 overflow-hidden">
            {options.map((option, index) => (
              <label
                key={`option-${index}-${option.value}`}
                className="w-full block border-b-[1px] border-neutral-400 px-3 py-2"
              >
                <input
                  name={name}
                  type="checkbox"
                  value={option.value}
                  onChange={onChange}
                  checked={checkedValues.includes(option.value)}
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  );
};
