"use client";

import { createPortal } from "react-dom";
import { useEffect, useState, type ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleClassName?: string;
  children: ReactNode;
};

export function Modal({
  isOpen,
  onClose,
  title,
  titleClassName = "text-blue",
  children,
}: ModalProps) {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsVisible(true));
      return;
    }

    setIsVisible(false);
  }, [isOpen]);

  useEffect(() => {
    if (isVisible || !isMounted) return;

    const timeoutId = window.setTimeout(() => {
      setIsMounted(false);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [isMounted, isVisible]);

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 z-50 ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-black relative border border-foreground-20 rounded-lg p-6 lg:p-8 w-[90%] max-w-150 max-h-[85vh] overflow-y-auto transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-foreground-50 hover:text-foreground transition-colors text-3xl leading-none ml-4"
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="flex justify-between items-start mb-6">
          <h3 className={`text-lg lg:text-2xl font-bold ${titleClassName}`}>
            {title}
          </h3>
        </div>

        {children}
      </div>
    </div>,
    document.body,
  );
}
