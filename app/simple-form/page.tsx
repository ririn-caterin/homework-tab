"use client";

import { Input } from "@/components/input";
import { MultiSelect } from "@/components/multiselect";
import { Textarea } from "@/components/textarea";
import { useState } from "react";

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

  const handleFormData = ({
    key,
    value,
  }: {
    key: keyof FormData;
    value: string | string[] | number;
  }) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex flex-col w-full max-w-[360px]"
        action={handleSubmit}
      >
        <div className="flex flex-col my-4">
          <label>Email</label>
          <Input
            type="text"
            name="email"
            placeholder="Input email"
            value={formData.email}
            onChange={(e) => {
              handleFormData({
                key: "email",
                value: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label>Message Categories</label>
          <MultiSelect
            name="categories"
            options={categoryOptions}
            checkedValues={formData.categories}
            onChange={(e) => {
              const value = e.target.value;
              if (e.target.checked) {
                handleFormData({
                  key: "categories",
                  value: [...formData.categories, value],
                });
              } else {
                handleFormData({
                  key: "categories",
                  value: formData.categories.filter(
                    (category) => category !== value
                  ),
                });
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
            onChange={(e) => {
              handleFormData({
                key: "message",
                value: e.target.value,
              });
            }}
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
