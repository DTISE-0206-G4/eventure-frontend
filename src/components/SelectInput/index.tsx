"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Select, { ActionMeta, StylesConfig } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  options: Option[];
  placeholder?: string;
  onChange: (selectedOption: Option | null) => void;
}

const SelectNoSSR = dynamic(() => import("react-select"), { ssr: false });
const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#f3f4f6",
    borderColor: "#d1d5db",
    minHeight: "38px",
    boxShadow: "none",
    "&:hover": { borderColor: "#9ca3af" },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3b82f6"
      : state.isFocused
      ? "#bfdbfe"
      : "#fff",
    color: state.isSelected ? "#fff" : "#000",
    "&:hover": { backgroundColor: "#bfdbfe", color: "#000" },
  }),
  menu: (provided) => ({ ...provided, backgroundColor: "#f9fafb" }),
  singleValue: (provided) => ({ ...provided, color: "#111827" }),
};
const SelectInput: React.FC<SelectInputProps> = ({
  options,
  placeholder,
  onChange,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleChange = (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
    const selectedOption = newValue as Option | null;
    onChange(selectedOption);
  };

  return (
    <SelectNoSSR
      options={options}
      placeholder={placeholder}
      onChange={handleChange}
      classNamePrefix="react-select"
      styles={customStyles}
    />
  );
};

export default SelectInput;
