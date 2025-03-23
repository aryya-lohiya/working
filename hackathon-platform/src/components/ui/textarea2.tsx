"use client";
import * as React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
