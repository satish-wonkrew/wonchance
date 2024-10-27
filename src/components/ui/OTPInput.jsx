import React, { useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";

const OTPInput = ({ otpLength = 6, value, onChange }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    // Autofocus the first input when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
    onChange(newValue);

    if (newValue && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!newValue && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length: otpLength }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength="1"
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OTPInput;
