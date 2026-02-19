"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  text: string;
  className: string;
  icon?: ReactNode;
};

const SubmitButton = ({ text, className, icon }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <div className="spinner" />
          <span>Signing in...</span>
        </div>
      ) : (
        <>
          {icon && icon}
          {text}
        </>
      )}
    </button>
  );
};

export default SubmitButton;
