import clxs from "classnames";
import React, { HTMLProps, JSX, ReactNode, RefObject } from "react";

const colorMap = {
  primary: {
    bg: "bg-gray-700",
    bgFade: "bg-gray-700/10",
    border: "border-gray-700",
    text: "text-white",
    textVariant: "text-gray-700 text-base",
    ring: " hover:ring-blue-700/40",
  },
  secondary: {
    bg: "bg-green-500",
    bgFade: "bg-green-500/30",
    border: "border-transparent",
    text: "text-white ",
    textVariant: "text-white",
    ring: "",
  },
  danger: {
    bg: "bg-red-600",
    bgFade: "bg-red-600/10",
    border: "border-red-600",
    text: "text-white",
    textVariant: "text-red-600",
    ring: "hover:ring-2 hover:ring-offset-2 hover:ring-offset-red-200 hover:ring-red-600/40",
  },
  info: {
    bg: "bg-info",
    bgFade: "bg-info/10",
    border: "border-info",
    text: "text-white",
    textVariant: "text-info",
    ring: "hover:ring-2 hover:ring-offset-2 hover:ring-offset-info-200 hover:ring-info/40",
  },
  warning: {
    bg: "bg-yellow-500",
    bgFade: "bg-yellow-500/10",
    border: "border-yellow-500",
    text: "text-white",
    textVariant: "text-yellow-500",
    ring: "hover:ring-2 hover:ring-offset-2 hover:ring-offset-yellow-100 hover:ring-yellow-500/40",
  },
  success: {
    bg: "bg-status-200",
    bgFade: "bg-status-200/10",
    border: "border-status-200",
    text: "text-white",
    textVariant: "text-status-200",
    ring: "hover:ring-2 hover:ring-offset-2 hover:ring-offset-status-200 hover:ring-status-200/40",
  },
};

type Color = keyof typeof colorMap;
type Variant =
  | "solid"
  | "secondary"
  | "outline"
  | "light"
  | "fade"
  | "category-outline";

type Props = {
  children?: ReactNode;
  variant?: Variant;
  color?: Color;
  containerClass?: string;
  onPress?: (e?: React.MouseEvent) => void;
  loading?: boolean;
  roundedClass?: string;
  disabled?: boolean;
  className?: HTMLProps<HTMLElement>["className"];
  ref?: RefObject<HTMLButtonElement | null>;
  colorTheme?: string;
};

const Button = ({
  children,
  variant = "solid",
  color = "primary",
  containerClass,
  disabled,
  loading,
  onPress,
  className,
  roundedClass = "rounded-lg  ",
  ref,
  colorTheme,
}: Props): JSX.Element => {
  const _findVariantClasses = () => {
    const colorClasses = colorMap[color];
    switch (variant) {
      case "solid":
        return ` ${colorClasses?.bg} ${colorClasses?.border} ${colorClasses?.text} ${colorClasses?.ring} border-opacity-100`;
      case "secondary":
        return ` ${colorClasses?.bg} ${colorClasses?.border} ${colorClasses?.text} ${colorClasses?.ring} border-opacity-100`;
      case "outline":
        return ` bg-white ${colorClasses?.border} ${colorClasses?.textVariant} ${colorClasses?.ring} border-opacity-100  border-2 `;
      case "fade":
        return ` ${colorClasses?.bgFade} ${colorClasses?.border} ${colorClasses?.textVariant} ${colorClasses?.ring} border-opacity-100`;
      case "light":
        return ` bg-white  ${colorClasses?.textVariant} ${colorClasses?.ring} border border-transparent hover`;
      default:
        return "";
    }
  };

  const _findLoaderColor = () => {
    switch (variant) {
      case "solid":
        return "#fff";
      case "secondary":
        return "#fff";
      case "outline":
        return "#000";
      case "fade":
        return "#000";
      case "light":
        return "#000";
      default:
        return "";
    }
  };

  return (
    <div className={clxs([containerClass])}>
      <button
        ref={ref ? ref : null}
        disabled={disabled || loading}
        type="button"
        className={clxs(
          `relative overflow-hidden flex transition-all  items-center justify-center px-4 py-1 border h-9  w-full text-base  font-medium ${roundedClass}`,
          _findVariantClasses(),
          {
            "opacity-50 cursor-not-allowed": disabled || loading,
            "cursor-pointer": !disabled && !loading,
            "hover:opacity-90 active:opacity-75": !disabled && !loading,
            "ring-0 ring-offset-0": variant === "light",
          },
          className,
        )}
        style={{ backgroundColor: colorTheme, borderColor: colorTheme }}
        onClick={onPress}
      >
        {!!loading ? (
          <div className=" inset-0 flex items-center justify-center">
            <div
              style={
                {
                  "--loaderColor": _findLoaderColor(),
                } as React.CSSProperties
              }
              className="loader"
            />
          </div>
        ) : (
          children
        )}
      </button>
    </div>
  );
};

export default Button;
