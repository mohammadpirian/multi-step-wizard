import React, { Dispatch, FC, SetStateAction } from "react";

type Props = {
  selected?: number;
  setSelected: Dispatch<SetStateAction<number>>;
  value: number;
  label: string;
  className?: string;
  textClassName?: string;
  inputClassName?: string;
  circleClassName?: string;
};
const RadioInput: FC<Props> = ({
  selected,
  setSelected,
  label,
  value,
  className,
  textClassName,
  inputClassName,
  circleClassName,
}) => {
  return (
    <div className={` w-full flex gap-1 items-center ${className}`}>
      <label className="relative flex items-center cursor-pointer">
        <input
          className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-z-text checked:border-gray-500 transition-all ${inputClassName}`}
          type="radio"
          value={value}
          checked={selected === value}
          onChange={() => setSelected(value)}
        />
        <span
          className={`absolute bg-gray-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${circleClassName}`}
        ></span>
      </label>
      <p className={textClassName ? textClassName : "text-gray-900 text-xs"}>
        {label}
      </p>
    </div>
  );
};

export default RadioInput;
