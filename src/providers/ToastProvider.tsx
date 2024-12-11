"use client";
import { faCheck, faCross, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toast, ToastToggle } from "flowbite-react";
import { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextProps {
  showToast: (message: string, type?: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // Hide toast after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {toast && (
        <div className="fixed top-4 right-4 flex items-center justify-end w-full">
          <Toast>
            {toast.type === "success" ? (
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <FontAwesomeIcon
                  className="text-american-green"
                  icon={faCheck}
                />
              </div>
            ) : (
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <FontAwesomeIcon className="text-red-500" icon={faXmark} />
              </div>
            )}
            <div className="ml-3 text-sm font-normal">{toast.message}</div>
            <ToastToggle />
          </Toast>
        </div>
      )}

      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};