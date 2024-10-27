import React from "react";
import { useTheme } from "next-themes";
import { Button } from "./button"; // Adjust import path if needed

const Modal = ({ onClose, children }) => {
  const { theme } = useTheme();

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        theme === "dark"
          ? "bg-gray-900 bg-opacity-80"
          : "bg-gray-100 bg-opacity-80"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full ${
          theme === "dark"
            ? "bg-gray-800 text-gray-100"
            : "bg-white text-gray-900"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {/* Change 'Wonchance' to dynamic title if needed */}
            {children?.props?.title || "Wonchance"}
          </h3>
          <Button variant="destructive" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
