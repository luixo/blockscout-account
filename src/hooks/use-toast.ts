import { toast } from "react-hot-toast";

export const useToast = () => {
  return {
    error: (message: string) => {
      toast.error(message, {
        position: "top-right",
      });
    },
  };
};
