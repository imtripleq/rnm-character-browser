"use client";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
        <div className="p-4 flex flex-col items-center justify-center">
          {children}
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
