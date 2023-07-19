import { toast } from "react-toastify";

export const toastError = (message: string) => {
  return toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    theme: "colored",
  });
};

export const toastSuccess = (message: string) => {
  return toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    theme: "colored",
  });
};
