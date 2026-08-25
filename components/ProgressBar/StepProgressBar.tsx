import React, { FC } from "react";

interface PropsType {
  totalSteps: number;
  currentStep: number;
}

const StepProgressBar: FC<PropsType> = ({ totalSteps, currentStep }) => {
  return (
    <div className="w-full flex gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index;

        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        let bgColor = "bg-slate-200";

        if (isCompleted) {
          bgColor =
            "bg-gradient-to-r from-emerald-100 via-emerald-500 to-emerald-100";
        } else if (isCurrent) {
          bgColor =
            "bg-gradient-to-r from-fuchsia-100 via-fuchsia-500 to-fuchsia-100";
        }

        return (
          <div
            key={index}
            className={`relative flex-1 h-2 rounded-full  transition-all duration-300 ${bgColor}`}
          >
            {isCompleted && (
              <span className="absolute min-w-8 w-8 h-8 inset-1/2 translate-x-1/2 -top-3 flex items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                <img
                  src="/assets/icons/shared/check-circle.svg"
                  className="w-8 h-8"
                  alt="completed"
                />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgressBar;
