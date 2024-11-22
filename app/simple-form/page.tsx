"use client";

import { useState, ChangeEvent } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const Form = () => {
  interface FormData {
    email: string;
    message: string;
    selectedCategories: string[];
    isDropdownOpen: boolean;
    isSubmitted: boolean;
  }
  const [formData, setFormData] = useState<FormData>({
    email: "",
    message: "",
    selectedCategories: [] as string[],
    isDropdownOpen: false,
    isSubmitted: false,
  });

  const categories = [
    "Complaint",
    "Information Request",
    "Questions",
    "Others",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        selectedCategories: [...prev.selectedCategories, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedCategories: prev.selectedCategories.filter(
          (category) => category !== value
        ),
      }));
    }
  };

  const toggleDropdown = () => {
    setFormData((prev) => ({
      ...prev,
      isDropdownOpen: !prev.isDropdownOpen,
    }));
  };

  const handleSubmit = () => {
    setFormData((prev) => ({
      ...prev,
      isSubmitted: true,
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-[360px]">
        <div className="flex flex-col my-4">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="border px-3 py-2 border-gray-400 rounded-lg"
            placeholder="Input email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label>Message Categories</label>
          <div className="relative w-full">
            <div
              className="flex items-center justify-between border px-3 py-2 border-gray-400 rounded-lg"
              onClick={toggleDropdown}
            >
              <div>
                <span>Categories: </span>
                <span>
                  {formData.selectedCategories.length === categories.length
                    ? "All"
                    : formData.selectedCategories.length}
                </span>
              </div>
              {formData.isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
            {formData.isDropdownOpen && (
              <div className="flex flex-col absolute w-full border border-b-0 z-10 border-gray-400 rounded-lg bg-white mt-3 overflow-hidden">
                {categories.map((category, index) => (
                  <label
                    key={index}
                    className="w-full block border-b-[1px] border-gray-400 px-3 py-2"
                  >
                    <input
                      type="checkbox"
                      value={category}
                      onChange={handleCheckboxChange}
                      checked={formData.selectedCategories.includes(category)}
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
            name="message"
            className="border px-3 py-2 border-gray-400 rounded-lg"
            placeholder="Input your message..."
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
          ></textarea>
        </div>
        <div className="flex flex-col mb-4">
          <button
            className="bg-slate-900 text-white rounded-lg py-3 px-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      {formData.isSubmitted && (
        <div className="flex flex-col w-full max-w-[360px]">
          <div>Email: {formData.email}</div>
          <div>
            Selected Categories:
            {formData.selectedCategories.length > 0 &&
              formData.selectedCategories.map((category, index) => (
                <p key={index}>{category}</p>
              ))}
          </div>
          <div>Message: {formData.message}</div>
        </div>
      )}
    </div>
  );
};

export default Form;
