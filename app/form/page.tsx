"use client";

import { useState, ChangeEvent } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const Form = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const categories = [
    "Complaint",
    "Information Request",
    "Questions",
    "Others",
  ];
  const totalCategories = categories.length;

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, value]);
      setCheckedCount((prevCount) => prevCount + 1);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((category) => category !== value)
      );
      setCheckedCount((prevCount) => prevCount - 1);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-[360px]">
        <div className="flex flex-col my-4">
          <label>Email</label>
          <input
            type="text"
            className="border p-3 border-gray-400 rounded-lg"
            placeholder="Input email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col mb-4">
          <label>Message Categories</label>
          <div className="relative w-full">
            <div
              className="flex items-center justify-between border p-3 border-gray-400 rounded-lg"
              onClick={toggleDropdown}
            >
              <div>
                <span>Categories: </span>
                <span>
                  {checkedCount === totalCategories ? "All" : checkedCount}
                </span>
              </div>
              {isDropdownOpen === true ? <ChevronUp /> : <ChevronDown />}
            </div>
            {isDropdownOpen && (
              <div className="flex flex-col absolute w-full border border-b-0 z-10 border-gray-400 rounded-lg bg-white mt-3 overflow-hidden">
                {categories.map((category, index) => (
                  <label
                    key={index}
                    className="w-full block border-b-[1px] border-gray-400 p-3"
                  >
                    <input
                      type="checkbox"
                      value={category}
                      onChange={handleCheckboxChange}
                      checked={selectedCategories.includes(category)}
                    />
                    <span className="ml-2">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label>Message</label>
          <textarea
            className="border p-3 border-gray-400 rounded-lg"
            placeholder="Input your message..."
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          ></textarea>
        </div>
        <div className="flex flex-col mb-4">
          <button
            className="bg-slate-900 text-white rounded-lg py-3 px-4"
            onClick={() => setIsSubmitted(true)}
          >
            Submit
          </button>
        </div>
      </div>
      {isSubmitted && (
        <div className="flex flex-col w-full max-w-[360px]">
          <div>Email: {email}</div>
          <div>
            Selected Categories:
            {selectedCategories.length > 0 &&
              selectedCategories.map((category, index) => (
                <p key={index}>{category}</p>
              ))}
          </div>
          <div>Message: {message}</div>
        </div>
      )}
    </div>
  );
};

export default Form;
