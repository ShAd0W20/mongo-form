import { useNotificationStore } from "@dafcoe/vue-notification";
const { setNotification } = useNotificationStore();

export const notifySuccess = (message: string) => {
  setNotification({
    message: message,
    type: "success",
    showIcon: true,
    dismiss: {
      manually: false,
      automatically: true,
    },
    duration: 3000,
    showDurationProgress: true,
    appearance: "dark",
  });
};

export const notifyError = (message: string) => {
  setNotification({
    message: message,
    type: "alert",
    showIcon: true,
    dismiss: {
      manually: false,
      automatically: true,
    },
    duration: 3000,
    showDurationProgress: true,
    appearance: "dark",
  });
};

export const notifyWarning = (message: string) => {
  setNotification({
    message: message,
    type: "warning",
    showIcon: true,
    dismiss: {
      manually: false,
      automatically: true,
    },
    duration: 3000,
    showDurationProgress: true,
    appearance: "dark",
  });
};
