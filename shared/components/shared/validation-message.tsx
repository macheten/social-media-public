import { cn } from "@shared/lib/utils";
import { ErrorMessage } from "formik";
import React from "react";

interface Props {
  className?: string;
  name: string;
}

export const ValidationMessage: React.FC<Props> = ({ className, name }) => {
  return (
    <div className={cn(className, "text-sm text-red-600 font-light")}>
      <ErrorMessage name={name} />
    </div>
  );
};
