"use client";

import { useEffect, useRef, useState } from "react";

type FormSelectProps = {
  item?: {
    disableHover?: boolean;
    disabled?: boolean;
    optionClass?: string;
    placeholder?: string;
  };
  list: any[];
  value: { [key: string]: any } | string | number | null;
  property?: string;
  dropdownIcon?: string;
  isSearchable?: boolean;
  onSelect: (value: { [key: string]: any }) => void;
  title?: string;
  titleClass?: string;
  parentClass?: string;
  innerContainer?: string;
  inputClass?: string;
  listWrapperClass?: string;
};

type CheckIconProps = {
  isSelected: boolean;
};

const FormSelect = ({
  item,
  list,
  value,
  property = "title",
  isSearchable,
  onSelect,
  title,
  titleClass,
  parentClass,
  innerContainer,
  inputClass,
  listWrapperClass,
}: FormSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [options, setOptions] = useState(list);

  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOptions(list);
  }, [list]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setQuery(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search
  useEffect(() => {
    if (list?.length == 0) {
      setOptions([]);
      return;
    }

    if (!query) {
      setOptions(list);
      return;
    }

    const searchValue = query.toLowerCase().replace(/\s+/g, "");

    const result = list.filter((e: any) =>
      `${e[property]}`
        ?.toLowerCase()
        ?.replace(/\s+/g, "")
        ?.includes(searchValue),
    );

    setOptions(result);
  }, [query, list, property]);

  const selectedOption = options.find((option: any) =>
    typeof value === "object" ? option.id === value?.id : option.id === value,
  );

  const selectedValue =
    typeof value === "object"
      ? value?.[property]
      : (selectedOption?.[property] ?? item?.placeholder ?? "");

  return (
    <div className={parentClass} ref={selectorRef}>
      <div className="relative inline-block w-full">
        {/* Title */}
        {title && (
          <div
            className={`text-sm ${
              title ? "mb-3" : "mb-5"
            } font-normal text-gray-700 ${titleClass}`}
          >
            {title}
          </div>
        )}

        {/* Select Input */}
        <div
          className={`
            ${innerContainer}
            ${
              item?.disableHover
                ? ""
                : "hover:border-primary-500 focus:border-primary-500"
            }
            ${item?.disabled ? "opacity-30 !bg-[#E5E5E5]" : ""}
            form-control border rounded-md px-2
            justify-between items-center w-full
          `}
          onClick={() => {
            if (!item?.disabled) {
              setIsOpen((prev) => !prev);
            }
          }}
        >
          {isSearchable ? (
            <input
              disabled={item?.disabled}
              placeholder={item?.placeholder}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              value={typeof query === "string" ? query : (selectedValue ?? "")}
              className={`
                bg-white dark:bg-slate-800
                w-5/6
                focus:border-primary-500
                py-1
                ${inputClass}
              `}
            />
          ) : (
            <div
              className={`
                ${value ? "opacity-100" : "opacity-70"}
                w-5/6
                ${value}
              `}
            >
              {selectedValue}
            </div>
          )}

          {/* Arrow */}
          <img
            src={"/assets/icons/shared/caret-left.svg"}
            className={`
              w-2 h-2 md:w-4 md:h-4
              dark:invert
              transition-all
              ease-in-out
              duration-300
              text-gray-700
              ${isOpen ? "rotate-180" : ""}
            `}
          />
        </div>

        {/* Dropdown */}
        <div
          className={`
            absolute z-20 right-0 mt-2 w-full
            origin-top-center
            rounded-lg
            bg-white dark:bg-gray-100
            shadow-lg
            rounded-10
            ring-1 ring-gray-500 ring-opacity-5
            focus:outline-hidden
            max-h-64
            overflow-scroll
            transition-all
            duration-100
            ease-out

            ${
              isOpen
                ? "opacity-100 scale-100 visible pointer-events-auto"
                : "opacity-0 scale-95 invisible pointer-events-none"
            }

            ${listWrapperClass}
          `}
        >
          <div className="py-1 divide-y divide-gray-200">
            {/* Empty state */}
            {options?.length == 0 && (
              <p className="opacity-60 text-xs text-center pt-3 pb-3">
                موردی یافت نشد
              </p>
            )}

            {/* Options */}
            {options?.map((option: any, index: number) => {
              const isSelected =
                typeof value === "object"
                  ? option.id === value?.id
                  : option.id === value;

              return (
                <div key={option.id ?? index}>
                  <button
                    type="button"
                    className={`
                      ${
                        isSelected
                          ? "bg-gray-700/10"
                          : "text-gray-800 hover:bg-primary-500 hover:bg-gray-300 hover:text-white"
                      }

                      flex
                      w-full
                      items-center
                      px-2
                      py-3
                      text-gray-700

                      ${item?.optionClass || "text"}
                    `}
                    onClick={(event) => {
                      event.stopPropagation();

                      onSelect(option);
                      setIsOpen(false);
                      setQuery(null);
                    }}
                  >
                    <CheckIcon isSelected={isSelected} />

                    <div className="text-right text-gray-700">
                      {option[property]}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = ({ isSelected }: CheckIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`
        ${isSelected ? "opacity-100" : "opacity-0"}
        h-4
        w-4
        ml-1
        stroke-green-700
      `}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
};

export default FormSelect;
