// src/components/Card/index.tsx

import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const cardVariants = cva("overflow-hidden transition-all max-w-md", {
  variants: {
    variant: {
      default: "bg-white border border-gray-200",
      outlined:
        "bg-white border border-gray-500 hover:border-gray-400 transition-colors",
      elevated: "bg-white shadow-lg hover:shadow-xl transition-shadow",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-5",
      lg: "p-8",
    },
    // radius 옵션들
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    radius: "md",
  },
});

type CardProps = VariantProps<typeof cardVariants> & {
  children: React.ReactNode;
  className?: string;
};

const Card = ({
  children,
  variant = "default",
  padding = "md",
  radius = "md",
  className,
}: CardProps) => {
  const cardClasses = twMerge(
    clsx(cardVariants({ variant, padding, radius }), className),
  );

  return <div className={cardClasses}>{children}</div>;
};

export default Card;
