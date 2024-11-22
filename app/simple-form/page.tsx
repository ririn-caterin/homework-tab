"use client";

import { Input } from "@/components/input";
import { MultiSelect } from "@/components/multiselect";
import { Textarea } from "@/components/textarea";
import { useState, ChangeEvent } from "react";

type FormData = {
  email: string;
  message: string;
  categories: string[];
};

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    message: "",
    categories: [],
  });

  const categoryOptions = [
    {
      label: "Complaint",
      value: "complaint",
    },
    {
      label: "Information Request",
      value: "information-request",
    },
    {
      label: "Questions",
      value: "questions",
    },
    {
      label: "Others",
      value: "others",
    },
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

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col w-full max-w-[360px]" action={handleSubmit}>
        <div className="flex flex-col my-4">
          <label>Email</label>
          <Input
            type="text"
            name="email"
            placeholder="Input email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label>Message Categories</label>
          <MultiSelect
            name="categories"
            options={categoryOptions}
            checkedValues={formData.categories}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              if (e.target.checked) {
                setFormData((prev) => ({
                  ...prev,
                  categories: [...prev.categories, value],
                }));
              } else {
                setFormData((prev) => ({
                  ...prev,
                  categories: prev.categories.filter(
                    (category) => category !== value
                  ),
                }));
              }
            }}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label>Message</label>
          <Textarea
            name="message"
            placeholder="Input your message..."
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
        <div className="flex flex-col mb-4">
          <button
            type="submit"
            className="bg-slate-900 text-white rounded-lg py-3 px-4"
          >
            Submit
          </button>
        </div>
      </form>
      {isSubmitted && (
        <div className="flex flex-col w-full max-w-[360px]">
          <div>Email: {formData.email}</div>
          <div>
            Selected Categories:
            {formData.categories.length > 0 &&
              formData.categories.map((category, index) => (
                <p key={index}>
                  {categoryOptions.find((o) => o.value === category)?.label}
                </p>
              ))}
          </div>
          <div>Message: {formData.message}</div>
        </div>
      )}
    </div>
  );
};

export default Form;
