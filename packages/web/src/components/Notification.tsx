import * as React from 'react';
import { toast, ToastOptions } from 'react-toastify';

interface NotificationProps {
  content: React.ReactNode;
}

const Notification = ({ content }: NotificationProps) => {
  return <div>{content}</div>;
};

export const notify = (props: NotificationProps, toastOptions?: ToastOptions) =>
  toast(<Notification {...props} />, toastOptions);
