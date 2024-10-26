import toast from "react-hot-toast";

export const successToast = (message: string, id?: string) =>
  toast.success(message, {
    ...(id && { id }),
    position: "top-right",
    duration: 6000,
    style: {
      textTransform: "capitalize",
      backgroundColor: "#eff6ff",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#f7f7f7",
      secondary: "#1d4ed8",
    },
  });

export const errorToast = (message: string, id?: string) =>
  toast.error(message, {
    ...(id && { id }),
    position: "top-right",
    duration: 6000,
    style: {
      textTransform: "capitalize",
      backgroundColor: "#fff1f2",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#f7f7f7",
      secondary: "#dc2626",
    },
  });

export const infoToast = (message: string, id?: string) =>
  toast(message, {
    ...(id && { id }),
    position: "top-right",
    duration: 6000,
    style: {
      textTransform: "capitalize",
      backgroundColor: "#ffffff",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#f7f7f7",
      secondary: "#1d4ed8",
    },
  });
