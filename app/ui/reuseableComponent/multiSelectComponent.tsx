import React, { useEffect, useRef, useState } from "react";

interface Option {
  id: number;
  name: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  selectedValues: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  label?: string;
}

const MultiSelectField: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select...",
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    if (selectedValues.some((item) => item.id === option.id)) {
      onChange(selectedValues.filter((item) => item.id !== option.id));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const handleRemove = (option: Option) => {
    onChange(selectedValues.filter((item) => item.id !== option.id));
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div
        className="border border-gray-300 rounded-md px-3 py-3 cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedValues.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedValues.map((item) => (
              <span
                key={item.id}
                className="bg-[#787E67] text-white text-sm rounded-full px-3 py-1 flex items-center gap-1"
              >
                {item.name}
                <button
                  className="text-white ml-1 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item);
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </div>
      {isOpen && (
        <div
          className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10"
          onClick={(e) => e.stopPropagation()} // Prevent propagation of clicks inside the dropdown
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ul className="max-h-48 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={` px-4 py-2 hover:bg-gray-100 cursor-pointer font-bold ${
                    selectedValues.some((item) => item.id === option.id)
                      ? "bg-blue-100"
                      : ""
                  }`}
                >
                  {option.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectField;
